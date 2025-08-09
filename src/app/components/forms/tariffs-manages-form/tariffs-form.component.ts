import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

// PrimeNG UI Components
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// Shared Components
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';

// Services & Models
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { ProvinceAndCityManagementService } from 'app/services/province-city-management/province-and-city-management.service';
import { ProductTypesService } from 'app/services/product-types/product-types.service';

import { mockTariffs } from 'app/data/mock/tariff.mock';
import { Tariff } from 'app/data/model/tariff.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { City } from 'app/data/model/province-city.model';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { Product } from 'app/data/model/product-type.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Base } from 'primeng/base';
import { BaseLoading } from '../shared/component-base/base-loading';
import {
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { TariffsManagementService } from 'app/services/Tariffs-management/tariffs-management.service';
import { checkAndToastError } from 'app/utils/api-utils';

enum TariffsFormMode {
  EDITABLE,
  REGISTER,
}

type TariffTable = Tariff & { edit: any; delete: any };

@Component({
  selector: 'app-tariffs-editor-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TextInputComponent,
    ToggleSwitchInputComponent,
    SearchAutoCompleteComponent,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './tariffs-form.component.html',
  styleUrl: './tariffs-form.component.scss',
  providers: [ConfirmationService],
})
export class TariffsFormComponent extends BaseLoading {
  private readonly fb = inject(FormBuilder);
  private readonly tariffService = inject(TariffsManagementService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly loaderTypeService = inject(LoaderTypesService);
  private readonly provinceService = inject(ProvinceAndCityManagementService);
  private readonly productService = inject(ProductTypesService);
  private readonly nonNullable = this.fb.nonNullable;

  readonly headerTitle = signal<string>('');
  readonly addonWidth = '6rem';
  tariffsFormMode: TariffsFormMode = TariffsFormMode.REGISTER;
  formDialogVisible = false;

  tariffs: TariffTable[] = [];
  tariffCached?: Tariff;

  readonly tariffSearchForm = this.fb.group({
    searchLoaderTypeId: this.nonNullable.control(-1, Validators.min(0)),
    searchGoodsId: this.nonNullable.control(-1, Validators.min(0)),
    searchSourceCityId: this.nonNullable.control(-1, Validators.min(0)),
    searchTargetCityId: this.nonNullable.control(-1, Validators.min(0)),
    searchLoaderType: this.nonNullable.control(''),
    searchSourceCity: this.nonNullable.control(''),
    searchTargetCity: this.nonNullable.control(''),
    searchGoods: this.nonNullable.control(''),
  });

  tariffForm = this.fb.group({
    SourceCityId: this.nonNullable.control(-1, Validators.min(0)),
    TargetCityId: this.nonNullable.control(-1, Validators.min(0)),
    LoaderTypeId: this.nonNullable.control(-1, Validators.min(0)),
    GoodId: this.nonNullable.control(-1, Validators.min(0)),
    SourceCityTitle: this.nonNullable.control(''),
    TargetCityTitle: this.nonNullable.control(''),
    LoaderTypeTitle: this.nonNullable.control(''),
    GoodTitle: this.nonNullable.control(''),
    Tariff: this.nonNullable.control(0, Validators.min(1)),
    BaseTonnag: this.nonNullable.control(-1, Validators.min(1)),
    CalculationReference: this.nonNullable.control(''),
    Active: this.nonNullable.control(true),
  });

  readonly columns: TableColumn<TariffTable>[] = [
    {
      field: 'edit',
      header: 'ویرایش',
      type: TableColumnType.BUTTON_ICON,
      class: 'text-center',
      onAction: async (row: TariffTable) => await this.onEdit(row),
    },
    {
      field: 'delete',
      header: 'حذف',
      type: TableColumnType.BUTTON_ICON,
      class: 'text-center',
    },
    {
      field: 'LoaderTypeId',
      header: 'کد نوع بارگیر',
    },
    {
      field: 'LoaderTypeTitle',
      header: 'نوع بارگیر',
    },
    {
      field: 'GoodId',
      header: 'کد نوع بار',
    },
    {
      field: 'GoodTitle',
      header: 'نوع بار',
    },
    {
      field: 'SourceCityId',
      header: 'کد شهر مبدا',
    },
    {
      field: 'SourceCityTitle',
      header: 'شهر مبدا',
    },
    {
      field: 'TargetCityId',
      header: 'کد شهر مقصد',
    },
    {
      field: 'TargetCityTitle',
      header: 'شهر مقصد',
    },
    {
      field: 'Tariff',
      header: 'تعرفه',
    },
    {
      field: 'BaseTonnag',
      header: 'تناژ پایه',
    },
    {
      field: 'CalculationReference',
      header: 'مبنای محاسبه',
    },
    {
      field: 'Active',
      header: 'فعال/غیرفعال',
      type: TableColumnType.BOOLEAN,
    },
  ];

  async searchTariffs(): Promise<void> {
    const loaderTypeId = this.searchLoaderTypeId.value;
    const sourceCityId = this.getValidValue(this.searchSourceCityId);
    const targetCityId = this.getValidValue(this.searchTargetCityId);
    const goodId = this.getValidValue(this.searchGoodsId);

    await this.withLoading(async () => {
      const response = await this.tariffService.GetTariffs(
        loaderTypeId,
        sourceCityId,
        targetCityId,
        goodId,
      );

      if (!checkAndToastError(response, this.toast)) return;
      this.tariffs = response.data.map((t) => ({
        ...t,
        edit: 'pi pi-pencil',
        delete: 'pi pi-trash',
      }));
    });
  }

  isSearchFormValid(): boolean {
    return (
      this.searchLoaderTypeId.value &&
      (this.searchSourceCityId.value ||
        this.searchTargetCityId.value ||
        this.searchGoodsId.value)
    );
  }

  private getValidValue(control: FormControl): number | undefined {
    return control.valid ? control.value : undefined;
  }

  private populateFormFromTariff(tariff: Tariff): void {
    this.tariffForm.patchValue({ ...tariff });
  }

  private extractTariffFromForm(): Tariff {
    return {
      SourceCityId: this.SourceCityId.value,
      TargetCityId: this.TargetCityId.value,
      LoaderTypeId: this.LoaderTypeId.value,
      GoodId: this.GoodId.value,
      SourceCityTitle: this.SourceCityTitle.value,
      TargetCityTitle: this.TargetCityTitle.value,
      LoaderTypeTitle: this.LoaderTypeTitle.value,
      GoodTitle: this.GoodTitle.value,
      Tariff: this.Tariff.value,
      BaseTonnag: this.BaseTonnag.value,
      CalculationReference: this.CalculationReference.value,
      Active: this.Active.value,
    };
  }

  private resetTariffsForm(): void {
    this.tariffForm.reset({
      SourceCityId: 0,
      TargetCityId: 0,
      LoaderTypeId: 0,
      GoodId: 0,
      Tariff: 0,
      BaseTonnag: 0,
      Active: true,
    });
  }

  closeDialogTariffForm(): void {
    this.formDialogVisible = false;
    this.resetTariffsForm();
    this.headerTitle.set('');
  }

  onDelete(row: Tariff): void {
    this.confirmationService.confirm({
      message: `آیا می‌خواهید با کد ${row.LoaderTypeId} حذف شود؟`,
      header: `حذف رکورد ${row.LoaderTypeId}`,
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'لغو',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: { label: 'حذف', severity: 'danger' },
      accept: async () => {
        this.loadingService.setLoading(true);
        await this.deleteTariff(row.LoaderTypeId ?? 0);
        this.loadingService.setLoading(false);
      },
    });
  }

  async onEdit(row: Tariff): Promise<void> {
    await this.withLoading(async () => {
      const response = await this.tariffService.GetTariffs(
        row.LoaderTypeId,
        row.SourceCityId,
        row.TargetCityId,
        row.GoodId,
      );

      if (!checkAndToastError(response, this.toast)) return;

      console.log('g');

      const tariff = response.data[0];
      this.tariffsFormMode = TariffsFormMode.EDITABLE;
      this.tariffCached = tariff;
      this.populateFormFromTariff(tariff);
      this.headerTitle.set('ویرایش');
      this.formDialogVisible = true;
    });
  }

  async onNew(): Promise<void> {
    if (this.loading()) return;
    this.tariffCached = this.extractTariffFromForm();
    this.tariffsFormMode = TariffsFormMode.REGISTER;
    this.resetTariffsForm();
    this.headerTitle.set('افزودن تعرفه');
    this.formDialogVisible = true;
  }

  registerTariffs(): void {
    throw new Error('registerTariffs not implemented');
  }

  editTariffForm(): void {
    throw new Error('editTariffForm not implemented');
  }

  onSearchCity = async (query: string): Promise<City[]> => {
    const res = await this.provinceService.GetProvincesAndCitiesInfo(query);
    return this.isSuccessful(res)
      ? res.data?.flatMap((p) => p?.Cities ?? []) || []
      : [];
  };

  onSearchProduct = async (query: string): Promise<Product[]> => {
    const res = await this.productService.GetProductsInfo(query);
    return this.isSuccessful(res)
      ? res.data?.flatMap((p) => p?.Products ?? []) || []
      : [];
  };

  onSearchLoaderType = async (query: string): Promise<LoaderType[]> => {
    const res = await this.loaderTypeService.GetLoaderTypesInfo(query);
    return this.isSuccessful(res) ? res.data! : [];
  };

  onAutoCompleteChange(control: FormControl): void {
    control.setValue(0);
  }

  isTariffsFormReadonly(): boolean {
    return this.tariffsFormMode === TariffsFormMode.EDITABLE;
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

  onSelectSearchProduct(value: Product) {
    this.searchGoodsId.setValue(value.ProductId);
  }

  onSelectTargetCity(value: City) {
    this.TargetCityId.setValue(value.CityCode);
  }

  onSelectSourceCity(value: City) {
    this.SourceCityId.setValue(value.CityCode);
  }

  onSelectLoaderType(value: LoaderType) {
    this.LoaderTypeId.setValue(value.LoaderTypeId);
  }

  onSelectProduct(value: Product) {
    this.GoodId.setValue(value.ProductId);
  }

  async deleteTariff(id: number): Promise<void> {
    // TODO: Replace mock response with API
    const response: ApiResponse<ShortResponse> = {
      success: true,
      data: { Message: 'حذف موفق بود' },
    };
    this.toast.success('موفق', response.data?.Message ?? 'با موفقیت حذف شد');
    this.updateTable();
  }

  private updateTable(): void {
    // TODO: Reload tariffs from API
    this.searchTariffs();
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره');
      return false;
    }
    return true;
  }

  // Getters for FormControls
  get searchLoaderType() {
    return this.tariffSearchForm.get('searchLoaderType') as FormControl;
  }
  get searchSourceCity() {
    return this.tariffSearchForm.get('searchSourceCity') as FormControl;
  }
  get searchTargetCity() {
    return this.tariffSearchForm.get('searchTargetCity') as FormControl;
  }
  get searchLoaderTypeId() {
    return this.tariffSearchForm.get('searchLoaderTypeId') as FormControl;
  }
  get searchGoodsId() {
    return this.tariffSearchForm.get('searchGoodsId') as FormControl;
  }
  get searchSourceCityId() {
    return this.tariffSearchForm.get('searchSourceCityId') as FormControl;
  }
  get searchTargetCityId() {
    return this.tariffSearchForm.get('searchTargetCityId') as FormControl;
  }
  get searchGoods() {
    return this.tariffSearchForm.get('searchGoods') as FormControl;
  }

  get SourceCityId() {
    return this.tariffForm.get('SourceCityId') as FormControl;
  }
  get TargetCityId() {
    return this.tariffForm.get('TargetCityId') as FormControl;
  }
  get LoaderTypeId() {
    return this.tariffForm.get('LoaderTypeId') as FormControl;
  }
  get GoodId() {
    return this.tariffForm.get('GoodId') as FormControl;
  }
  get SourceCityTitle() {
    return this.tariffForm.get('SourceCityTitle') as FormControl;
  }
  get TargetCityTitle() {
    return this.tariffForm.get('TargetCityTitle') as FormControl;
  }
  get LoaderTypeTitle() {
    return this.tariffForm.get('LoaderTypeTitle') as FormControl;
  }
  get GoodTitle() {
    return this.tariffForm.get('GoodTitle') as FormControl;
  }
  get Tariff() {
    return this.tariffForm.get('Tariff') as FormControl;
  }
  get BaseTonnag() {
    return this.tariffForm.get('BaseTonnag') as FormControl;
  }
  get CalculationReference() {
    return this.tariffForm.get('CalculationReference') as FormControl;
  }
  get Active() {
    return this.tariffForm.get('Active') as FormControl;
  }
}
