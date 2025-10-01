import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  TableColumn,
  TableColumnType,
  TableComponent,
  TablePage,
} from 'app/components/shared/table/table.component';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  Ticket,
  TicketQueryParams,
} from 'app/services/ticket-service-management/model/ticket.model';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { SortEvent } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
import { TicketChatMessageFormComponent } from '../ticket-chat-message-form/ticket-chat-message-form.component';
import { Dialog } from 'primeng/dialog';

type DetailTicket = Ticket & {
  username: string;
  ticketType: string;
  department: string;
  ticketStatus: string;
  chatIcon: string;
};

interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-ticket-lists-form',
  imports: [
    TableComponent,
    TableModule,
    TextInputComponent,
    ButtonComponent,
    SelectInputComponent,
    TicketChatMessageFormComponent,
    Dialog,
  ],
  templateUrl: './ticket-lists-form.component.html',
  styleUrls: ['./ticket-lists-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListsFormComponent implements OnInit {
  private readonly ticketService = inject(TicketServiceManagementService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly selectedTicket = signal<Ticket | null>(null);
  readonly ticketTypes = signal<SelectOption[]>([]);
  readonly departments = signal<SelectOption[]>([]);
  readonly ticketStatuses = signal<SelectOption[]>([]);
  readonly users = signal<Map<number, string>>(new Map<number, string>());
  readonly config = TableConfig;

  // TODO: ticketUser
  readonly userId = signal<number>(3);
  readonly paramsQuery = signal<TicketQueryParams>({
    page: 1,
    pageSize: this.config.rows,
  });

  readonly columns: TableColumn<DetailTicket>[] = [
    { header: 'شناسه کاربر', field: 'userId', sorting: false },
    { header: 'شماره موبایل', field: 'username', sorting: false },
    { header: 'دپارتمان', field: 'department', sorting: false },
    { header: 'نوع تیکت', field: 'ticketType', sorting: false },
    { header: 'وضعیت تیکت', field: 'ticketStatus', sorting: false },
    { header: 'عنوان', field: 'title', sorting: false },
    { header: 'کد رهگیری', field: 'trackCode', sorting: false },
    { header: 'تاریخ ایجاد', field: 'createdAt' },
    { header: 'تاریخ بروزرسانی', field: 'updatedAt' },
    {
      header: 'نمایش گفتگو',
      field: 'chatIcon',
      type: TableColumnType.BUTTON_ICON,
      buttonSeverity: 'info',
      class: 'py-3 scale-90',
      onAction: (row: Ticket) => this.showTicketChats(row.id),
    },
  ];

  readonly loading = signal(false);
  readonly data = signal<(DetailTicket | null)[]>([]);
  readonly chatDialogVisible = signal<boolean>(false);
  readonly filterForm = this.fb.group({
    ticketStatusId: this.fb.nonNullable.control(-1),
    ticketTypeId: this.fb.nonNullable.control(-1),
    departmentId: this.fb.nonNullable.control(-1),
    username: this.fb.nonNullable.control(''),
  });

  ngOnInit() {
    this.loadInitialData();
  }

  async searchTickets(): Promise<void> {
    this.loading.set(true);
    try {
      const response = await this.ticketService.GetTickets(this.paramsQuery());
      if (!checkAndToastError(response, this.toast)) return;

      const total = response.data.total;
      const tickets: (DetailTicket | null)[] = Array(total).fill(null);

      const { page = 1, pageSize = 5 } = this.paramsQuery();
      const baseIndex = (page - 1) * pageSize;

      // collect userIds first
      const userIds = response.data.items.map((item) => item.userId);
      await this.updateUsersMap(userIds);

      response.data.items.forEach((item, index) => {
        const targetIndex = baseIndex + index;
        if (targetIndex >= total) return;

        tickets[targetIndex] = {
          ...item,
          username: this.users().get(item.userId) ?? '',
          department: this.findDepartment(item.departmentId),
          ticketType: this.findTicketType(item.ticketTypeId),
          ticketStatus: this.findTicketStatuses(item.ticketStatusId),
          createdAt: this.formatJalaliDate(item.createdAt),
          updatedAt: this.formatJalaliDate(item.updatedAt),
          chatIcon: 'pi pi-comments',
        };
      });

      this.data.set(tickets);
    } finally {
      this.loading.set(false);
    }
  }

  async customSort(event: SortEvent): Promise<void> {
    const field = event.field as keyof DetailTicket;
    const { orderBy, orderDir } = this.paramsQuery();

    if (orderBy === field && (orderDir === 'asc' ? 1 : -1) === event.order) {
      return;
    }

    this.loading.set(true);
    try {
      if (field === 'createdAt' || field === 'updatedAt') {
        this.paramsQuery.update((p) => ({
          ...p,
          orderBy: field,
          orderDir: event.order === 1 ? 'asc' : 'desc',
        }));
        await this.searchTickets();
      }
    } finally {
      this.loading.set(false);
    }
  }

  pageChanged(event: TablePage): void {
    this.paramsQuery.update((p) => ({
      ...p,
      page: event.page,
      pageSize: event.pageSize,
    }));
    this.searchTickets();
  }

  // Generic helper to get typed, non-nullable FormControl
  ctrl<T extends keyof typeof this.filterForm.controls>(
    name: T
  ): (typeof this.filterForm.controls)[T] {
    return this.filterForm.get(name) as (typeof this.filterForm.controls)[T];
  }

  async applyFilter(): Promise<void> {
    const ticketStatusId = this.ctrl('ticketStatusId').value;
    const ticketTypeId = this.ctrl('ticketTypeId').value;
    const departmentId = this.ctrl('departmentId').value;
    const username = this.ctrl('username').value;

    // Convert -1 to undefined so it’s ignored in query
    const status = ticketStatusId === -1 ? undefined : ticketStatusId;
    const type = ticketTypeId === -1 ? undefined : ticketTypeId;
    const department = departmentId === -1 ? undefined : departmentId;
    const user = await this.getUserIdByUsername(username);

    // Update your query signal
    this.paramsQuery.update((p) => ({
      ...p,
      ticketStatusId: status,
      ticketTypeId: type,
      departmentId: department,
      userId: user,
      page: 1,
    }));

    // Re-fetch tickets
    this.searchTickets();
  }

  // ------------------ private helpers ------------------

  private async loadInitialData(): Promise<void> {
    await Promise.all([
      this.loadTicketTypes(),
      this.loadDepartments(),
      this.loadTicketStatuses(),
    ]);
    await this.searchTickets();
  }

  private findTicketType(id: number): string {
    return this.ticketTypes().find((t) => t.value === id)?.label ?? '';
  }

  private findDepartment(id: number): string {
    return this.departments().find((t) => t.value === id)?.label ?? '';
  }

  private findTicketStatuses(id: number): string {
    return this.ticketStatuses().find((t) => t.value === id)?.label ?? '';
  }

  private async loadTicketTypes(): Promise<void> {
    const response = await this.ticketService.GetTicketTypes();
    if (!checkAndToastError(response, this.toast)) return;
    const selection: SelectOption[] = response.data.map((ts) => ({
      value: ts.id,
      label: ts.title,
    }));
    this.ticketTypes.set([{ label: 'همه', value: -1 }, ...selection]);
  }

  private async loadDepartments(): Promise<void> {
    const response = await this.ticketService.GetDepartments();
    if (!checkAndToastError(response, this.toast)) return;
    const selection: SelectOption[] = response.data.map((d) => ({
      value: d.id,
      label: d.title,
    }));
    this.departments.set([{ label: 'همه', value: -1 }, ...selection]);
  }

  private async loadTicketStatuses(): Promise<void> {
    const response = await this.ticketService.GetTicketStatuses();
    if (!checkAndToastError(response, this.toast)) return;
    const selection: SelectOption[] = response.data.map((s) => ({
      value: s.id,
      label: s.title,
    }));
    this.ticketStatuses.set([{ label: 'همه', value: -1 }, ...selection]);
  }

  private async updateUsersMap(ids: number[]) {
    const userIds: number[] = [];
    ids.forEach((id) => {
      if (!this.users().has(id)) userIds.push(id);
    });

    if (userIds.length === 0) return;
    const response = await this.ticketService.GetUsersByIds(userIds);
    if (!checkAndToastError(response, this.toast)) return false;

    this.users.update((m) => {
      response.data.forEach((user) => {
        m.set(user.id, user.username);
      });

      return m;
    });
    return true;
  }

  private async getUserIdByUsername(
    username: string
  ): Promise<number | undefined> {
    if (username === '') return undefined;

    const response = await this.ticketService.GetUserByUsername(username);
    if (!checkAndToastError(response, this.toast)) return -1;
    return response.data.id;
  }

  private formatJalaliDate(isoDate: string): string {
    if (!isoDate) return '';
    const d = new Date(isoDate);

    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
      .format(d)
      .replace(',', ' - ');
  }

  private async showTicketChats(id: string) {
    const response = await this.ticketService.GetTicketById(id);
    if (!checkAndToastError(response, this.toast)) {
      this.selectedTicket.set(null);
      return;
    }

    this.selectedTicket.set(response.data);
    this.chatDialogVisible.set(true);
  }
}
