import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Interfaces & Models
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { TransportTariffParam } from 'app/services/load-management/model/transport-tariff-param.model';
import { LoadRegister } from 'app/services/load-management/model/load-register.model';
import { LoadEdit } from 'app/services/load-management/model/load-edit.model';

// Services
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';

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
import {
  ButtonComponent,
  ButtonSeverity,
} from 'app/components/shared/button/button.component';
import { LoadListType } from '../loads-list-form/loads-list-form.component';

// Utils
import { checkAndToastError } from 'app/utils/api-utils';
import { AnnouncementSubGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-subgroup.model';
import { AppTitles } from 'app/constants/Titles';
import { single } from 'rxjs';

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
  // =====================================================
  // 🔹 Constants
  // =====================================================
  readonly loadType: LoadListType = LoadListType.ADMIN;
  readonly addonWidth = '12rem';
  readonly baseWidthClass = 'w-24 sm:w-32 md:w-40 lg:w-48';
  readonly appTitles = AppTitles;

  // =====================================================
  // 🔹 Signals & State
  // =====================================================
  readonly sharedSignal = signal<LoadInfo | null>(null);
  private readonly prvLoadId = signal<number | null>(-1000);
  readonly selectedLoadInfo = computed(() => {
    return this.sharedSignal();
  });

  readonly transportTariffParams = signal<TransportTariffParam[]>([]);

  // =====================================================
  // 🔹 Services
  // =====================================================
  private readonly loadService = inject(LoadManagementService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );

  // =====================================================
  // 🔹 Form & Table
  // =====================================================
  private readonly loadsForm = this.createForm();

  readonly cols: TableColumn<TransportTariffParam>[] = [
    { field: 'Checked', header: 'وضعیت', type: TableColumnType.CHECKBOX },
    { field: 'TPTPDId', header: 'شناسه' },
    { field: 'TPTPTitle', header: 'عنوان' },
    { field: 'Cost', header: 'مبلغ(ریال)' },
  ];

  // =====================================================
  // 🔹 UI Configurations
  // =====================================================
  readonly autoCompletions = this.createAutoCompletions();
  readonly actionButtons = this.createActionButtons();

  // =====================================================
  // 🔹 Lifecycle
  // =====================================================
  onViewActivated(): void {
    const currentId = this.selectedLoadInfo()?.LoadId ?? null;
    if (this.prvLoadId() == currentId) return;
    this.prvLoadId.set(currentId);
    this.resetForm();
    this.transportTariffParams.set([]);
    this.initialize();
  }

  // =====================================================
  // 🔹 Button Actions
  // =====================================================

  async clickFreeLine(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirmService.confirmFreeLine(`بار با کد ${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadService.FreeLineLoad(loadId);
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

    this.confirmService.confirmSediment(`بار با  کد ${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadService.SedimentLoad(loadId);
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

    this.confirmService.confirmLoadCancel(`بار با کد ${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadService.CancelLoad(loadId);
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

    this.confirmService.confirmDelete(`بار با کد ${loadId}`, async () => {
      await this.withLoading(async () => {
        const response = await this.loadService.CancelLoad(loadId);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          this.resetForm();
          this.sharedSignal.set(null);
        }
      });
    });
  }

  async clickEditLoad(): Promise<void> {
    const loadId = this.getValidLoadId();
    if (!loadId) return;

    this.confirmService.confirmEdit(`بار با کد ${loadId}`, async () => {
      if (this.loadsForm.invalid || this.loading()) return;

      const tptParams = await this.getTransportTariffParamsAsString();
      if (!tptParams) return;

      const loadEdit = this.loadsForm.getRawValue() as LoadEdit;
      loadEdit.TPTParams = tptParams;

      await this.withLoading(async () => {
        const response = await this.loadService.EditLoad(loadEdit);
        if (checkAndToastError(response, this.toast)) {
          this.toast.success('موفق', response.data.Message);
          await this.fetchLoadInfo(loadId);
        }
      });
    });
  }

  async clickRegisterLoad(): Promise<void> {
    if (!this.isLoadRegisterValid() || this.loading()) return;

    this.confirmService.confirmSubmit('بار مورد نظر', async () => {
      const newLoad = this.loadsForm.getRawValue() as LoadRegister;

      const response = await this.withLoading(() =>
        this.loadService.RegisterNewLoad(newLoad)
      );

      if (!response || !checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', '');

      this.confirmService.confirmChoose(
        'بار مورد نظر را جهت ویرایش',
        async () => {
          const loadInfo = await this.fetchLoadInfo(response.data.newLoadId);
          this.sharedSignal.set(loadInfo ?? null);
        },
        () => this.resetForm()
      );
    });
  }

  isLoadRegisterValid() {
    return this.isFormValidExcept('LoadId', 'LoadStatusId', 'Tariff');
  }

  // =====================================================
  // 🔹 Private Helpers
  // =====================================================

  /** Typed form control getter */
  ctrl<K extends keyof LoadInfo>(name: K): FormControl<LoadInfo[K]> {
    const control = this.loadsForm.get(name as string);
    if (!control) throw new Error(`Control "${String(name)}" not found`);
    return control as FormControl<LoadInfo[K]>;
  }

  /** Gets valid LoadId if possible */
  private getValidLoadId(): number | null {
    const loadIdControl = this.ctrl('LoadId');
    return loadIdControl.invalid || this.loading() ? null : loadIdControl.value;
  }

  /** Fetches load info + tariff params */

  private async fetchLoadInfo(loadId: number): Promise<LoadInfo | undefined> {
    return await this.withLoading(async () => {
      const responseLoad = await this.loadService.GetLoadInfo(loadId);
      if (!checkAndToastError(responseLoad, this.toast)) {
        this.transportTariffParams.set([]);
        return undefined;
      }

      const loadInfo = responseLoad.data;
      this.populateForm(loadInfo);
      this.sharedSignal.set(loadInfo);

      const tptParams = loadInfo.TPTParams ?? '';
      const responseParams =
        await this.loadService.GetTransportTariffParamsInArray(tptParams);

      const isValid = checkAndToastError(responseParams, this.toast);
      this.transportTariffParams.set(isValid ? responseParams.data : []);

      return responseLoad.data;
    });
  }

  /** Populates form values */
  private populateForm(loadInfo: LoadInfo): void {
    this.loadsForm.patchValue({ ...loadInfo });
  }

  /** Reset form */
  private resetForm(): void {
    this.loadsForm.reset();
  }

  /** Shared disable condition */
  private baseDisabled(): boolean {
    return this.ctrl('LoadId').invalid || this.loading();
  }

  /** Validates form except one control */
  private isFormValidExcept(
    exceptControl: keyof LoadInfo,
    ...controls: (keyof LoadInfo)[]
  ): boolean {
    const filterKey = [exceptControl, ...controls];
    return Object.keys(this.loadsForm.controls)
      .filter((key) => !filterKey.includes(key as keyof LoadInfo))
      .every((key) => this.ctrl(key as keyof LoadInfo).valid);
  }

  /** Initialization based on load type */
  private async initialize() {
    switch (this.loadType) {
      case LoadListType.TRANSPORT_COMPANY: {
        await this.initializeTransportCompany();
        break;
      }

      case LoadListType.ADMIN:
      case LoadListType.FACTORIES_PRODUCTION_CENTERS: {
        const loadinfo = this.selectedLoadInfo();
        if (!loadinfo) return;
        await this.fetchLoadInfo(loadinfo.LoadId);
        break;
      }

      default:
        break;
    }
  }

  private async initializeTransportCompany() {
    await this.withLoading(async () => {
      const response =
        await this.transportCompanyService.GetTransportCompanyBySoftwareUser();
      if (!checkAndToastError(response, this.toast)) return;

      this.loadsForm.patchValue({
        TransportCompanyId: response.data.TCId,
        TransportCompanyTitle: response.data.TCTitle,
      });

      const loadinfo = this.selectedLoadInfo();
      if (!loadinfo) return;
      await this.fetchLoadInfo(loadinfo.LoadId);
    });
  }

  /** Creates form controls */
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

  /** Creates autocomplete configs */
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
          readOnly: () => this.loadType === LoadListType.TRANSPORT_COMPANY,
        }
      ),
      goods: this.autoCompleteFactory.create(
        AutoCompleteType.Product,
        this.ctrl('GoodId'),
        { control: this.ctrl('GoodTitle') as FormControl<string> }
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
          valueChange: () => {
            this.ctrl('AnnouncementSubGroupId').reset();
            this.transportTariffParams.set([]);
          },
          select: (item: AnnouncementSubGroup) => {
            this.withLoading(async () => {
              this.loadTransportTariffParamsBySubGroup(item.AnnouncementSGId);
              this.ctrl('AnnouncementSubGroupId').setValue(
                item.AnnouncementSGId
              );
            });
          },
        }
      ),
      sourceCity: this.autoCompleteFactory.create(
        AutoCompleteType.City,
        this.ctrl('SourceCityId'),
        {
          placeholder: this.appTitles.getPlaceholder('startCity'),
          label: this.appTitles.inputs.provinceAndCities.startCity,
          control: this.ctrl('SourceCityTitle') as FormControl<string>,
        }
      ),
      targetCity: this.autoCompleteFactory.create(
        AutoCompleteType.City,
        this.ctrl('TargetCityId'),
        {
          placeholder: this.appTitles.getPlaceholder('endCity'),
          label: this.appTitles.inputs.provinceAndCities.endCity,
          control: this.ctrl('TargetCityTitle') as FormControl<string>,
        }
      ),
      loadingPlace: this.autoCompleteFactory.create(
        AutoCompleteType.LADPlaces,
        this.ctrl('LoadingPlaceId'),
        {
          placeholder: this.appTitles.getPlaceholder('loadsLoadingPlace'),
          label: this.appTitles.inputs.loads.loadingPlace,
          control: this.ctrl('LoadingPlaceTitle') as FormControl<string>,
        }
      ),
      dischargingPlace: this.autoCompleteFactory.create(
        AutoCompleteType.LADPlaces,
        this.ctrl('DischargingPlaceId'),
        {
          placeholder: this.appTitles.getPlaceholder('loadsDischargingPlace'),
          label: this.appTitles.inputs.loads.dischargingPlace,
          control: this.ctrl('DischargingPlaceTitle') as FormControl<string>,
        }
      ),
    };
  }

  private async loadTransportTariffParamsBySubGroup(
    announcementSubGroupId: number
  ): Promise<void> {
    const response =
      await this.loadService.GetTransportTariffParamsByAnnouncementSubGroupId(
        announcementSubGroupId
      );

    if (!checkAndToastError(response, this.toast)) {
      return;
    }

    this.transportTariffParams.set(response.data);
  }

  private async getTransportTariffParamsAsString(): Promise<string | null> {
    const paramsArray = this.transportTariffParams();

    if (paramsArray.length === 0) {
      return null;
    }

    const response =
      await this.loadService.GetTransportTariffParamsInString(paramsArray);

    if (!checkAndToastError(response, this.toast)) {
      return null;
    }

    return response.data.TPTParams;
  }

  /** Creates action buttons config */
  private createActionButtons() {
    return [
      {
        label: 'ثبت',
        severity: 'green' as ButtonSeverity,
        action: () => this.clickRegisterLoad(),
        widthClass: this.baseWidthClass,
        hidden: () => this.ctrl('LoadId').valid,
        disabled: () => !this.isLoadRegisterValid() || this.loading(),
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
}
