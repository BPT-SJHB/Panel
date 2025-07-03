import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
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
import { LoaderType } from 'app/data/model/loader-type.model';
import { Product } from 'app/data/model/product-type.model';

enum TariffsFormMode {
  EDITABLE,
  REGISTER,
}

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
    BinaryRadioInputComponent,
    SearchAutoCompleteComponent,
  ],
  templateUrl: './tariffs-form.component.html',
  styleUrl: './tariffs-form.component.scss',

  providers: [ConfirmationService],
})
export class TariffsFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly loaderTypeService = inject(LoaderTypesService);
  private readonly provinceService = inject(ProvinceAndCityManagementService);
  private readonly productService = inject(ProductTypesService);
  private readonly destroy$ = new Subject<void>();

  formDialogVisible = false;
  headerTitle = '';
  loading = false;
  widthAddon = '6rem';

  tariffsFormMode: TariffsFormMode = TariffsFormMode.REGISTER;
  tariffs: Tariff[] = [];
  tariffCached?: Tariff;

  tariffSearchForm = this.fb.group({
    searchLoaderTypeId: [0],
    searchGoodsId: [0],
    searchSourceCityId: [0],
    searchTargetCityId: [0],
    searchLoaderType: [''],
    searchSourceCity: [''],
    searchTargetCity: [''],
    searchGoods: [''],
  });

  tariffForm = this.fb.group({
    SourceCityId: [0, Validators.min(1)],
    TargetCityId: [0, Validators.min(1)],
    LoaderTypeId: [0, Validators.min(1)],
    GoodId: [0, Validators.min(1)],
    SourceCityTitle: [''],
    TargetCityTitle: [''],
    LoaderTypeTitle: [''],
    GoodTitle: [''],
    Tariff: [0, Validators.min(1)],
    BaseTonnag: [0, Validators.min(1)],
    CalculationReference: [''],
    Active: [true, Validators.required],
  });

  readonly cols = [
    'ویرایش',
    'حذف',
    'کد نوع بارگیر',
    'نوع بارگیر',
    'کد نوع بار',
    'نوع بار',
    'کد شهر مبدا',
    'شهر مبدا',
    'کد شهر مقصد',
    'شهر مقصد',
    'تعرفه',
    'تناژ پایه',
    'مبنای محاسبه',
    'فعال/غیرفعال',
  ];

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchTariffs(): void {
    if (this.isSearchFormValid()) {
      this.tariffs = mockTariffs;
    }
  }

  isSearchFormValid(): boolean {
    return (
      this.searchLoaderTypeId.value &&
      (this.searchSourceCityId.value ||
        this.searchTargetCityId.value ||
        this.searchGoodsId.value)
    );
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
    this.headerTitle = '';
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

  async onEdit(row: Tariff) {
    if (this.loading) return;
    try {
      this.loadingService.setLoading(true);
      const tariff = mockTariffs[0]; // TODO: Replace with real API call
      this.tariffsFormMode = TariffsFormMode.EDITABLE;
      this.tariffCached = tariff;
      this.populateFormFromTariff(tariff);
      this.headerTitle = `ویرایش`;
      this.formDialogVisible = true;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async onNew(): Promise<void> {
    if (this.loading) return;
    this.tariffCached = this.extractTariffFromForm();
    this.tariffsFormMode = TariffsFormMode.REGISTER;
    this.resetTariffsForm();
    this.headerTitle = 'افزودن تعرفه';
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
