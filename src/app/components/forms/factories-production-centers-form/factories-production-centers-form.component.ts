import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ValidationSchema } from 'app/constants/validation-schema';
import { FPCInfo } from 'app/data/model/fpc-info.model';

import { FpcManagementService } from 'app/services/fpc-management/fpc-management.service';

import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { BaseLoading } from '../shared/component-base/base-loading';
import { AppTitles } from 'app/constants/Titles';

@Component({
  selector: 'app-factories-and-freight-form',
  standalone: true,
  templateUrl: './factories-production-centers-form.component.html',
  styleUrl: './factories-production-centers-form.component.scss',
  imports: [
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    TextInputComponent,
    ToggleSwitchInputComponent,
    SearchAutoCompleteComponent,
    ButtonComponent,
  ],
})
export class FactoriesAndFreightFormComponent extends BaseLoading {
  private fb = inject(FormBuilder);
  private fpcService = inject(FpcManagementService);

  addonWidth = '6rem';
  passwordDialogVisible = false;
  userNameDialog = '';
  newUserPasswordDialog = '';
  searchTerm: FormControl = new FormControl('');

  readonly appTitle = AppTitles;

  fpcForm = this.fb.group({
    fpcId: this.fb.control<number | null>(null, ValidationSchema.id),
    title: ['', ValidationSchema.title],
    managerName: ['', ValidationSchema.managerName],
    managerMobile: [''],
    telephone: ['', ValidationSchema.telephone],
    address: ['', ValidationSchema.address],
    email: [''],
    fpcActive: [true, ValidationSchema.smsActive],
  });

  searchFPCs = async (query: string): Promise<FPCInfo[]> => {
    const response = await this.fpcService.GetFPCsInfo(query);
    if (!checkAndToastError(response, this.toast)) return [];
    return response.data!;
  };

  async selectSearchItem(fpc: FPCInfo): Promise<void> {
    await this.loadFpcDetails(fpc.FPCId);
  }

  resetFpcForm(): void {
    this.fpcForm.reset();
    this.fpcId.setValue(null);
    this.fpcActive.setValue(true);
    this.searchTerm.setValue('');
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
    if (this.fpcId.invalid || this.loading()) return;
    this.withLoading(async () => {
      const response = await this.fpcService.ActivateFPCSms(this.fpcId.value);
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
    });
  }

  async resetPasswordFpc(): Promise<void> {
    if (this.fpcId.invalid || this.loading()) return;

    this.withLoading(async () => {
      const response = await this.fpcService.ResetFPCUserPassword(
        this.fpcId.value
      );

      if (!checkAndToastError(response, this.toast)) return;
      this.userNameDialog = response.data.Username;
      this.newUserPasswordDialog = response.data.Password;
      this.passwordDialogVisible = true;
    });
  }

  async registerOrEditFpc(): Promise<void> {
    if (!this.isFormValidExcept('fpcId') || this.loading()) return;
    this.withLoading(async () => {
      if (this.fpcId.invalid) {
        await this.registerFpc();
      } else {
        await this.editFpc();
      }
    });
  }

  private async registerFpc(): Promise<void> {
    const fpcInfo = this.buildFpcInfo();
    const response = await this.fpcService.FPCRegistering(fpcInfo);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    this.resetFpcForm();
  }

  private async editFpc(): Promise<void> {
    if (this.fpcId.invalid) return;
    const fpcInfo = this.buildFpcInfo();
    const response = await this.fpcService.EditFPC(fpcInfo);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
  }

  async changeFpcActiveStatus(_: boolean): Promise<void> {
    if (this.loading() || this.fpcId.invalid) return;
    await this.withLoading(async () => {
      const response = await this.fpcService.FPCChangeActiveStatus(
        this.fpcId.value
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
    });
  }

  private async loadFpcDetails(fpcId: number): Promise<void> {
    const response = await this.fpcService.GetFPCInfo(fpcId);
    if (!checkAndToastError(response, this.toast)) return;

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

  isFormValidExcept<K extends keyof typeof this.fpcForm.controls>(
    exceptControl: K
  ): boolean {
    return Object.keys(this.fpcForm.controls)
      .filter((key) => key !== exceptControl)
      .every((key) => this.fpcForm.get(key)?.valid);
  }
}
