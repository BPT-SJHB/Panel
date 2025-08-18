import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Interfaces and Models
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { TransportTariffParam } from 'app/services/load-management/model/transport-tariff-param.model';

// Services
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';

// Components
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import {
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';

// Utils
import { checkAndToastError } from 'app/utils/api-utils';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { LoadRegister } from 'app/services/load-management/model/load-register.model';
import { LoadEdit } from 'app/services/load-management/model/load-edit.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { ButtonSeverity } from 'app/components/shared/button/button.component';

@Component({
  selector: 'app-loads-announcement-form',
  imports: [
    TableComponent,
    TextInputComponent,
    SearchAutoCompleteFactoryComponent,
    BinaryRadioInputComponent,
    DatePickerInput,
    ButtonComponent,
  ],
  templateUrl: './loads-announcement-form.component.html',
  styleUrl: './loads-announcement-form.component.scss',
})
export class LoadsAnnouncementFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  // Signals
  readonly shearedSignal!: WritableSignal<LoadInfo | null>;
  readonly transportTariffParams: WritableSignal<TransportTariffParam[]> =
    signal([]);

  // Services
  private readonly loadsService = inject(LoadManagementService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly fb = inject(FormBuilder);
  private readonly confirm = inject(AppConfirmService);

  // Constants
  readonly addonWidth = '10rem';

  // Form
  private readonly loadsForm = this.createForm();

  // Table configuration
  readonly cols: TableColumn<TransportTariffParam>[] = [
    { field: 'Checked', header: 'وضعیت', type: TableColumnType.CHECKBOX },
    { field: 'TPTPDId', header: 'شناسه' },
    { field: 'TPTPTitle', header: 'عنوان' },
    { field: 'Mblgh', header: 'مبلغ' },
  ];

  // Auto-completions
  readonly autoCompletions = this.createAutoCompletions();

  readonly baseWidthClass = 'w-24 sm:w-32 md:w-40 lg:w-48';

  readonly actionButtons = this.createActionButtons();

  // Lifecycle
  onViewActivated(): void {
    const signal = this.shearedSignal();
    if (!signal) {
      this.resetForm();
      this.transportTariffParams.set([]);
      return;
    }
    this.fetchLoadInfo(signal.LoadId);
  }

  // Form helper
  ctrl<K extends keyof LoadInfo>(name: K): FormControl<LoadInfo[K]> {
    const control = this.loadsForm.get(name as string);
    if (!control) {
      throw new Error(`Control "${String(name)}" not found`);
    }
    return control as FormControl<LoadInfo[K]>;
  }

  // Button handlers with confirmation
  async clickFreeLine(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirm.confirmFreeLine(`بار #${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadsService.FreeLineLoad(loadId);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          await this.fetchLoadInfo(loadId);
        }
      });
    });
  }

  async clickSedimentLoad(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirm.confirmSediment(`بار #${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadsService.SedimentLoad(loadId);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          await this.fetchLoadInfo(loadId);
        }
      });
    });
  }

  async clickCancelLoad(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirm.confirmCancel(`بار #${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadsService.CancelLoad(loadId);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          await this.fetchLoadInfo(loadId);
        }
      });
    });
  }

  async clickDeleteLoad(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirm.confirmDelete(`بار #${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadsService.CancelLoad(loadId);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          this.resetForm();
        }
      });
    });
  }

  async clickEditLoad(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirm.confirmEdit(`بار #${loadId}`, async () => {
      if (this.loadsForm.invalid || this.loading()) return;
      const loadsInfo = this.loadsForm.getRawValue() as LoadEdit;

      await this.withLoading(async () => {
        const response = await this.loadsService.EditLoad(loadsInfo);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          await this.fetchLoadInfo(loadId);
        }
      });
    });
  }

  async clickRegisterLoad(): Promise<void> {
    if (!this.isFormValidExcept('LoadId')) return;
    const loadsInfo = this.loadsForm.getRawValue() as LoadRegister;
    await this.withLoading(async () => {
      const response = await this.loadsService.RegisterNewLoad(loadsInfo);
      if (checkAndToastError(response, this.toast)) {
        this.resetForm();
      }
    });
  }

  // Private methods
  private createForm() {
    return this.fb.group({
      LoadId: this.fb.control<number | null>(null, Validators.required),
      AnnounceDate: this.fb.nonNullable.control(''),
      AnnounceTime: this.fb.nonNullable.control(''),
      LoadStatusId: this.fb.control<number | null>(null, Validators.required),
      LoadStatusTitle: this.fb.nonNullable.control(''),
      TransportCompanyId: this.fb.control<number | null>(
        null,
        Validators.required
      ),
      TransportCompanyTitle: this.fb.nonNullable.control(''),
      AnnouncementGroupId: this.fb.control<number | null>(
        null,
        Validators.required
      ),
      AnnouncementGroupTitle: this.fb.nonNullable.control(''),
      GoodId: this.fb.control<number | null>(null, Validators.required),
      GoodTitle: this.fb.nonNullable.control(''),
      SourceCityId: this.fb.control<number | null>(null, Validators.required),
      SourceCityTitle: this.fb.nonNullable.control(''),
      TargetCityId: this.fb.control<number | null>(null, Validators.required),
      TargetCityTitle: this.fb.nonNullable.control(''),
      AnnouncementSubGroupId: this.fb.control<number | null>(
        null,
        Validators.required
      ),
      AnnouncementSubGroupTitle: this.fb.nonNullable.control(''),
      Tariff: this.fb.nonNullable.control<string>(''),
      LoadingPlaceId: this.fb.control<number | null>(null, Validators.required),
      LoadingPlaceTitle: this.fb.nonNullable.control(''),
      DischargingPlaceId: this.fb.control<number | null>(
        null,
        Validators.required
      ),
      DischargingPlaceTitle: this.fb.nonNullable.control(''),
      TotalNumber: this.fb.nonNullable.control<number>(0),
      Tonaj: this.fb.nonNullable.control<number>(0),
      Recipient: this.fb.nonNullable.control(''),
      Address: this.fb.nonNullable.control(''),
      Description: this.fb.nonNullable.control(''),
      RegisteringUserName: this.fb.nonNullable.control(''),
      TPTParams: this.fb.nonNullable.control(''),
      TPTParamsJoint: this.fb.nonNullable.control(''),
    });
  }

  private createAutoCompletions() {
    return {
      loadStatus: this.autoCompleteFactory.create(
        AutoCompleteType.LoadStatus,
        this.ctrl('LoadStatusId'),
        {
          control: this.ctrl('LoadStatusTitle') as FormControl<string>,
          readOnly: () => true,
        }
      ),

      transportCompany: this.autoCompleteFactory.create(
        AutoCompleteType.TransportCompany,
        this.ctrl('TransportCompanyId'),
        {
          control: this.ctrl('TransportCompanyTitle') as FormControl<string>,
          readOnly: () => true,
        }
      ),

      goods: this.autoCompleteFactory.create(
        AutoCompleteType.Product,
        this.ctrl('GoodId'),
        {
          control: this.ctrl('GoodTitle') as FormControl<string>,
        }
      ),

      announcementGroup: this.autoCompleteFactory.create(
        AutoCompleteType.AnnouncementGroup,
        this.ctrl('AnnouncementGroupId'),
        {
          control: this.ctrl('AnnouncementGroupTitle') as FormControl<string>,
          valueChange: () => {
            this.ctrl('AnnouncementGroupId').reset();
            this.ctrl('AnnouncementSubGroupId').reset();
            this.ctrl('AnnouncementSubGroupTitle').reset('');
          },
        }
      ),

      announcementSubGroup: this.autoCompleteFactory.create(
        AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
        this.ctrl('AnnouncementSubGroupId'),
        {
          control: this.ctrl(
            'AnnouncementSubGroupTitle'
          ) as FormControl<string>,
          groupControlId: this.ctrl('AnnouncementGroupId'),
          readOnly: () => this.ctrl('AnnouncementGroupId').invalid,
        }
      ),

      sourceCity: this.autoCompleteFactory.create(
        AutoCompleteType.City,
        this.ctrl('SourceCityId'),
        {
          placeholder: 'شهر مبدا',
          label: 'شهر مبدا',
          control: this.ctrl('SourceCityTitle') as FormControl<string>,
        }
      ),

      targetCity: this.autoCompleteFactory.create(
        AutoCompleteType.City,
        this.ctrl('TargetCityId'),
        {
          placeholder: 'شهر مقصد',
          label: 'شهر مقصد',
          control: this.ctrl('TargetCityTitle') as FormControl<string>,
        }
      ),

      loadingPlace: this.autoCompleteFactory.create(
        AutoCompleteType.LADPlaces,
        this.ctrl('LoadingPlaceId'),
        {
          placeholder: 'محل بارگیری',
          label: 'محل بارگیری',
          control: this.ctrl('LoadingPlaceTitle') as FormControl<string>,
        }
      ),

      dischargingPlace: this.autoCompleteFactory.create(
        AutoCompleteType.LADPlaces,
        this.ctrl('DischargingPlaceId'),
        {
          placeholder: 'محل تخلیه',
          label: 'محل تخلیه',
          control: this.ctrl('DischargingPlaceTitle') as FormControl<string>,
        }
      ),
    };
  }

  private createActionButtons() {
    return [
      {
        label: 'ثبت',
        severity: 'green' as ButtonSeverity,
        action: () => this.clickRegisterLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => this.ctrl('LoadId').valid,
        disabled: () => this.loading() || !this.isFormValidExcept('LoadId'),
      },
      {
        label: 'ویرایش',
        severity: 'info' as ButtonSeverity,
        action: () => this.clickEditLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => this.ctrl('LoadId').invalid,
        disabled: () => this.loadsForm.invalid || this.loading(),
      },
      {
        label: 'حذف',
        severity: 'danger' as ButtonSeverity,
        action: () => this.clickDeleteLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => false,
        disabled: () => this.baseDisabled(),
      },
      {
        label: 'کنسلی بار',
        severity: 'warn' as ButtonSeverity,
        action: () => this.clickCancelLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => false,
        disabled: () => this.baseDisabled(),
      },
      {
        label: 'رسوب بار',
        severity: 'warn' as ButtonSeverity,
        action: () => this.clickSedimentLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => false,
        disabled: () => this.baseDisabled(),
      },
      {
        label: 'خط آزاد',
        severity: 'warn' as ButtonSeverity,
        action: () => this.clickFreeLine(),
        widthClass: this.baseWidthClass,
        hidden: () => false,
        disabled: () => this.baseDisabled(),
      },
    ];
  }

  private getValidLoadId(): number | null {
    const loadIdControl = this.ctrl('LoadId');
    if (loadIdControl.invalid || this.loading()) {
      return null;
    }
    return loadIdControl.value;
  }

  private async fetchLoadInfo(loadId: number): Promise<void> {
    await this.withLoading(async () => {
      // Fetch load info
      const responseLoad = await this.loadsService.GetLoadInfo(loadId);
      if (!checkAndToastError(responseLoad, this.toast)) {
        this.transportTariffParams.set([]);
        return;
      }

      this.populateForm(responseLoad.data);

      // Fetch transport tariff params
      const tptParams = responseLoad.data.TPTParams ?? '';
      const response =
        await this.loadsService.GetTransportTariffParams(tptParams);

      if (checkAndToastError(response, this.toast)) {
        this.transportTariffParams.set(response.data);
      } else {
        this.transportTariffParams.set([]);
      }
    });
  }

  private populateForm(loadInfo: LoadInfo): void {
    // Patch all values at once
    this.loadsForm.patchValue({ ...loadInfo });

    // Explicitly set ID fields to ensure proper type handling
    const idFields = {
      LoadStatusId: loadInfo.LoadStatusId,
      AnnouncementGroupId: loadInfo.AnnouncementGroupId,
      AnnouncementSubGroupId: loadInfo.AnnouncementSubGroupId,
      LoadingPlaceId: loadInfo.LoadingPlaceId,
      TransportCompanyId: loadInfo.TransportCompanyId,
      DischargingPlaceId: loadInfo.DischargingPlaceId,
      GoodId: loadInfo.GoodId,
      SourceCityId: loadInfo.SourceCityId,
      TargetCityId: loadInfo.TargetCityId,
    };

    this.loadsForm.patchValue(idFields);
  }

  private resetForm(): void {
    this.loadsForm.reset();
  }

  private baseDisabled(): boolean {
    return this.ctrl('LoadId').invalid || this.loading();
  }

  private isFormValidExcept(exceptControl: string): boolean {
    return Object.keys(this.loadsForm.controls)
      .filter((key) => key !== exceptControl)
      .every((key) => this.ctrl(key as keyof LoadInfo).valid);
  }
}
