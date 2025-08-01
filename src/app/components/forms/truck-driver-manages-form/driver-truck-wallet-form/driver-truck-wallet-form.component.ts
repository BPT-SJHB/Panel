// feat(driver-truck-wallet-form): manage loading via loadingService, clean up state handling

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/services/driver-truck-management/model/truck-driver-info.model';
import {
  TruckComposedInfo,
  TruckInfo,
} from 'app/services/driver-truck-management/model/truck-info.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { SearchInputComponent } from '../../../shared/inputs/search-input/search-input.component';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from "app/components/shared/button/button.component";

@Component({
  selector: 'app-driver-truck-wallet-form',
  imports: [
    ButtonModule,
    TextInputComponent,
    ReactiveFormsModule,
    SearchInputComponent,
    ButtonComponent
],
  templateUrl: './driver-truck-wallet-form.component.html',
  styleUrl: './driver-truck-wallet-form.component.scss',
})
export class DriverTruckWalletFormComponent implements OnInit, OnDestroy {
  // feat: inject required services
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private driverTruckManager = inject(Driver_TruckManagementService);
  private loadingService = inject(LoadingService);

  // feat: handle unsubscribe via destroy$
  private destroy$ = new Subject<void>();
  loading = false;

  // feat: handle global loading state on init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value)); // just triggers change detection if needed
  }

  // fix: unsubscribe from observables
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ui: style config
  addonWidth = '8rem';

  // feat: composed truck search form
  mainSearchForm = this.fb.group({
    searchSmartCard: ['', ValidationSchema.smartCard],
  });

  // feat: composed truck driver wallet form
  truckComposedInfoForm = this.fb.group({
    truckId: ['', ValidationSchema.truckId],
    smartCard: ['', ValidationSchema.smartCard],
    licensePlateNumber: ['', ValidationSchema.licensePlateNumber],
    serialNumber: ['', ValidationSchema.serialNumber],
    driverId: ['', ValidationSchema.driverId],
    nationalId: ['', ValidationSchema.nationalId],
    fullName: ['', ValidationSchema.fullName],
    turnId: [],
    turn: [],
    walletId: [],
    wallet: [],
  });

  // feat: load composed form with full info
  loadComposedForm = async (smartCard: string) => {
    if (this.mainSearchForm.invalid) return;

    this.loadingService.setLoading(true);
    try {
      const truckInfo = await this.getTruckInfo(smartCard);
      if (!truckInfo) return;

      const response =
        await this.driverTruckManager.GetComposedTruckInfoWithLastActiveTurn(
          truckInfo.TruckId
        );
      if (!this.isSuccessful(response)) return;

      this.populateComposedForm(response.data!);
    } finally {
      this.loadingService.setLoading(false);
    }
  };

  // feat: load truck info by smart card
  async loadTruckInfo() {
    if (this.smartCard.invalid) return;

    this.loadingService.setLoading(true);
    try {
      const truckInfo = await this.getTruckInfo(this.smartCard.value);
      if (!truckInfo) return;

      this.populateTruckInfo(truckInfo);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // feat: load driver info by national ID
  async loadDriverInfo() {
    if (this.nationalId.invalid) return;

    this.loadingService.setLoading(true);
    try {
      const response = await this.driverTruckManager.GetDriverInfoFromAPI(
        this.nationalId.value
      );

      if (!this.isSuccessful(response)) return;

      this.populateDriverInfo(response.data!);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // feat: set composed truck-driver-wallet-turn info
  async setComposedInformation(): Promise<void> {
    if (this.nationalId.invalid) return;

    this.loadingService.setLoading(true);
    try {
      const { value: truckId } = this.truckId;
      const { value: driverId } = this.driverId;
      const { value: turnId } = this.turnId;
      const { value: walletId } = this.walletId;

      const response = await this.driverTruckManager.SetComposedTruckInfo(
        truckId,
        driverId,
        turnId,
        walletId
      );

      if (!this.isSuccessful(response)) return;

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'تغییرات با موفقیت ثبت شد.'
      );
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // feat: generate new virtual wallet
  async createNewWallet(): Promise<void> {
    const response = await this.driverTruckManager.GetVirtualWallet();
    if (!this.isSuccessful(response)) return;
    this.populateWalletInfo(response.data!);
  }

  // --- Private Methods ---

  // util: fetch truck info
  private async getTruckInfo(smartCard: string): Promise<TruckInfo | null> {
    const response = await this.driverTruckManager.GetTruckInfoFromAPI(
      smartCard
    );
    if (!this.isSuccessful(response)) return null;
    return response.data!;
  }

  // util: check api response success
  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      return false;
    }
    return true;
  }

  // ui: populate full form with composed info
  private populateComposedForm(info: TruckComposedInfo) {
    this.populateTruckInfo(info.Truck);
    this.populateDriverInfo(info.TruckDriver!);
    this.populateWalletInfo(info.MoneyWallet!);
    this.turnId.setValue(info.Turn?.TurnId);
    this.turn.setValue(info.Turn?.OtaghdarTurnNumber);
  }

  // ui: populate truck info fields
  private populateTruckInfo(info: TruckInfo) {
    this.truckId.setValue(info.TruckId ?? -1);
    this.smartCard.setValue(info.SmartCardNo);
    this.licensePlateNumber.setValue(info.Pelak);
    this.serialNumber.setValue(info.Serial);
  }

  // ui: populate driver info fields
  private populateDriverInfo(info?: TruckDriverInfo) {
    this.driverId.setValue(info?.DriverId ?? -1);
    this.fullName.setValue(info?.NameFamily);
    this.nationalId.setValue(info?.NationalCode);
  }

  // ui: populate wallet info fields
  private populateWalletInfo(info?: Wallet) {
    this.walletId.setValue(info?.MoneyWalletId ?? -1);
    this.wallet.setValue(info?.MoneyWalletCode);
  }

  // --- Form Control Getters ---
  get searchSmartCard(): FormControl {
    return this.mainSearchForm.get('searchSmartCard') as FormControl;
  }

  get truckId(): FormControl {
    return this.truckComposedInfoForm.get('truckId') as FormControl;
  }

  get smartCard(): FormControl {
    return this.truckComposedInfoForm.get('smartCard') as FormControl;
  }

  get licensePlateNumber(): FormControl {
    return this.truckComposedInfoForm.get('licensePlateNumber') as FormControl;
  }

  get serialNumber(): FormControl {
    return this.truckComposedInfoForm.get('serialNumber') as FormControl;
  }

  get driverId(): FormControl {
    return this.truckComposedInfoForm.get('driverId') as FormControl;
  }

  get nationalId(): FormControl {
    return this.truckComposedInfoForm.get('nationalId') as FormControl;
  }

  get fullName(): FormControl {
    return this.truckComposedInfoForm.get('fullName') as FormControl;
  }

  get turn(): FormControl {
    return this.truckComposedInfoForm.get('turn') as FormControl;
  }

  get turnId(): FormControl {
    return this.truckComposedInfoForm.get('turnId') as FormControl;
  }

  get walletId(): FormControl {
    return this.truckComposedInfoForm.get('walletId') as FormControl;
  }

  get wallet(): FormControl {
    return this.truckComposedInfoForm.get('wallet') as FormControl;
  }
}
