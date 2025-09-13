import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppTitles } from 'app/constants/Titles';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { Turn } from 'app/services/turn-management/model/turn.model';
import { TurnAccounting } from 'app/services/turn-management/model/turn-accounting.model';
import { AppConfirmService } from 'app/services/confirm/confirm.service';

type TurnTableRow = Turn & {
  activate: string;
  deactivate: string;
  accounting: string;
};

@Component({
  selector: 'app-turns-list-form',
  standalone: true,
  imports: [
    ButtonModule,
    TextInputComponent,
    SearchInputComponent,
    TableModule,
    Dialog,
    TableComponent,
  ],
  templateUrl: './turns-list-form.component.html',
  styleUrl: './turns-list-form.component.scss',
})
export class TurnsListFormComponent extends BaseLoading {
  private readonly fb = inject(FormBuilder);
  private readonly truckManagerService = inject(Driver_TruckManagementService);
  private readonly turnManagerService = inject(TurnManagementService);
  private readonly confirmService = inject(AppConfirmService);

  readonly appTitle = AppTitles;

  // Signals
  readonly truckTurnsList = signal<TurnTableRow[]>([]);
  readonly turnsAccounting = signal<TurnAccounting[]>([]);
  readonly headerTitle = signal<string>('');
  dialogTurnAccounting = false;

  searchTrukForm = this.fb.group({
    smart: ['', ValidationSchema.smartCard],
    truckId: ['', ValidationSchema.truckId],
    licensePlate: ['', ValidationSchema.licensePlateNumber],
  });

  // Table Columns
  readonly turnsCols: TableColumn<TurnTableRow>[] = [
    { header: 'شماره نوبت', field: 'OtaghdarTurnNumber' },
    { header: 'تسلسل نوبت', field: 'SequentialTurnTitle' },
    { header: 'تاریخ صدور', field: 'TurnIssueDate' },
    { header: 'زمان صدور', field: 'TurnIssueTime' },
    { header: 'راننده', field: 'TruckDriver' },
    { header: 'وضعیت نوبت', field: 'TurnStatusTitle' },
    { header: 'شرح', field: 'TurnStatusDescription' },
    { header: 'آخرین تغییرات', field: 'DateOfLastChanged' },
    { header: 'صف نوبت', field: 'BillOfLadingNumber' },
    { header: 'کاربر', field: 'SoftwareUserName' },
    {
      ...deleteCell.config,
      field: 'deactivate',
      header: 'ابطال نوبت',
      onAction: (row: TurnTableRow) => this.confirmDeactivation(row),
    },
    {
      ...editCell.config,
      field: 'activate',
      header: 'احیا نوبت',
      onAction: (row: TurnTableRow) => this.confirmActivation(row),
    },
    {
      type: TableColumnType.BUTTON_ICON,
      class: 'py-3 scale-90',
      header: 'لیست تراکنش ها',
      field: 'accounting',
      sorting: false,
      onAction: (row: TurnTableRow) => this.openTurnAccounting(row),
    },
  ];

  readonly accountingCols: TableColumn<TurnAccounting>[] = [
    { header: 'شماره نوبت', field: 'TurnId' },
    { header: 'تسلسل نوبت', field: 'SequentialTurnId' },
    { header: 'تاریخ', field: 'DateShamsi' },
    { header: 'زمان', field: 'Time' },
    { header: 'تراکنش', field: 'AccountingTypeTitle' },
    { header: 'کاربر', field: 'UserName' },
  ];

  // --- Search & Load ---
  searchTruckInformation = async (query: string) => {
    if (this.loading()) return;
    await this.withLoading(async () => {
      await this.loadTurnsList(query);
    });
  };

  private async loadTurnsList(smartCode: string) {
    if (this.smartCode.invalid) return;

    const resTruckInfo =
      await this.truckManagerService.GetTruckInfoFromAPI(smartCode);
    if (!checkAndToastError(resTruckInfo, this.toast)) {
      this.truckTurnsList.set([]);
      return;
    }

    this.populateSearchForm(
      resTruckInfo.data.TruckId,
      (resTruckInfo.data.Pelak ?? '') + (resTruckInfo.data.Serial ?? '')
    );

    const resTurnsInfo = await this.turnManagerService.GetLatestTurns(
      resTruckInfo.data.TruckId
    );
    if (!checkAndToastError(resTurnsInfo, this.toast)) return;

    const turns: TurnTableRow[] = resTurnsInfo.data.map((t) => ({
      ...t,
      deactivate: 'pi-times',
      activate: 'pi-refresh',
      accounting: 'pi-list',
    }));

    this.truckTurnsList.set(turns);
  }

  // --- Actions ---
  async activeTurn(row: TurnTableRow) {
    await this.withLoading(async () => {
      const response = await this.turnManagerService.ResuscitateTurn(
        row.TurnId
      );
      if (!checkAndToastError(response, this.toast)) return;
      await this.loadTurnsList(this.smartCode.value);
      this.toast.success('موفق', response.data.Message);
    });
  }

  async deActiveTurn(row: TurnTableRow) {
    await this.withLoading(async () => {
      const response = await this.turnManagerService.CancelTurn(row.TurnId);
      if (!checkAndToastError(response, this.toast)) return;
      await this.loadTurnsList(this.smartCode.value);
      this.toast.success('موفق', response.data.Message);
    });
  }

  async openTurnAccounting(row: TurnTableRow) {
    await this.withLoading(async () => {
      const response = await this.turnManagerService.GetTurnAccounting(
        row.TurnId
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.turnsAccounting.set(response.data);
      this.headerTitle.set('لیست تراکنش ها');
      this.dialogTurnAccounting = true;
    });
  }

  onCloseDialog() {
    this.turnsAccounting.set([]);
    this.dialogTurnAccounting = false;
  }

  // --- Confirmations ---
  confirmActivation(row: TurnTableRow) {
    const message = `شناسه ${row.TurnId} - راننده ${row.TruckDriver}`;
    this.confirmService.confirmTurnAction('activate', message, async () => {
      if (this.loading()) return;
      await this.withLoading(async () => {
        await this.activeTurn(row);
      });
    });
  }

  // For deactivation
  confirmDeactivation(row: TurnTableRow) {
    const message = `شناسه ${row.TurnId} - راننده ${row.TruckDriver}`;
    this.confirmService.confirmTurnAction('deactivate', message, async () => {
      if (this.loading()) return;
      await this.withLoading(async () => {
        await this.deActiveTurn(row);
      });
    });
  }

  // --- Form Getters ---
  get smartCode(): FormControl {
    return this.searchTrukForm.get('smart') as FormControl;
  }
  get truckId(): FormControl {
    return this.searchTrukForm.get('truckId') as FormControl;
  }
  get licensePlate(): FormControl {
    return this.searchTrukForm.get('licensePlate') as FormControl;
  }

  private populateSearchForm(truckId: number, licensePlateNumber: string) {
    this.truckId.setValue(truckId);
    this.licensePlate.setValue(licensePlateNumber);
  }
}
