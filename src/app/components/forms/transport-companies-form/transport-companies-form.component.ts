// Angular & PrimeNG imports
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';

// Shared components & utilities
import { BaseLoading } from '../shared/component-base/base-loading';
import { ValidationSchema } from 'app/constants/validation-schema';
import { checkAndToastError } from 'app/utils/api-utils';
import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';

// Services & models
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';
import { TransportCompany } from 'app/services/transport-company-management/model/transport-company-info.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { AppTitles } from 'app/constants/Titles';
import { FormButtonsSectionComponent } from 'app/components/shared/sections/form-buttons-section/form-buttons-section.component';
import { FormInputsSectionComponent } from 'app/components/shared/sections/form-inputs-section/form-inputs-section.component';
import { LocationManagementService } from 'app/services/location-management/location-management.service';
import { string } from 'zod';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-transport-companies-form',
  imports: [
    SearchAutoCompleteComponent,
    TextInputComponent,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ButtonComponent,
    ToggleSwitchInputComponent,
    FormButtonsSectionComponent,
    FormInputsSectionComponent,
    SearchAutoCompleteFactoryComponent,
    FileUploadModule,
  ],
  providers: [ConfirmationService, DialogService],
  templateUrl: './transport-companies-form.component.html',
  styleUrl: './transport-companies-form.component.scss',
})
export class TransportCompaniesFormComponent extends BaseLoading {
  @ViewChild('fu') fu?: FileUpload;

  // === Injected services ===
  private fb = inject(FormBuilder);
  private transportComponyService = inject(TransportCompaniesManagementService);
  private dialogService = inject(DialogService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );

  // === Form Setup ===
  readonly addonWidth = '7rem';
  readonly appTitle = AppTitles;
  readonly transportComponyForm = this.fb.group({
    TCId: new FormControl<number | null>(null),
    TCTitle: [''],
    TCOrganizationCode: [''],
    TCCityId: new FormControl<number | null>(null),
    TCCityTitle: [''],
    TCTel: ['', ValidationSchema.telephone],
    TCManagerMobileNumber: ['', ValidationSchema.mobile],
    TCManagerNameFamily: ['', ValidationSchema.fullName],
    EmailAddress: ['', ValidationSchema.email],
    Active: [false],
  });
  readonly autoCompletions = this.createAutoCompletions();

  // === Search + Select Handling ===
  searchTransportCompony = async (query: string) => {
    const response =
      await this.transportComponyService.GetTransportCompaniesInfo(query);
    if (!checkAndToastError(response, this.toast)) return [];
    return response.data;
  };

  async onTransportComponySelect(tcInfo: TransportCompany) {
    try {
      this.loadingService.setLoading(true);
      const response =
        await this.transportComponyService.GetTransportCompanyInfo(tcInfo.TCId);
      if (!checkAndToastError(response, this.toast)) return;
      this.populateTransportComponyForm(response.data);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private createAutoCompletions() {
    return {
      sourceCity: this.autoCompleteFactory.create(
        AutoCompleteType.City,
        this.transportComponyForm.controls.TCCityId,
        {
          placeholder: this.appTitle.getPlaceholder('transportCompanyLocation'),
          label:
            this.appTitle.inputs.transportCompanies.transportCompanyLocation,
          control: this.transportComponyForm.controls
            .TCCityTitle as FormControl<string>,
        }
      ),
    };
  }

  // === Form Submit Handlers ===
  async save_editTransportCompony() {
    if (this.loading() || this.transportComponyForm.invalid) return;
    await this.withLoading(async () => {
      const data = this.extractTransportComponyForm();
      if (data.TCId) {
        const response =
          await this.transportComponyService.EditTransportCompany(data);
        if (!checkAndToastError(response, this.toast)) return;
        this.toast.success('موفق', response.data.Message);
      } else {
        const response =
          await this.transportComponyService.RegisterTransportCompany(data);
        if (!checkAndToastError(response, this.toast)) return;
        this.toast.success('موفق', response.data.Message);
      }
    });
  }

  async activateTransportComponySms() {
    if (this.loading() || !this.TCId.value) return;
    try {
      this.loadingService.setLoading(true);
      const response =
        await this.transportComponyService.ActiveTransportCompanySmsService(
          this.TCId.value!
        );
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // === Password Reset Handling ===
  confirmResetPassword(): void {
    this.confirmationService.confirm({
      message: `آیا می‌خواهید رمز عبور را تغییر دهید؟`,
      header: 'تغییر رمز عبور',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.resetTransportComponyPassword();
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  private async resetTransportComponyPassword() {
    if (!this.TCId.value) return;
    try {
      this.loadingService.setLoading(true);
      const response =
        await this.transportComponyService.ResetTransportCompanyPassword(
          this.TCId.value!
        );
      if (!checkAndToastError(response, this.toast)) return;
      const { Username, Password } = response.data!;
      this.dialogService.open(NewPasswordDialogComponent, {
        header: 'رمز عبور جدید',
        width: '20rem',
        modal: true,
        closable: true,
        inputValues: { username: Username, password: Password },
      });
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async changeStatusTransportCompony(value: boolean) {
    if (this.loading() || !this.TCId.value) return;
    this.withLoading(async () => {
      const response =
        await this.transportComponyService.ChangeTransportCompanyStatus(
          this.extractTransportComponyForm().TCId,
          value
        );

      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });
  }

  // === Utility Methods ===
  private populateTransportComponyForm(tcInfo: TransportCompany) {
    this.transportComponyForm.patchValue({ ...tcInfo });
  }

  private extractTransportComponyForm() {
    return this.transportComponyForm.getRawValue() as TransportCompany;
  }

  reloadForm() {
    this.transportComponyForm.reset();
    this.transportComponyForm.markAsPristine();
    this.transportComponyForm.markAsUntouched();
    this.transportComponyForm.updateValueAndValidity();
  }

  async onFileExcelUpload(event: any) {
    const file = event.files[0];

    try {
      await this.withLoading(async () => {
        const fileString = await this.fileToBase64(file);

        const response =
          await this.transportComponyService.UploadTransportCompaniesExcel(
            fileString
          );

        if (!checkAndToastError(response, this.toast)) return;

        this.toast.success('موفق', 'فایل اکسل با موفقیت بارگذاری شد.');
        this.fu?.clear();
      });
    } catch (error) {
      this.toast.error('خطا', 'فرمت فایل اکسل نامعتبر می باشد.');
      this.fu?.clear();
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // === Getters for Form Controls ===
  get TCId() {
    return this.transportComponyForm.get('TCId') as FormControl<number | null>;
  }

  get TCTitle() {
    return this.transportComponyForm.get('TCTitle') as FormControl<string>;
  }

  get TCOrganizationCode() {
    return this.transportComponyForm.get(
      'TCOrganizationCode'
    ) as FormControl<string>;
  }

  get TCCityTitle() {
    return this.transportComponyForm.get('TCCityTitle') as FormControl<string>;
  }

  get TCTel() {
    return this.transportComponyForm.get('TCTel') as FormControl<string>;
  }

  get TCManagerMobileNumber() {
    return this.transportComponyForm.get(
      'TCManagerMobileNumber'
    ) as FormControl<string>;
  }

  get TCManagerNameFamily() {
    return this.transportComponyForm.get(
      'TCManagerNameFamily'
    ) as FormControl<string>;
  }

  get EmailAddress() {
    return this.transportComponyForm.get('EmailAddress') as FormControl<string>;
  }

  get Active() {
    return this.transportComponyForm.get('Active') as FormControl<boolean>;
  }
}
