import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TravelTime } from 'app/data/model/travel-time.model';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { City } from 'app/data/model/province-city.model';

import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { ProvinceAndCityManagementService } from 'app/services/province-city-management/province-and-city-management.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { TravelTimeManagementService } from 'app/services/travel-time-management/travel-time-management.service';

import { TextInputComponent } from '../../shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { SearchAutoCompleteComponent } from '../../shared/inputs/search-auto-complete/search-auto-complete.component';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { AppTitles } from 'app/constants/Titles';
import { BaseLoading } from '../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';

enum TravelTimeFormMode {
  EDITABLE,
  REGISTER,
}

type TravelTimeTableRow = TravelTime & { edit: string; delete: string };

@Component({
  selector: 'app-travel-time-form',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    TextInputComponent,
    ToggleSwitchInputComponent,
    SearchAutoCompleteComponent,
    ConfirmDialogModule,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './travel-time-form.component.html',
  styleUrl: './travel-time-form.component.scss',
})
export class TravelTimeFormComponent
  extends BaseLoading
  implements OnInit, OnDestroy
{
  // Services (injected)
  private fb = inject(FormBuilder);
  private loaderTypeService = inject(LoaderTypesService);
  private provinceService = inject(ProvinceAndCityManagementService);
  private confirmService = inject(AppConfirmService);
  private travelTimeService = inject(TravelTimeManagementService);

  // State & lifecycle helpers
  private travelTimeFormMode = TravelTimeFormMode.REGISTER;

  readonly cloumns: TableColumn<TravelTimeTableRow>[] = [
    { header: 'شناسه بارگیر', field: 'LoaderTypeId' },
    { header: 'نوع بارگیر', field: 'LoaderTypeTitle' },
    { header: 'شناسه شهر مبدا', field: 'SourceCityId' },
    { header: 'شهر مبدا', field: 'SourceCityName' },
    { header: 'شناسه شهر مقصد', field: 'TargetCityId' },
    { header: 'شهر مقصد', field: 'TargetCityName' },
    { header: 'مدت سفر', field: 'TravelTime' },
    { header: 'فعال/غیرفعال', field: 'Active', type: TableColumnType.BOOLEAN },
    {
      ...editCell.config,
      field: 'edit',
      onAction: async (row: TravelTime) => await this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: async (row: TravelTime) => await this.onDelete(row),
    },
  ];

  readonly tableUi = TableConfig;
  readonly appTitle = AppTitles;

  // UI state
  headerTitle = '';
  formDialogVisible = false;

  // Cache keys
  cacheKeyLength = 3;
  loaderTypeStartKey = '';
  sourceStartKey = '';
  targetStartKey = '';

  // Data
  travelTimes: TravelTimeTableRow[] = [];
  travelTimeCached?: TravelTime;

  // Forms
  travelTimeSearchForm = this.fb.group({
    searchLoaderTypeId: [0],
    searchLoaderType: [''],
    searchSourceCityId: [0],
    searchSourceCity: [''],
    searchTargetCityId: [0],
    searchTargetCity: [''],
  });

  travelTimeForm = this.fb.group({
    loaderTypeId: [0, Validators.min(1)],
    sourceCityId: [0, Validators.min(1)],
    targetCityId: [0, Validators.min(1)],

    loaderType: [''],
    sourceCityName: [''],
    targetCityName: [''],
    travelTime: [0, Validators.min(1)],
    travelTimeActive: [true, Validators.required],
  });

  // Form getters for better access
  get loaderTypeId() {
    return this.travelTimeForm.get('loaderTypeId') as FormControl;
  }
  get sourceCityId() {
    return this.travelTimeForm.get('sourceCityId') as FormControl;
  }
  get targetCityId() {
    return this.travelTimeForm.get('targetCityId') as FormControl;
  }
  get loaderType() {
    return this.travelTimeForm.get('loaderType') as FormControl;
  }
  get sourceCityName() {
    return this.travelTimeForm.get('sourceCityName') as FormControl;
  }
  get targetCityName() {
    return this.travelTimeForm.get('targetCityName') as FormControl;
  }
  get travelTimeTake() {
    return this.travelTimeForm.get('travelTime') as FormControl;
  }
  get travelTimeActive() {
    return this.travelTimeForm.get('travelTimeActive') as FormControl;
  }
  get searchLoaderType() {
    return this.travelTimeSearchForm.get('searchLoaderType') as FormControl;
  }
  get searchSourceCity() {
    return this.travelTimeSearchForm.get('searchSourceCity') as FormControl;
  }
  get searchTargetCity() {
    return this.travelTimeSearchForm.get('searchTargetCity') as FormControl;
  }
  get searchLoaderTypeId() {
    return this.travelTimeSearchForm.get('searchLoaderTypeId') as FormControl;
  }
  get searchSourceCityId() {
    return this.travelTimeSearchForm.get('searchSourceCityId') as FormControl;
  }
  get searchTargetCityId() {
    return this.travelTimeSearchForm.get('searchTargetCityId') as FormControl;
  }

  // Reset some autocomplete controls on change
  onAutoCompleteChange(control: FormControl) {
    control.setValue(0);
  }

  // Actions
  async searchTimeTravel(): Promise<void> {
    if (this.loading() || !this.isSearchFormValid()) return;
    await this.withLoading(async () => {
      await this.updateTable();
    });
  }

  isSearchFormValid(): boolean {
    if (this.searchLoaderTypeId.value === 0) return false;
    return [this.searchSourceCityId.value, this.searchTargetCityId.value].some(
      (v) => v && v !== 0
    );
  }

  async registerOrEdit() {
    if (this.loading()) return;
    await this.withLoading(async () => {
      if (this.travelTimeFormMode === TravelTimeFormMode.REGISTER) {
        await this.registerTravelTime();
      } else {
        await this.editTravelTime();
      }
    });
  }

  async registerTravelTime() {
    const tasks: Promise<ApiResponse<ShortResponse>>[] = [
      this.travelTimeService.RegisterNewTravelTime(
        this.loaderTypeId.value,
        this.sourceCityId.value,
        this.targetCityId.value,
        this.travelTimeTake.value
      ),
    ];
    tasks.push(this.updateTimeTravelActive());

    const results = await Promise.all(tasks);
    if (results.some((res) => !checkAndToastError(res, this.toast))) return;
    this.toast.success('موفق', results[0]?.data?.Message ?? '');
    this.onCloseDialog();
  }

  async editTravelTime() {
    if (this.travelTimeForm.invalid) return;
    const tasks: Promise<ApiResponse<ShortResponse>>[] = [
      this.travelTimeService.EditTravelTime(
        this.loaderTypeId.value,
        this.sourceCityId.value,
        this.targetCityId.value,
        this.travelTimeTake.value
      ),
    ];
    tasks.push(this.updateTimeTravelActive());

    const results = await Promise.all(tasks);
    if (results.some((res) => !checkAndToastError(res, this.toast))) return;
    this.toast.success(
      'موفق',
      results[0].data?.Message ?? 'با موفقیت انجام شد'
    );
    await this.updateTable();
    this.onCloseDialog();
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره');
      if (response.error?.code === 28) {
        return true;
      }
      return false;
    }
    return true;
  }

  private async updateTimeTravelActive(): Promise<ApiResponse<ShortResponse>> {
    if (this.travelTimeCached?.Active !== this.travelTimeActive.value) {
      return this.travelTimeService.ChangeTravelTimeStatus(
        this.loaderTypeId.value,
        this.sourceCityId.value,
        this.targetCityId.value
      );
    }
    return { success: true, data: { Message: '' } };
  }

  onSearchCity = async (query: string): Promise<City[]> => {
    const res = await this.provinceService.GetProvincesAndCitiesInfo(query);
    if (!this.isSuccessful(res)) return [];
    return res.data?.flatMap((p) => p?.Cities ?? []) || [];
  };

  onSearchLoaderType = async (query: string): Promise<LoaderType[]> => {
    const response = await this.loaderTypeService.GetLoaderTypesInfo(query);
    if (!this.isSuccessful(response)) {
      return [];
    }
    return Array.isArray(response.data) ? response.data : [];
  };

  private extractTravelTimeFormForm(): TravelTime {
    return {
      LoaderTypeId: this.loaderTypeId.value,
      SourceCityId: this.sourceCityId.value,
      SourceCityName: this.sourceCityName.value,
      TargetCityId: this.targetCityId.value,
      TargetCityName: this.targetCityName.value,
      TravelTime: this.travelTimeTake.value,
      Active: this.travelTimeActive.value,
    };
  }

  onSelectSearchTargetCity(value: City) {
    this.searchTargetCityId.setValue(value.CityCode);
  }

  onSelectSearchSourceCity(value: City) {
    this.searchSourceCityId.setValue(value.CityCode);
  }

  onSelectSearchLoaderType(value: LoaderType) {
    this.searchLoaderTypeId.setValue(value.LoaderTypeId);
  }

  onSelectTargetCity(value: City) {
    this.targetCityId.setValue(value.CityCode);
  }

  onSelectSourceCity(value: City) {
    this.sourceCityId.setValue(value.CityCode);
  }

  onSelectLoaderType(value: LoaderType) {
    this.loaderTypeId.setValue(value.LoaderTypeId);
  }

  async onEdit(row: TravelTime) {
    if (this.loading()) return;
    await this.withLoading(async () => {
      const response = await this.travelTimeService.GetTravelTime(
        row.LoaderTypeId!,
        row.SourceCityId!,
        row.TargetCityId!
      );
      if (!this.isSuccessful(response)) {
        this.onCloseDialog();
        return;
      }
      const travelTime = response.data!;
      this.travelTimeFormMode = TravelTimeFormMode.EDITABLE;
      this.travelTimeCached = travelTime;
      this.populateTravelTimeForm(travelTime);
      this.headerTitle = 'ویرایش مدت سفر';
      this.formDialogVisible = true;
    });
  }

  async onNew() {
    if (this.loading()) return;

    this.travelTimeFormMode = TravelTimeFormMode.REGISTER;
    this.travelTimeCached = this.extractTravelTimeFormForm();
    this.headerTitle = 'افزودن مدت سفر';
    this.formDialogVisible = true;
  }

  onCloseDialog() {
    this.formDialogVisible = false;
    this.resetTravelTimeForm();
    this.headerTitle = '';
  }

  async onDelete(row: TravelTime) {
    this.confirmService.confirmDelete(
      `${row.LoaderTypeTitle} - ${row.SourceCityName} به ${row.TargetCityName}`,
      async () => {
        await this.withLoading(async () => {
          await this.deleteTravelTime(row);
        });
      }
    );
  }

  private async updateTable(showErrorNotFound = false): Promise<void> {
    const response = await this.travelTimeService.GetTravelTimes(
      this.searchLoaderTypeId.value || undefined,
      this.searchSourceCityId.value || undefined,
      this.searchTargetCityId.value || undefined
    );

    if (!response.success) {
      if (response.error?.code === 28) {
        this.travelTimes = [];
        if (showErrorNotFound) return;
      }
      if (this.isSuccessful(response)) return;
    }

    this.travelTimes =
      response.data?.map((t) => ({
        ...t,
        edit: editCell.value,
        delete: deleteCell.value,
      })) ?? [];
  }

  private resetTravelTimeForm() {
    this.travelTimeForm.reset();
    this.loaderTypeId.setValue(0);
    this.sourceCityId.setValue(0);
    this.targetCityId.setValue(0);
    this.travelTimeActive.setValue(true);
  }

  async deleteTravelTime(rowData: TravelTime) {
    const response = await this.travelTimeService.DeleteTravelTime(
      rowData.LoaderTypeId,
      rowData.SourceCityId ?? 0,
      rowData.TargetCityId ?? 0
    );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    await this.updateTable(false);
  }

  private populateTravelTimeForm(data: TravelTime) {
    this.travelTimeForm.patchValue({
      loaderTypeId: data.LoaderTypeId,
      loaderType: data.LoaderTypeTitle,
      sourceCityId: data.SourceCityId,
      sourceCityName: data.SourceCityName,
      targetCityId: data.TargetCityId,
      targetCityName: data.TargetCityName,
      travelTime: data.TravelTime,
      travelTimeActive: data.Active,
    });
  }

  isTravelTimeFormReadonly(): boolean {
    return this.travelTimeFormMode === TravelTimeFormMode.EDITABLE;
  }
}
