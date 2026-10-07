import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, of, switchMap, tap } from 'rxjs';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import {
  SelectInputComponent,
  SelectOption,
} from 'app/components/shared/inputs/select-input/select-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadForTransportCompanies_Factories_Admins_Drivers } from 'app/services/load-management/model/load-info-for-transport-companies-factories-admins-drivers.model';
import { Panel } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { AppTitles } from 'app/constants/Titles';
import {
  ILocation,
  LocationManagementService,
} from 'app/services/location-management/location-management.service';

interface SearchLoadsForm {
  announcementGroupId: number | null;
  announcementSubGroupId: number | null;
  loadStatusId: number | null;
}

@Component({
  selector: 'app-load-capacitor-form',
  imports: [SelectInputComponent, ButtonComponent, Panel, CardModule],
  templateUrl: './load-capacitor-form.component.html',
  styleUrl: './load-capacitor-form.component.scss',
})
export class LoadCapacitorFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly loadService = inject(LoadManagementService);
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );
  private readonly fb = inject(FormBuilder);
  private readonly locationService = inject(LocationManagementService);

  readonly addonWidth = '7rem';
  readonly appTitle = AppTitles;

  // signals
  readonly announcementGroupOptions = signal<SelectOption<number>[]>([]);
  readonly announcementSubGroupOptions = signal<SelectOption<number>[]>([]);
  readonly loadStatusOptions = signal<SelectOption<number>[]>([]);
  readonly driverLoads = signal<
    LoadForTransportCompanies_Factories_Admins_Drivers[]
  >([]);
  readonly selectedFilter = signal<{
    group: string;
    subgroup: string;
    loadstatus: string;
  } | null>(null);

  private currentLocation = signal<ILocation | undefined>(undefined);

  // form
  readonly searchLoadsForm = this.fb.group({
    announcementGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    announcementSubGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    loadStatusId: this.fb.control<number | null>(null, Validators.required),
  });

  constructor() {
    super();

    // Start with sub-group disabled until a group is chosen
    this.ctrl('announcementSubGroupId').disable({ emitEvent: false });

    this.ctrl('announcementGroupId')
      .valueChanges.pipe(
        takeUntilDestroyed(),
        tap((groupId) => {
          this.ctrl('announcementSubGroupId').reset(null);
          this.announcementSubGroupOptions.set([]);

          if (groupId !== null && groupId !== undefined) {
            this.ctrl('announcementSubGroupId').enable({ emitEvent: false });
          } else {
            this.ctrl('announcementSubGroupId').disable({ emitEvent: false });
          }
        }),
        switchMap((groupId) =>
          groupId !== null && groupId !== undefined
            ? from(
                this.announcementService.GetRelationOfAnnouncementGroupAndSubGroup(
                  groupId
                )
              )
            : of(null)
        )
      )
      .subscribe((response) => {
        if (!response) return;

        if (!checkAndToastError(response, this.toast)) {
          this.announcementSubGroupOptions.set([]);
          return;
        }

        const subGroups = response.data?.[0]?.AnnouncementSubGroups ?? [];
        this.announcementSubGroupOptions.set(
          subGroups.map((sub) => ({
            label: sub.AnnouncementSGTitle ?? '',
            value: sub.AnnouncementSGId,
          }))
        );
      });
  }

  onViewActivated(): void {
    this.withLoading(async () => {
      await Promise.all([
        this.loadAnnouncementGroups(),
        this.loadLoadStatuses(),
      ]);
    });
  }

  // form helper
  ctrl<K extends keyof SearchLoadsForm>(
    name: K
  ): FormControl<SearchLoadsForm[K]> {
    const control = this.searchLoadsForm.get(name as string);
    if (!control) {
      throw new Error(`Control "${String(name)}" not found`);
    }
    return control as FormControl<SearchLoadsForm[K]>;
  }

  // announcement groups list
  private async loadAnnouncementGroups() {
    const response = await this.announcementService.GetAnnouncementGroups('');
    if (!checkAndToastError(response, this.toast)) return;

    this.announcementGroupOptions.set(
      response.data.map((group) => ({
        label: group.AnnouncementTitle ?? '',
        value: group.AnnouncementId,
      }))
    );
  }

  // load status list
  private async loadLoadStatuses() {
    const response = await this.loadService.GetLoadStatuses();
    if (!checkAndToastError(response, this.toast)) return;

    this.loadStatusOptions.set(
      response.data.map((load) => ({
        label: load.LoadStatusTitle,
        value: load.LoadStatusId,
      }))
    );
  }

  // fetch loads
  loadDriverLoads() {
    if (this.searchLoadsForm.invalid || this.loading()) return;

    const subGroupId = this.ctrl('announcementSubGroupId').value;
    const loadStatusId = this.ctrl('loadStatusId').value;
    if (!subGroupId || !loadStatusId) return;

    this.withLoading(async () => {
      await this.getUserLocation();
      if (!this.currentLocation()) return;

      const response = await this.loadService.GetLoadsForDrivers(
        subGroupId,
        loadStatusId
      );

      if (!checkAndToastError(response, this.toast)) {
        this.driverLoads.set([]);
        return;
      }

      this.driverLoads.set(response.data);
      this.updateSelectedFilter();
    });
  }

  async getUserLocation() {
    this.currentLocation.set(undefined);

    const result = await this.locationService.fetchUserLocation();
    if (!result.success) {
      const errorMessages: Record<string, string> = {
        PERMISSION_DENIED:
          'دسترسی به موقعیت مکانی رد شد. لطفاً در تنظیمات مرورگر یا گوشی دسترسی را فعال کنید.',
        POSITION_UNAVAILABLE:
          'موقعیت مکانی در دسترس نیست. لطفاً روشن بودن GPS گوشی را بررسی کنید.',
        TIMEOUT:
          'زمان دریافت موقعیت مکانی به پایان رسید. لطفاً مجدداً تلاش کنید.',
        NOT_SUPPORTED: 'مرورگر شما از قابلیت موقعیت مکانی پشتیبانی نمی‌کند.',
      };
      this.toast.error('خطای موقعیت مکانی', errorMessages[result.error]);
      return;
    }

    const location = result.location;
    // ponytail: simple threshold checks; server-side geofencing/anti-spoofing if fraud risk increases
    if (location.accuracy > 5000) {
      this.toast.error(
        'خطا',
        'موقعیت مکانی دقت کافی را ندارد. لطفا دقایقی منتظر بمانید'
      );
      return;
    } else if (location.accuracy <= 0) {
      this.toast.error('خطا', 'موقعیت مکانی نامعتبر است');
      return;
    }

    this.currentLocation.set(location);
  }

  // filter label builder
  private updateSelectedFilter() {
    const group =
      this.announcementGroupOptions().find(
        (e) => e.value === this.ctrl('announcementGroupId').value
      )?.label ?? '';
    const subgroup =
      this.announcementSubGroupOptions().find(
        (e) => e.value === this.ctrl('announcementSubGroupId').value
      )?.label ?? '';
    const loadstatus =
      this.loadStatusOptions().find(
        (e) => e.value === this.ctrl('loadStatusId').value
      )?.label ?? '';

    this.selectedFilter.set({ group, subgroup, loadstatus });
  }

  // allocate a load
  allocateLoad(loadId: number) {
    if (this.loading()) return;

    this.withLoading(async () => {
      await this.getUserLocation();
      if (!this.currentLocation()) return;

      const response =
        await this.loadService.RegisterNewLoadAllocationForDrivers(
          loadId,
          this.currentLocation()?.latitude ?? 0,
          this.currentLocation()?.longitude ?? 0
        );
      if (!checkAndToastError(response, this.toast)) {
        return;
      }
      this.toast.success('موفق', response.data.Message);
    });
  }
}
