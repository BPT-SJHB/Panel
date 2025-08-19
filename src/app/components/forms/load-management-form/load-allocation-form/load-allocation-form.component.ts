import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { ValidationSchema } from 'app/constants/validation-schema';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TruckDriverInfo } from 'app/services/driver-truck-management/model/truck-driver-info.model';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TableConfig } from 'app/constants/ui/table.ui';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';

@Component({
  selector: 'app-load-allocation-form',
  imports: [
    SearchInputComponent,
    TableComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './load-allocation-form.component.html',
  styleUrl: './load-allocation-form.component.scss',
})
export class LoadAllocationFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  readonly shearedSignal!: WritableSignal<LoadInfo | null>;
  readonly rows = signal<LoadInfo[]>([]);

  private readonly fb = inject(FormBuilder);
  private readonly loadService = inject(LoadManagementService);
  private readonly truckDriverService = inject(Driver_TruckManagementService);

  readonly configTable: typeof TableConfig = {
    ...TableConfig,
    paginator: false,
  };
  readonly addonWidth = '10rem';

  onViewActivated(): void {
    if (!this.shearedSignal()) return;
    this.withLoading(async () => {
      const response = await this.loadService.GetLoadInfo(
        this.shearedSignal()!.LoadId
      );
      if (!checkAndToastError(response, this.toast)) this.rows.set([]);
      else this.rows.set([response.data]);
    });
  }

  readonly columns: TableColumn<LoadInfo>[] = [
    { header: 'شناسه بار', field: 'LoadId' },
    { header: 'عنوان کالا', field: 'GoodTitle' },
    { header: 'تناژ', field: 'Tonaj', class: 'font-bold' },
    { header: 'شهر مبدا', field: 'SourceCityTitle' },
    { header: 'شهر مقصد', field: 'TargetCityTitle' },
    { header: 'مبدا بارگیری', field: 'LoadingPlaceTitle' },
    { header: 'مقصد تخلیه', field: 'DischargingPlaceTitle' },
    { header: 'تعداد', field: 'TotalNumber', class: 'text-right' },
    { header: 'تعرفه', field: 'Tariff' },
    { header: 'وضعیت بار', field: 'LoadStatusTitle' },
    { header: 'تاریخ اعلام', field: 'AnnounceDate' },
    { header: 'زمان اعلام', field: 'AnnounceTime' },
    { header: 'گروه اعلام بار', field: 'AnnouncementGroupTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSubGroupTitle' },
    { header: 'گیرنده', field: 'Recipient' },
    { header: 'آدرس', field: 'Address' },
    { header: 'توضیحات', field: 'Description' },
    { header: 'پارامترهای موثر', field: 'TPTParamsJoint' },
  ];

  readonly driverForm = this.fb.group({
    DriverId: this.fb.control<number | null>(null, Validators.required),
    NameFamily: this.fb.nonNullable.control('', ValidationSchema.fullName),
    NationalCode: this.fb.nonNullable.control('', ValidationSchema.nationalId),
  });

  readonly truckForm = this.fb.group({
    TruckId: this.fb.control<number | null>(null, Validators.required),
    SmartCardNo: this.fb.nonNullable.control('', ValidationSchema.smartCard),
    Pelak: this.fb.nonNullable.control('', ValidationSchema.nationalId),
  });

  readonly truckComposeForm = this.fb.group({
    DriverId: this.fb.control<number | null>(null, Validators.required),
    NameFamily: this.fb.nonNullable.control('', ValidationSchema.fullName),
    NationalCode: this.fb.nonNullable.control('', ValidationSchema.nationalId),
    TruckId: this.fb.control<number | null>(null, Validators.required),
    SmartCardNo: this.fb.nonNullable.control('', ValidationSchema.smartCard),
    Pelak: this.fb.nonNullable.control('', ValidationSchema.nationalId),
    TurnId: this.fb.control<number | null>(null),
    OtaghdarTurnNumber: this.fb.nonNullable.control(''),
    MoneyWalletId: this.fb.control<number | null>(null),
    MoneyWalletCode: this.fb.nonNullable.control(''),
    Balance: this.fb.nonNullable.control(0),
  });

  driverCtrl<K extends keyof TruckDriverInfo>(name: K) {
    return this.getFormControl<TruckDriverInfo[K]>(this.driverForm, name);
  }

  truckCtrl<K extends keyof TruckInfo>(name: K) {
    return this.getFormControl<TruckInfo[K]>(this.truckForm, name);
  }

  truckComposeCtrl<K extends keyof typeof this.truckComposeForm.value>(
    name: K
  ) {
    return this.getFormControl(this.truckComposeForm, name);
  }

  private getFormControl<T>(form: FormGroup, name: string): FormControl<T> {
    const control = form.get(name);
    if (!control) throw new Error(`Control "${name}" not found`);
    return control as FormControl<T>;
  }

  readonly searchDriver = async (nationalCode: string) => {
    if (this.driverCtrl('NationalCode').invalid || this.loading()) return;

    await this.withLoading(async () => {
      const res =
        await this.truckDriverService.GetDriverInfoFromAPI(nationalCode);
      if (!checkAndToastError(res, this.toast)) {
        this.driverForm.reset();
        return;
      }
      this.driverForm.patchValue(res.data);
    });
  };

  readonly searchTruck = async (smartCard: string) => {
    if (this.truckCtrl('SmartCardNo').invalid || this.loading()) return;

    await this.withLoading(async () => {
      const res = await this.truckDriverService.GetTruckInfoFromAPI(smartCard);
      if (!checkAndToastError(res, this.toast)) {
        this.truckForm.reset();
        return;
      }
      this.truckForm.patchValue(res.data);
      await this.loadComposeTruck(res.data.TruckId);
    });
  };

  private async loadComposeTruck(truckId: number) {
    const res =
      await this.truckDriverService.GetComposedTruckInfoWithLastActiveTurn(
        truckId
      );
    if (!checkAndToastError(res, this.toast)) {
      this.truckComposeForm.reset();
      return;
    }

    const { MoneyWallet, Turn, Truck, TruckDriver } = res.data;
    this.truckComposeForm.patchValue({
      ...TruckDriver,
      ...Truck,
      ...Turn,
      ...MoneyWallet,
    });
  }

  isRegisterLoadValid() {
    return (
      this.driverCtrl('DriverId').valid &&
      this.truckCtrl('TruckId').valid &&
      this.shearedSignal()
    );
  }

  registerNewLoad() {
    if (!this.isRegisterLoadValid()) return;

    this.withLoading(async () => {
      const res =
        await this.loadService.RegisterNewLoadAllocationForTransportCompanies(
          this.driverCtrl('DriverId').value,
          this.truckCtrl('TruckId').value,
          this.shearedSignal()!.LoadId
        );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  resetAllForms() {
    this.truckComposeForm.reset();
    this.driverForm.reset();
    this.truckForm.reset();
  }
}
