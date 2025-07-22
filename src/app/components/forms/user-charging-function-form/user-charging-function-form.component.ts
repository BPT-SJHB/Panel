import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TimePickerInput } from 'app/components/shared/inputs/time-picker-input/time-picker-input.component.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component.component';
import { TableModule } from 'primeng/table';
import { WalletUserChargingFunction } from 'app/services/wallet-management/model/wallet-user-charging-function.model';
import { Button } from 'primeng/button';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { checkAndToastError } from 'app/utils/api-utils';

@Component({
  selector: 'app-user-charging-function-form',
  imports: [
    TimePickerInput,
    DatePickerInput,
    TableModule,
    Button,
    TextInputComponent,
  ],
  templateUrl: './user-charging-function-form.component.html',
  styleUrl: './user-charging-function-form.component.scss',
})
export class UserChargingFunctionFormComponent {
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);
  private walletManager = inject(WalletManagementService);
}
