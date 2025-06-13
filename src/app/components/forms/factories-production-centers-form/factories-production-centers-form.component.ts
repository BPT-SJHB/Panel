import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ValidationSchema } from 'app/constants/validation-schema';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { FPCInfo } from 'app/data/model/fpc-info.model';

import { FpcManagementService } from 'app/services/fpc-management/fpc-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { GenericInputComponent } from 'app/components/shared/inputs/number-input/generic-input.component';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';

@Component({
  selector: 'app-factories-and-freight-form',
  standalone: true,
  templateUrl: './factories-production-centers-form.component.html',
  styleUrl: './factories-production-centers-form.component.scss',
  imports: [
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    GenericInputComponent,
    SearchInputComponent,
    BinaryRadioInputComponent,
  ],
})
export class FactoriesAndFreightFormComponent {
  @ViewChild(SearchInputComponent) searchInputComponent!: SearchInputComponent;

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private fpcService = inject(FpcManagementService);

  loading = false;
  searchTerm = '';
  addonWidth = '9rem';
  passwordDialogVisible = false;
  userNameDialog = '';
  newUserPasswordDialog = '';

  private startKey = '';
  private cachedFpcResults: FPCInfo[] = [];
  private cachedFpc?: FPCInfo;
  private readonly cachingEnabled = true;
  readonly cacheKeyLength = 3;

  fpcForm = this.fb.group({
    fpcId: [0, ValidationSchema.id],
    title: ['', ValidationSchema.title],
    managerName: ['', ValidationSchema.managerName],
    managerMobile: [''],
    telephone: [''],
    address: ['', ValidationSchema.address],
    email: [''],
    fpcActive: [true, ValidationSchema.smsActive],
  });

  searchFPCs = async (query: string): Promise<FPCInfo[]> => {
    if (query.length < this.cacheKeyLength) return [];

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      return this.cachedFpcResults.filter((item) =>
        item.FPCTitle?.toLowerCase().includes(query.toLowerCase())
      );
    }

    const response = await this.fpcService.GetFPCsInfo(query);
    if (!this.isSuccessful(response)) return [];

    this.startKey = newStartKey;
    this.cachedFpcResults = response.data!;
    return response.data!;
  };

  async selectSearchItem(event: AutoCompleteSelectEvent): Promise<void> {
    console.log(event.value.FPCId);
    await this.loadFpcDetails(event.value.FPCId);
  }

  resetFpcForm(): void {
    this.fpcForm.reset();
    this.fpcId.setValue(0);
    this.fpcActive.setValue(true);
    this.searchTerm = '';
    this.searchInputComponent.onClear();
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
  }

  onCloseDialog(): void {
    this.userNameDialog = '';
    this.newUserPasswordDialog = '';
  }

  async activateFpcSms(): Promise<void> {
    if (this.fpcId.invalid || this.fpcId.value === 0 || this.loading) return;

    try {
      this.loading = true;
      const response = await this.fpcService.ActivateFPCSms(this.fpcId.value);
      this.toast.success(
        'موفق',
        response.data?.Message ?? 'پیامک فعال سازی با موفقیت انجام شد.'
      );
    } finally {
      this.loading = false;
    }
  }

  async resetPasswordFpc(): Promise<void> {
    if (this.fpcId.invalid || this.fpcId.value === 0 || this.loading) return;

    try {
      this.loading = true;
      const response = await this.fpcService.ResetFPCUserPassword(
        this.fpcId.value
      );
      if (!this.isSuccessful(response)) return;

      this.userNameDialog = response.data!.Username;
      this.newUserPasswordDialog = response.data!.Password;
      this.passwordDialogVisible = true;
    } finally {
      this.loading = false;
    }
  }

  async registerOrEditFpc(): Promise<void> {
    if (this.fpcForm.invalid || this.loading) return;

    try {
      this.loading = true;

      if (this.fpcId.value === 0) {
        await this.registerFpc();
      } else {
        await this.editFpc();
      }

      if (this.cachedFpc?.Active !== this.fpcActive.value) {
        await this.changeFpcActiveStatus();
      }
    } finally {
      this.loading = false;
    }
  }

  private async registerFpc(): Promise<void> {
    const fpcInfo = this.buildFpcInfo();
    const response = await this.fpcService.FPCRegistering(fpcInfo);
    if (this.isSuccessful(response)) {
      this.toast.success(
        'موفق',
        response.data?.Message ?? 'اطلاعات با موفقیت ثبت شد.'
      );
    }
    this.resetFpcForm();
  }

  private async editFpc(): Promise<void> {
    if (this.fpcId.invalid) return;

    const fpcInfo = this.buildFpcInfo();
    const response = await this.fpcService.EditFPC(fpcInfo);
    if (this.isSuccessful(response)) {
      this.toast.success(
        'موفق',
        response.data?.Message ?? 'اطلاعات با موفقیت تغییر یافت.'
      );
    }
  }

  private async changeFpcActiveStatus(): Promise<void> {
    if (this.fpcId.value === 0) return;

    const response = await this.fpcService.FPCChangeActiveStatus(
      this.fpcActive.value
    );
    if (this.isSuccessful(response) && this.cachedFpc) {
      this.cachedFpc.Active = !this.cachedFpc.Active;
    }
  }

  private async loadFpcDetails(fpcId: number): Promise<void> {
    const response = await this.fpcService.GetFPCInfo(fpcId);
    if (!this.isSuccessful(response)) return;

    const data = response.data!;
    this.fpcForm.patchValue({
      fpcId: data.FPCId,
      title: data.FPCTitle,
      managerName: data.FPCManagerNameFamily,
      managerMobile: data.FPCManagerMobileNumber,
      telephone: data.FPCTel,
      address: data.FPCAddress,
      email: data.EmailAddress,
      fpcActive: data.Active,
    });

    this.cachedFpc = data;
  }

  private buildFpcInfo(): FPCInfo {
    return {
      FPCId: this.fpcId.value,
      FPCTitle: this.title.value,
      FPCManagerNameFamily: this.managerName.value,
      FPCManagerMobileNumber: this.managerMobile.value,
      FPCTel: this.telephone.value,
      FPCAddress: this.address.value,
      EmailAddress: this.email.value,
      Active: this.fpcActive.value,
    };
  }

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

  // Form Getters
  get fpcId(): FormControl {
    return this.fpcForm.get('fpcId') as FormControl;
  }

  get title(): FormControl {
    return this.fpcForm.get('title') as FormControl;
  }

  get managerName(): FormControl {
    return this.fpcForm.get('managerName') as FormControl;
  }

  get managerMobile(): FormControl {
    return this.fpcForm.get('managerMobile') as FormControl;
  }

  get telephone(): FormControl {
    return this.fpcForm.get('telephone') as FormControl;
  }

  get address(): FormControl {
    return this.fpcForm.get('address') as FormControl;
  }

  get email(): FormControl {
    return this.fpcForm.get('email') as FormControl;
  }

  get fpcActive(): FormControl {
    return this.fpcForm.get('fpcActive') as FormControl;
  }
}
