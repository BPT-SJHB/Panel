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
  templateUrl: './factories-and-freight-form.component.html',
  styleUrl: './factories-and-freight-form.component.scss',
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
  private cachedFcpResults: FPCInfo[] = [];
  private cachedFcp?: FPCInfo;
  private readonly cachingEnabled = true;
  readonly cacheKeyLength = 3;

  fcpForm = this.fb.group({
    fcpId: [0, ValidationSchema.id],
    title: ['', ValidationSchema.title],
    managerName: ['', ValidationSchema.managerName],
    managerMobile: ['', ValidationSchema.mobile],
    telephone: ['', ValidationSchema.telephone],
    address: ['', ValidationSchema.address],
    email: ['', ValidationSchema.email],
    fcpActive: [true, ValidationSchema.smsActive],
  });

  searchFPCs = async (query: string): Promise<FPCInfo[]> => {
    if (query.length < this.cacheKeyLength) return [];

    const newStartKey = query.substring(0, this.cacheKeyLength);

    if (this.cachingEnabled && newStartKey === this.startKey) {
      return this.cachedFcpResults.filter(item =>
        item.FPCTitle?.toLowerCase().includes(query.toLowerCase())
      );
    }

    const response = await this.fpcService.GetFPCsInfo(query);
    if (!this.isSuccessful(response)) return [];

    this.startKey = newStartKey;
    this.cachedFcpResults = response.data!;
    return response.data!;
  }

  async selectSearchItem(event: AutoCompleteSelectEvent): Promise<void> {
    await this.loadFcpDetails(event.value.fcpId);
  }

  resetFcpForm(): void {
    this.fcpForm.reset();
    this.fcpId.setValue(0);
    this.fcpActive.setValue(true);
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

  async activateFcpSms(): Promise<void> {
    if (this.fcpId.invalid || this.fcpId.value === 0 || this.loading) return;

    try {
      this.loading = true;
      const response = await this.fpcService.ActivateFPCSms(this.fcpId.value);
      this.toast.success(
        'موفق',
        response.data?.Message ?? 'پیامک فعال سازی با موفقیت انجام شد.'
      );
    } finally {
      this.loading = false;
    }
  }

  async resetPasswordFcp(): Promise<void> {
    if (this.fcpId.invalid || this.fcpId.value === 0 || this.loading) return;

    try {
      this.loading = true;
      const response = await this.fpcService.ResetFPCUserPassword(this.fcpId.value);
      if (!this.isSuccessful(response)) return;

      this.userNameDialog = response.data!.Username;
      this.newUserPasswordDialog = response.data!.Password;
      this.passwordDialogVisible = true;
    } finally {
      this.loading = false;
    }
  }

  async registerOrEditFcp(): Promise<void> {
    if (this.fcpForm.invalid || this.loading) return;

    try {
      this.loading = true;

      if (this.fcpId.value === 0) {
        await this.registerFcp();
      } else {
        await this.editFcp();
      }

      if (this.cachedFcp?.Active !== this.fcpActive.value) {
        await this.changeFcpActiveStatus();
      }
    } finally {
      this.loading = false;
    }
  }

  private async registerFcp(): Promise<void> {
    const fcpInfo = this.buildFcpInfo();
    const response = await this.fpcService.FPCRegistering(fcpInfo);
    if (this.isSuccessful(response)) {
      this.toast.success('موفق', response.data?.Message ?? 'اطلاعات با موفقیت ثبت شد.');
    }
    this.resetFcpForm();
  }

  private async editFcp(): Promise<void> {
    if (this.fcpId.invalid) return;

    const fcpInfo = this.buildFcpInfo();
    const response = await this.fpcService.EditFPC(fcpInfo);
    if (this.isSuccessful(response)) {
      this.toast.success('موفق', response.data?.Message ?? 'اطلاعات با موفقیت تغییر یافت.');
    }
  }

  private async changeFcpActiveStatus(): Promise<void> {
    if (this.fcpId.value === 0) return;

    const response = await this.fpcService.FPCChangeActiveStatus(this.fcpActive.value);
    if (this.isSuccessful(response) && this.cachedFcp) {
      this.cachedFcp.Active = !this.cachedFcp.Active;
    }
  }

  private async loadFcpDetails(fcpId: number): Promise<void> {
    const response = await this.fpcService.GetFPCInfo(fcpId);
    if (!this.isSuccessful(response)) return;

    const data = response.data!;
    this.fcpForm.patchValue({
      fcpId: data.FPCId,
      title: data.FPCTitle,
      managerName: data.FPCManagerNameFamily,
      managerMobile: data.FPCManagerMobileNumber,
      telephone: data.FPCTel,
      address: data.FPCAddress,
      email: data.EmailAddress,
      fcpActive: data.Active,
    });

    this.cachedFcp = data;
  }

  private buildFcpInfo(): FPCInfo {
    return {
      FPCId: this.fcpId.value,
      FPCTitle: this.title.value,
      FPCManagerNameFamily: this.managerName.value,
      FPCManagerMobileNumber: this.managerMobile.value,
      FPCTel: this.telephone.value,
      FPCAddress: this.address.value,
      EmailAddress: this.email.value,
      Active: this.fcpActive.value,
    };
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
      return false;
    }
    return true;
  }

  // Form Getters
  get fcpId(): FormControl {
    return this.fcpForm.get('fcpId') as FormControl;
  }

  get title(): FormControl {
    return this.fcpForm.get('title') as FormControl;
  }

  get managerName(): FormControl {
    return this.fcpForm.get('managerName') as FormControl;
  }

  get managerMobile(): FormControl {
    return this.fcpForm.get('managerMobile') as FormControl;
  }

  get telephone(): FormControl {
    return this.fcpForm.get('telephone') as FormControl;
  }

  get address(): FormControl {
    return this.fcpForm.get('address') as FormControl;
  }

  get email(): FormControl {
    return this.fcpForm.get('email') as FormControl;
  }

  get fcpActive(): FormControl {
    return this.fcpForm.get('fcpActive') as FormControl;
  }
}
