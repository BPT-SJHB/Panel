import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  FilesUploadInputComponent,
  UploadFile,
} from 'app/components/shared/inputs/files-upload-input/files-upload-input.component';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { Subscription, takeUntil } from 'rxjs';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TicketErrorCodes } from 'app/constants/error-messages';
import { TicketGuardCaptchaFormComponent } from '../ticket-guard-captcha-form/ticket-guard-captcha-form.component';

@Component({
  selector: 'app-ticket-files-upload',
  imports: [FilesUploadInputComponent, TicketGuardCaptchaFormComponent],
  templateUrl: './ticket-files-upload.component.html',
  styleUrl: './ticket-files-upload.component.scss',
})
export class TicketFilesUploadComponent extends BaseLoading {
  @ViewChild(FilesUploadInputComponent) inputFile?: FilesUploadInputComponent;
  // inputs
  //
  readonly control = input(new FormControl<string[]>([]));
  readonly guardType = input<'captcha' | 'auth'>('captcha');

  // Dependencies
  private readonly ticketService = inject(TicketServiceManagementService);
  private uploadingFiles = new Map<string, Subscription>();
  private uploadedFiles = new Map<string, string>();
  readonly captchaGuardVisible = signal(false);

  override ngOnInit(): void {
    super.ngOnInit();

    this.control()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value || value.length === 0) {
          this.inputFile?.clearAll();
        }
      });
  }

  onUploadFile = (
    file: UploadFile,
    onProgress: (progress: number) => void
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const sub = this.ticketService
        .UploadTicketFile(file.raw)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (typeof response === 'number') {
              onProgress(response);
              return;
            }
            // Final API response
            const success = checkAndToastError(response, this.toast);
            if (success) {
              this.uploadedFiles.set(file.id, response.data.id);
              this.updateControlValue();
              resolve();
            } else {
              reject(new Error(`Upload failed for file: ${file.raw.name}`));
            }
          },
          error: (err: ApiResponse<unknown>) => {
            this.uploadingFiles.delete(file.id);
            const handled = checkAndToastError(err, this.toast);
            if (!handled) {
              if (
                err.error?.code === TicketErrorCodes.CaptchaIncorrect ||
                err.error?.code === TicketErrorCodes.CaptchaExpired
              ) {
                this.captchaGuardVisible.set(true);
              }
              reject(new Error(`Upload failed for file: ${file.raw.name}`));
            }
            resolve();
          },
          complete: () => {
            this.uploadingFiles.delete(file.id);
          },
        });

      this.uploadingFiles.set(file.id, sub);
    });
  };

  removeUploadFile(file: UploadFile) {
    // remove if file is on uploading
    const uploading = this.uploadingFiles.get(file.id);
    if (uploading) {
      uploading.unsubscribe();
      this.uploadingFiles.delete(file.id);
      return;
    }

    // remove if file already uploaded
    const uploaded = this.uploadedFiles.get(file.id);
    if (!uploaded) return;
    this.uploadedFiles.delete(file.id);
    this.updateControlValue();
  }

  private updateControlValue() {
    const values = this.uploadedFiles.values();
    this.control().setValue(Array.from(values), { emitEvent: false });
  }
}
