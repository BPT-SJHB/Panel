import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

// 🧩 Services
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';

// 📦 Models
import { TurnForSoftwareUser } from 'app/services/turn-management/model/turn-for-software-user.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';

interface CardTurnItem {
  TurnId: number;
  TurnDistanceToValidity: number;
  Time: string;
  TurnStatusTitle: string;
  LspString: string;
  TruckDriver: string;
  SequentialTurn: string;
}

@Component({
  selector: 'app-issued-turn-list-form',
  standalone: true,
  imports: [CardModule, ButtonModule, ConfirmDialog, ButtonComponent],
  providers: [ConfirmationService],
  templateUrl: './issued-turn-list-form.component.html',
  styleUrl: './issued-turn-list-form.component.scss',
})
export class IssuedTurnListFormComponent implements OnInit, OnDestroy {
  // 🧠 Injected services
  private readonly turnsManagerService = inject(TurnManagementService);
  private readonly loadingService = inject(LoadingService);
  private readonly toast = inject(ToastService);
  private readonly confirmationService = inject(ConfirmationService);

  // ♻️ Used for unsubscribing on destroy
  private readonly destroy$ = new Subject<void>();

  // 📊 UI State
  readonly turnsList = signal<CardTurnItem[]>([]);
  readonly loading = signal(false);

  // 📌 Table columns config
  readonly cols: readonly { col: string; field: keyof CardTurnItem }[] = [
    { col: 'شماره نوبت', field: 'SequentialTurn' },
    { col: 'فاصله تا اعتبار', field: 'TurnDistanceToValidity' },
    { col: 'زمان', field: 'Time' },
    { col: 'وضعیت نوبت', field: 'TurnStatusTitle' },
    { col: 'ناوگان', field: 'LspString' },
    { col: 'راننده', field: 'TruckDriver' },
  ];

  ngOnInit(): void {
    // 🔄 Sync loading spinner with global loading state
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.loading.set(val));

    this.loadIssuedTurns();
  }

  ngOnDestroy(): void {
    // 🧼 Clean up observable subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ❗ Show confirmation dialog before canceling a turn
  confirmCancelTurn(turn: CardTurnItem): void {
    this.confirmationService.confirm({
      message: `آیا مطمئن هستید که می‌خواهید نوبت شماره ${turn.SequentialTurn} را لغو کنید؟`,
      header: 'تأیید لغو نوبت',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.cancelTurn(turn.TurnId);
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  // 🚫 API call to cancel a turn and reload the list
  private async cancelTurn(turnId: number): Promise<void> {
    const response = await this.turnsManagerService.CancelTurn(turnId);
    if (!checkAndToastError(response, this.toast)) return;

    this.toast.success('موفق', response.data.Message);
    await this.loadIssuedTurns();
  }

  // 🔁 Fetch the latest issued turns for the software user
  private async loadIssuedTurns(): Promise<void> {
    try {
      this.loadingService.setLoading(true);

      const response =
        await this.turnsManagerService.GetLatestTurnsForSoftwareUser();

      if (!checkAndToastError(response, this.toast)) {
        this.turnsList.set([]);
        return;
      }

      // 🧱 Map backend data into display-friendly format
      const turnItems: CardTurnItem[] = response.data.map(
        (turn: TurnForSoftwareUser) => ({
          TurnId: turn.TurnId,
          TurnDistanceToValidity: turn.TurnDistanceToValidity,
          Time: `${turn.TurnIssueDate} - ${turn.TurnIssueTime}`,
          TurnStatusTitle: turn.TurnStatusTitle,
          LspString: turn.LPString,
          TruckDriver: turn.TruckDriver,
          SequentialTurn: turn.SequentialTurn,
        })
      );

      this.turnsList.set(turnItems);
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}
