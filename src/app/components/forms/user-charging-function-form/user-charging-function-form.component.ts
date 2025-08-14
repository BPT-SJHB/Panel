import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TimePickerInput } from 'app/components/shared/inputs/time-picker-input/time-picker-input.component.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import { TableModule } from 'primeng/table';
import { WalletUserChargingFunction } from 'app/services/wallet-management/model/wallet-user-charging-function.model';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TableConfig } from 'app/constants/ui/table.ui';

@Component({
  selector: 'app-user-charging-function-form',
  imports: [
    TimePickerInput,
    DatePickerInput,
    TableModule,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './user-charging-function-form.component.html',
  styleUrl: './user-charging-function-form.component.scss',
})
export class UserChargingFunctionFormComponent {
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);
  private walletManager = inject(WalletManagementService);

  UserChargingFunctionsForm = this.fb.group({
    startDate: [''],
    endDate: [''],
    startTime: ['00:00:00'],
    endTime: ['00:00:00'],
    totalAmount: new FormControl<number | null>(null),
  });

  userFunctions = signal<WalletUserChargingFunction[]>([]);

  cols = ['تاریخ', 'زمان', 'مبلغ', 'کد شناسایی کیف پول'];
  tableUi = TableConfig;

  async FetchData() {
    //! loading start

    const responseOfTable = await this.walletManager.GetUserChargingFunctions(
      this.startDate.value,
      this.endDate.value,
      this.startTime.value,
      this.endTime.value
    );
    if (!checkAndToastError(responseOfTable, this.toast)) return;

    this.userFunctions.set(this.sortTable(responseOfTable.data));

    const responseOfTotalFunctionsAmount =
      await this.walletManager.GetTotalOfUserFunctions(
        this.startDate.value,
        this.endDate.value,
        this.startTime.value,
        this.endTime.value
      );

    if (!checkAndToastError(responseOfTotalFunctionsAmount, this.toast)) return;

    this.totalAmount.setValue(responseOfTotalFunctionsAmount.data.Total);

    //! loading ends
  }

  private sortTable(
    data: WalletUserChargingFunction[]
  ): WalletUserChargingFunction[] {
    return data.sort((a, b) => {
      const dateCompare = a.ShamsiDate.localeCompare(b.ShamsiDate);

      if (dateCompare === 0) {
        return a.Time.localeCompare(b.Time);
      }
      return dateCompare;
    });
  }

  get startDate(): FormControl {
    return this.UserChargingFunctionsForm.get('startDate') as FormControl;
  }
  get endDate(): FormControl {
    return this.UserChargingFunctionsForm.get('endDate') as FormControl;
  }
  get startTime(): FormControl {
    return this.UserChargingFunctionsForm.get('startTime') as FormControl;
  }
  get endTime(): FormControl {
    return this.UserChargingFunctionsForm.get('endTime') as FormControl;
  }
  get totalAmount(): FormControl {
    return this.UserChargingFunctionsForm.get('totalAmount') as FormControl;
  }
}
