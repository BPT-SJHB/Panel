import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
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
  announcementGroupTitle: string;

  announcementSubGroupId: number | null;
  announcementSubGroupTitle: string;

  loadStatusId: number | null;
  loadStatusTitle: string;
}

@Component({
  selector: 'app-load-capacitor-form',
  imports: [
    SearchAutoCompleteFactoryComponent,
    SelectInputComponent,
    ButtonComponent,
    Panel,
    CardModule,
  ],
  templateUrl: './load-capacitor-form.component.html',
  styleUrl: './load-capacitor-form.component.scss',
})
export class LoadCapacitorFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly loadService = inject(LoadManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly locationService = inject(LocationManagementService);

  readonly addonWidth = '7rem';
  readonly appTitle = AppTitles;

  // signals
  readonly loadStatusOptions = signal<{ label: string; value: number }[]>([]);
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
  readonly searchLoadsForm = this.fb.nonNullable.group({
    announcementGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    announcementGroupTitle: this.fb.nonNullable.control(''),

    announcementSubGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    announcementSubGroupTitle: this.fb.nonNullable.control(''),

    loadStatusId: this.fb.control<number | null>(null, Validators.required),
    loadStatusTitle: this.fb.nonNullable.control(''),
  });

  // autocomplete configs
  readonly autoCompleteAnnouncementGroup = this.autoCompleteFactory.create(
    AutoCompleteType.AnnouncementGroup,
    this.ctrl('announcementGroupId'),
    {
      control: this.ctrl('announcementGroupTitle'),
      valueChange: () => {
        this.ctrl('announcementGroupId').setValue(null);
        this.ctrl('announcementSubGroupId').setValue(null);
        this.ctrl('announcementSubGroupTitle').reset('');
      },
    }
  );

  readonly autoCompleteSubAnnouncementGroup = this.autoCompleteFactory.create(
    AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
    this.ctrl('announcementSubGroupId'),
    {
      control: this.ctrl('announcementSubGroupTitle') as FormControl<string>,
      groupControlId: this.ctrl('announcementGroupId'),
      readOnly: () => this.ctrl('announcementGroupId').invalid,
    }
  );

  onViewActivated(): void {
    this.withLoading(async () => await this.loadLoadStatuses());
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

    this.withLoading(async () => {
      await this.getUserLocation();
      if (!this.currentLocation()) return;

      const response = await this.loadService.GetLoadsForDrivers(
        this.ctrl('announcementSubGroupId').value!,
        this.ctrl('loadStatusId').value!
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

    const permission = await this.locationService.checkPermissionStatus();
    if (!permission) {
      this.toast.error('خطا', 'دسترسی به موقعیت مکانی امکان‌پذیر نیست');
      return;
    }

    const location = await this.locationService.fetchUserLocation();
    if (!location) {
      this.toast.error('خطا', 'دریافت موقعیت مکانی امکان‌پذیر نیست');
      return;
    }

    if (location.accuracy > 250) {
      this.toast.error(
        'خطا',
        'موقعیت مکانی دقت کافی را ندارد. لطفا دقایقی منتظر بمانید'
      );
      return;
    } else if (location.accuracy < 10) {
      this.toast.error('خطا', 'موقعیت مکانی دقت بیش از حد مجاز دارد');
      return;
    }

    this.currentLocation.set(location);

    // alert(
    //   this.currentLocation()?.latitude +
    //     '-' +
    //     this.currentLocation()?.longitude +
    //     '-' +
    //     this.currentLocation()?.accuracy
    // );
  }

  // filter label builder
  private updateSelectedFilter() {
    const group = this.ctrl('announcementGroupTitle').value;
    const subgroup = this.ctrl('announcementSubGroupTitle').value;
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
