import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { TicketCreateRequest } from 'app/services/ticket-service-management/model/ticket.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { copyTextAndToast } from 'app/utils/copy-text';
import { ValidationSchema } from 'app/constants/validation-schema';
import { APP_ROUTES } from 'app/constants/routes';
import { AppTitles } from 'app/constants/Titles';
import { mockTickets } from 'app/services/ticket-service-management/mock/ticket.mock';
import { TicketGuardCaptchaFormComponent } from '../ticket-guard-captcha-form/ticket-guard-captcha-form.component';
import { TicketErrorCodes } from 'app/constants/error-messages';
import { TicketFilesUploadComponent } from '../ticket-files-upload/ticket-files-upload.component';

interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-ticket-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    ButtonComponent,
    Dialog,
    TicketGuardCaptchaFormComponent,
    TicketFilesUploadComponent,
  ],
  templateUrl: './ticket-create-form.component.html',
  styleUrls: ['./ticket-create-form.component.scss'],
})
export class TicketCreateFormComponent extends BaseLoading {
  // Dependencies
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly ticketService = inject(TicketServiceManagementService);

  // Inputs and signals
  readonly phone = input<string>('');
  readonly ticketTypes = signal<SelectOption[]>([]);
  readonly departments = signal<SelectOption[]>([]);
  readonly createdTrackCodeTicket = signal<string | null>(
    mockTickets[0].trackCode
  );
  readonly trackPhone = signal<string>('');
  readonly addonWidth = '6rem';
  ticketDialogVisible = false;
  readonly activeCaptcha = signal<boolean>(false);
  appTitle = AppTitles;

  // Form setup
  readonly ticketForm = this.fb.group({
    userId: this.fb.control<number | null>(null),
    username: this.fb.control<string>('', ValidationSchema.mobile),
    ticketTypeId: this.fb.control<number | null>(null, ValidationSchema.id),
    departmentId: this.fb.control<number | null>(null, ValidationSchema.id),
    title: this.fb.control<string>('', ValidationSchema.title),
    body: this.fb.control<string>('', ValidationSchema.description),
    attachment: this.fb.control<string[]>([]),
  });

  constructor() {
    super();
    effect(() => {
      this.ctrl('username').setValue(this.phone());
      this.ctrl('userId').setValue(null);
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadInitialData();
  }

  // Form control accessor
  ctrl<T>(controlName: keyof typeof this.ticketForm.controls): FormControl<T> {
    return this.ticketForm.get(controlName) as FormControl<T>;
  }

  // Load initial data
  private async loadInitialData(): Promise<void> {
    await Promise.all([this.loadTicketTypes(), this.loadDepartments()]);
  }

  private async loadTicketTypes(): Promise<void> {
    const response = await this.ticketService.GetTicketTypes();
    if (!checkAndToastError(response, this.toast)) return;
    this.ticketTypes.set(
      response.data.map((tt) => ({ value: tt.id, label: tt.title }))
    );
  }

  private async loadDepartments(): Promise<void> {
    const response = await this.ticketService.GetDepartments();
    if (!checkAndToastError(response, this.toast)) return;
    this.departments.set(
      response.data.map((d) => ({ value: d.id, label: d.title }))
    );
  }

  // Create ticket
  createTicket: () => Promise<void> = async () => {
    if (this.ticketForm.invalid || this.loading()) return;

    this.withLoading(async () => {
      let userId = this.ctrl<number | null>('userId').value;

      if (userId === null) {
        const response = await this.ticketService.LoginWithNoAuth(
          this.ctrl<string>('username').value
        );
        if (!checkAndToastError(response, this.toast)) {
          if (response.error?.code === TicketErrorCodes.Unauthorized) {
            this.activeCaptcha.set(true);
          }
          return;
        }

        userId = response.data.id;
        this.ctrl('userId').setValue(userId);
      }

      const ticket: TicketCreateRequest = {
        userId: this.ctrl<number>('userId').value,
        ticketTypeId: this.ctrl<number>('ticketTypeId').value,
        departmentId: this.ctrl<number>('departmentId').value,
        title: this.ctrl<string>('title').value,
        body: this.ctrl<string>('body').value,
        attachments: this.ctrl<string[]>('attachment').value,
      };

      const result = await this.ticketService.CreateTicket(ticket);
      if (!checkAndToastError(result, this.toast)) {
        if (result.error?.code === TicketErrorCodes.Unauthorized) {
          this.activeCaptcha.set(true);
        }
        return;
      }

      this.activeCaptcha.set(false);
      this.createdTrackCodeTicket.set(result.data.trackCode);
      this.trackPhone.set(this.ctrl<string>('username').value);
      this.ticketForm.reset({ username: this.phone() });
      this.ticketDialogVisible = true;
    });
  };

  // Navigation and utilities
  trackTicket(): void {
    const trackCode = this.createdTrackCodeTicket();
    if (!trackCode) return;

    this.router.navigate([APP_ROUTES.TICKET.TRACK], {
      queryParams: {
        phone: this.trackPhone(),
        trackingCode: trackCode,
      },
    });
  }

  copyToClipboard(): void {
    const trackCode = this.createdTrackCodeTicket();
    if (trackCode) {
      copyTextAndToast(trackCode, this.toast);
    }
  }

  redirectLogin() {
    this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
  }
}
