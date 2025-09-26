import { Component, effect, inject, input, signal } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { FormBuilder, FormControl } from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { Ticket } from 'app/services/ticket-service-management/model/ticket.model';
import { TicketType } from 'app/services/ticket-service-management/model/ticket-type.model';
import { Department } from 'app/services/ticket-service-management/model/department.model';
import { TicketStatus } from 'app/services/ticket-service-management/model/ticket-status.model';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { TicketChatMessageFormComponent } from '../ticket-chat-message-form/ticket-chat-message-form.component';
import { TicketGuardCaptchaFormComponent } from '../ticket-guard-captcha-form/ticket-guard-captcha-form.component';

type DetailTicket = Ticket & {
  username: string;
  ticketType: string;
  department: string;
  ticketStatus: string;
};
@Component({
  selector: 'app-ticket-track-form',
  imports: [
    TextInputComponent,
    ButtonComponent,
    Card,
    Dialog,
    TicketChatMessageFormComponent,
    TicketGuardCaptchaFormComponent,
  ],
  templateUrl: './ticket-track-form.component.html',
  styleUrl: './ticket-track-form.component.scss',
})
export class TicketTrackFormComponent extends BaseLoading {
  readonly phone = input('');
  readonly trackCode = input('');

  private fb = inject(FormBuilder);
  private ticketService = inject(TicketServiceManagementService);
  readonly currentTicket = signal<DetailTicket | null>(null);
  readonly ticketTypes = signal<TicketType[]>([]);
  readonly departments = signal<Department[]>([]);
  readonly ticketStatuses = signal<TicketStatus[]>([]);
  readonly activeCaptcha = signal<boolean>(false);
  readonly addonWidth = '6rem';

  readonly searchForm = this.fb.group({
    phone: this.fb.nonNullable.control<string>('', ValidationSchema.mobile),
    trackCode: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.ticketTrackCode
    ),
  });

  chatDialogVisible = false;
  runOnceGuard = false;
  constructor() {
    effect(() => {
      this.ctrl('phone').setValue(this.phone());
      this.ctrl('trackCode').setValue(this.trackCode());
      if (this.runOnceGuard || this.searchForm.invalid) return;
      this.runOnceGuard = true;
      this.searchTicket();
    });

    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.getTicketsType();
    this.getDepartments();
    this.getTicketStatuses();
  }

  searchTicket: () => Promise<void> = async () => {
    if (this.searchForm.invalid || this.loading()) return;

    const trackCode = this.ctrl<string>('trackCode').value;
    const phone = this.ctrl<string>('phone').value;
    await this.withLoading(async () => {
      const response = await this.ticketService.GetTicketByTrackCode(
        trackCode,
        phone
      );

      if (!checkAndToastError(response, this.toast)) {
        // TODO: replace with real incorrect capthca
        if (response.error?.code === 3) {
          this.activeCaptcha.set(true);
        }
        return;
      }
      this.currentTicket.set({
        ...response.data,
        username: this.ctrl<string>('phone').value,
        ticketType: this.findTicketType(response.data.ticketTypeId),
        department: this.findDepartment(response.data.departmentId),
        ticketStatus: this.findTicketStatues(response.data.ticketStatusId),
      });
      this.activeCaptcha.set(false);
    });
  };

  ctrl<T>(controlName: keyof typeof this.searchForm.controls) {
    return this.searchForm.get(controlName) as FormControl<T>;
  }

  private findTicketType(id: number): string {
    const ticketType = this.ticketTypes().find((t) => t.id === id);
    return ticketType?.title ?? '';
  }

  private findDepartment(id: number): string {
    const department = this.departments().find((t) => t.id === id);
    return department?.title ?? '';
  }

  private findTicketStatues(id: number): string {
    const ticketStatuses = this.ticketStatuses().find((t) => t.id === id);
    return ticketStatuses?.title ?? '';
  }

  private async getTicketsType() {
    const response = await this.ticketService.GetTicketTypes();
    if (!checkAndToastError(response, this.toast)) return;
    this.ticketTypes.set(response.data);
  }

  private async getDepartments() {
    const response = await this.ticketService.GetDepartments();
    if (!checkAndToastError(response, this.toast)) return;
    this.departments.set(response.data);
  }

  private async getTicketStatuses() {
    const response = await this.ticketService.GetTicketStatuses();
    if (!checkAndToastError(response, this.toast)) return;
    this.ticketStatuses.set(response.data);
  }

  showChat() {
    this.chatDialogVisible = true;
  }
}
