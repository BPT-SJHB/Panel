import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

// 🔧 Constants & Models
import { ValidationSchema } from 'app/constants/validation-schema';
import { TruckDriverInfo } from 'app/services/driver-truck-management/model/truck-driver-info.model';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';
import { Turn } from 'app/services/turn-management/model/turn.model';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';

// 🧩 Services
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';

// 🧰 Utilities
import { checkAndToastError } from 'app/utils/api-utils';

// 🧱 Shared Components
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { Card } from 'primeng/card';
``;
@Component({
  selector: 'app-turns-truck-info-base-form',
  imports: [
    ReactiveFormsModule,
    SearchInputComponent,
    TextInputComponent,
    SearchAutoCompleteComponent,
    Card,
  ],
  templateUrl: './turns-truck-info-base-form.component.html',
  styleUrl: './turns-truck-info-base-form.component.scss',
})
export class TurnsTruckInfoBaseFormComponent {
  // 📦 Dependency Injection
  private fb = inject(FormBuilder);
  private truckDriverMangerService = inject(Driver_TruckManagementService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private sequentialTurnService = inject(SequentialTurnManagementService);

  // 📡 Destroy stream for unsubscribing
  private destroy$ = new Subject<void>();

  // 📥 Inputs
  @Input() sequentialTurnId = new FormControl('', Validators.min(0));
  @Input() sequentialTurnTitle = new FormControl('');
  @Input() truckId = new FormControl('', Validators.min(0));

  // 🔄 Loading state
  loading = false;

  // 🧩 UI config
  addonWidth = '10rem';

  // 📋 Search form for smart card input
  searchTruckInfoForm = this.fb.group({
    smart: ['', ValidationSchema.smartCard],
  });

  // 📋 Main form for truck, driver, and turn info
  truckInfoForm!: FormGroup;

  // ♻️ Cleanup subscription
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 🚦 Listen to loading state on init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));

    this.truckInfoForm = this.fb.group({
      truckId: this.truckId,
      loaderTypeId: ['', Validators.min(0)],
      licensePlate: ['', ValidationSchema.licensePlateNumber],
      driverId: [''],
      driverNationalId: [''],
      turnId: [''],
      otaghdarTurnNumber: [''],
      sequentialTurn: [''],
      turnStats: [''],
      driverName: [''],
      turnDescription: [''],
      walletCode: [''],
      walletBalance: [0],
    });
  }

  // 🔍 Search truck and driver info based on smart code
  searchTruckDriverInfo = async (smartCode: string) => {
    if (this.loading) return;
    try {
      this.loadingService.setLoading(true);

      const resTruckInfo =
        await this.truckDriverMangerService.GetTruckInfoFromAPI(smartCode);
      if (!checkAndToastError(resTruckInfo, this.toast)) return;

      const resComposed =
        await this.truckDriverMangerService.GetComposedTruckInfoWithLastTurn(
          resTruckInfo.data.TruckId
        );
      if (!checkAndToastError(resComposed, this.toast))
        return this.resetTurnsBaseForm();

      const { Truck, TruckDriver, Turn, MoneyWallet } = resComposed.data;
      this.populateTruckForm(Truck, TruckDriver, Turn, MoneyWallet);
    } finally {
      this.loadingService.setLoading(false);
    }
  };

  // 🧩 Populate form values with retrieved data
  private populateTruckForm(
    truck: TruckInfo,
    driver?: TruckDriverInfo,
    turn?: Turn,
    wallet?: Wallet
  ) {
    this.truckInfoForm.patchValue({
      truckId: truck.TruckId,
      loaderTypeId: truck.LoaderTypeId,
      licensePlate: truck.Pelak,
      driverId: driver?.DriverId ?? '',
      driverNationalId: driver?.NationalCode ?? '',
      driverName: driver?.NameFamily ?? '',
      turnId: turn?.TurnId ?? '',
      sequentialTurn: turn?.SequentialTurnTitle ?? '',
      otaghdarTurnNumber: turn?.OtaghdarTurnNumber ?? '',
      turnStats: turn?.TurnStatusTitle ?? '',
      turnDescription: turn?.TurnStatusDescription ?? '',
      walletCode: wallet?.MoneyWalletCode ?? '',
      walletBalance: wallet?.Balance ?? 0,
    });
  }

  // 🔍 Autocomplete for sequential turns
  searchSequentialTurnWithLoaderType = async (_: string) => {
    if (this.searchTruckInfoForm.invalid) return [];

    const res =
      await this.sequentialTurnService.GetSequentialTurnWithLoaderType(
        this.loaderTypeId.value
      );
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  // ❌ Reset control value when input is cleared
  onAutoCompleteChange(controller: FormControl<any>) {
    controller.setValue('');
  }

  // ✅ On sequential turn selection
  async onSelectSequentialTurn(sequentialTurn: SequentialTurn) {
    this.sequentialTurnId.setValue(String(sequentialTurn.SeqTurnId));
  }

  // 🔄 Reset form to default state
  resetTurnsBaseForm() {
    this.truckInfoForm.reset({
      truckId: '',
      loaderTypeId: '',
      licensePlate: '',
      driverId: '',
      driverNationalId: '',
      turnId: '',
      sequentialTurn: '',
      driverName: '',
      otaghdarTurnNumber: '',
      turnStats: '',
      turnDescription: '',
      walletCode: '',
      walletBalance: 0,
    });
    this.sequentialTurnTitle.reset('');
    this.sequentialTurnId.reset('');
  }

  // 📥 Getters for searchTruckInfoForm
  get smart(): FormControl {
    return this.searchTruckInfoForm.get('smart') as FormControl;
  }

  get loaderTypeId(): FormControl {
    return this.truckInfoForm.get('loaderTypeId') as FormControl;
  }

  get licensePlate(): FormControl {
    return this.truckInfoForm.get('licensePlate') as FormControl;
  }

  get driverId(): FormControl {
    return this.truckInfoForm.get('driverId') as FormControl;
  }

  get driverName(): FormControl {
    return this.truckInfoForm.get('driverName') as FormControl;
  }

  get driverNationalId(): FormControl {
    return this.truckInfoForm.get('driverNationalId') as FormControl;
  }

  get turnId(): FormControl {
    return this.truckInfoForm.get('turnId') as FormControl;
  }

  get otaghdarTurnNumber(): FormControl {
    return this.truckInfoForm.get('otaghdarTurnNumber') as FormControl;
  }

  get sequentialTurn(): FormControl {
    return this.truckInfoForm.get('sequentialTurn') as FormControl;
  }

  get turnStats(): FormControl {
    return this.truckInfoForm.get('turnStats') as FormControl;
  }

  get turnDescription(): FormControl {
    return this.truckInfoForm.get('turnDescription') as FormControl;
  }

  get walletCode(): FormControl {
    return this.truckInfoForm.get('walletCode') as FormControl;
  }

  get walletBalance(): FormControl {
    return this.truckInfoForm.get('walletBalance') as FormControl;
  }
}
