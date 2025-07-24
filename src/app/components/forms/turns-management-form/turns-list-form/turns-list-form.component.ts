import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TurnAccounting } from 'app/services/turn-management/model/turn-accounting.model';
import { Dialog } from 'primeng/dialog';
import { Turn } from 'app/services/turn-management/model/turn.model';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableConfig } from 'app/constants/ui/table.ui';

@Component({
  selector: 'app-turns-list-form',
  imports: [
    ButtonModule,
    TextInputComponent,
    SearchInputComponent,
    TableModule,
    Dialog,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './turns-list-form.component.html',
  styleUrl: './turns-list-form.component.scss',
})
export class TurnsListFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private truckManagerService = inject(Driver_TruckManagementService);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();
  private turnManagerService = inject(TurnManagementService);
  private confirmationService = inject(ConfirmationService);

  readonly tableUi = TableConfig;

  turnsCols = [
    'شماره نوبت',
    'تسلسل نوبت',
    'تاریخ صدور',
    'زمان صدور',
    'راننده',
    'وضعیت نوبت',
    'شرح',
    'آخرین تغییرات',
    'صف نوبت',
    'کاربر',
    'ابطال نوبت',
    'احیا نوبت',
    'لیست تراکنش ها',
  ];

  accountingCols = [
    'شماره نوبت',
    'شماره صفوف نوبت دهی',
    'تاریخ',
    'زمان',
    'تراکنش',
    'کاربر',
  ];

  loading = false;
  truckTurnsList: Turn[] = [];
  searchTrukForm = this.fb.group({
    smart: ['', ValidationSchema.smartCard],
    truckId: ['', ValidationSchema.truckId],
    licensePlate: ['', ValidationSchema.licensePlateNumber],
  });
  dialogTurnAccounting: boolean = false;
  turnsAccounting: TurnAccounting[] = [];
  headerTitle: any;

  // Lifecycle: on component init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.loading = val));
  }

  // Lifecycle: clean up on destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchTruckInformation = async (query: string) => {
    if (this.loading) return;
    await this.loadTurnsList(query);
  };

  private async loadTurnsList(smartCode: string) {
    if (this.smartCode.invalid) return;
    try {
      this.loadingService.setLoading(true);
      const resTruckInfo = await this.truckManagerService.GetTruckInfoFromAPI(
        smartCode
      );
      if (!checkAndToastError(resTruckInfo, this.toast)) {
        this.truckTurnsList = [];
        return;
      }
      this.populateSearchForm(
        resTruckInfo.data.TruckId,
        resTruckInfo.data.Pelak ?? ''
      );

      const resTurnsInfo = await this.turnManagerService.GetLatestTurns(
        resTruckInfo.data.TruckId
      );
      if (!checkAndToastError(resTurnsInfo, this.toast)) return;
      this.truckTurnsList = resTurnsInfo.data;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async activeTurn(row: Turn) {
    try {
      this.loadingService.setLoading(true);

      const response = await this.turnManagerService.ResuscitateTurn(
        row.TurnId
      );
      if (!checkAndToastError(response, this.toast)) return;
      await this.loadTurnsList(this.smartCode.value);
      this.toast.success('موفق', response.data.Message);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async deActiveTurn(row: Turn) {
    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagerService.CancelTurn(row.TurnId);
      if (!checkAndToastError(response, this.toast)) return;
      await this.loadTurnsList(this.smartCode.value);
      this.toast.success('موفق', response.data.Message);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async openTurnAccounting(row: Turn) {
    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagerService.GetTurnAccounting(
        row.TurnId
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.turnsAccounting = response.data;
      this.headerTitle = `لیست تراکنش های شماره نوبت ${row.TurnId}`;
      this.dialogTurnAccounting = true;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  onCloseDialog() {
    this.turnsAccounting = [];
  }

  confirmActivation(rowData: any) {
    this.confirmationService.confirm({
      message: `آیا از احیا نوبت مطمئن هستید؟`,
      accept: () => {
        this.activeTurn(rowData); // your actual logic
      },
      rejectButtonProps: {
        severity: 'secondary',
        outlined: false,
      },
      acceptButtonProps: {
        severity: 'info',
        outlined: false,
      },
    });
  }

  confirmDeactivation(rowData: any) {
    this.confirmationService.confirm({
      message: `آیا از ابطال نوبت مطمئن هستید؟`,
      accept: () => {
        this.deActiveTurn(rowData); // your actual logic
      },
      rejectButtonProps: {
        severity: 'secondary',
        outlined: false,
      },
      acceptButtonProps: {
        severity: 'danger',
        outlined: false,
      },
    });
  }

  private populateSearchForm(truckId: number, licensePlateNumber: string) {
    this.truckId.setValue(truckId);
    this.licensePlate.setValue(licensePlateNumber);
  }

  get smartCode(): FormControl {
    return this.searchTrukForm.get('smart') as FormControl;
  }

  get truckId(): FormControl {
    return this.searchTrukForm.get('truckId') as FormControl;
  }

  get licensePlate(): FormControl {
    return this.searchTrukForm.get('licensePlate') as FormControl;
  }
}
