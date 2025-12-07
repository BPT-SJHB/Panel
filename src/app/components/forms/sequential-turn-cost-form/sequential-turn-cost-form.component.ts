import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  deleteCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { BaseLoading } from '../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Dialog } from 'primeng/dialog';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { TurnCost } from 'app/services/turn-management/model/turn-cost.model';

type TurnCostRow = TurnCost & { delete: string };

@Component({
  selector: 'app-sequential-turn-cost-form',
  templateUrl: './sequential-turn-cost-form.component.html',
  styleUrls: ['./sequential-turn-cost-form.component.scss'],
  imports: [
    TableComponent,
    SearchAutoCompleteFactoryComponent,
    TextInputComponent,
    ButtonComponent,
    Dialog,
  ],
})
export class SequentialTurnCostFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly turnService = inject(TurnManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  readonly turnsCosts = signal<TurnCostRow[]>([]);
  readonly dialogTitle = signal<string>('صنف نوبت - هزینه های نوبت');

  readonly form = this.fb.group({
    SeqTurnId: this.fb.control<number | null>(null, ValidationSchema.id),
    SeqTurnTitle: this.fb.nonNullable.control('', ValidationSchema.title),
    SelfGoverCost: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    TruckersAssociationCost: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    TruckDriversAssociationCost: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  readonly columns: TableColumn<TurnCostRow>[] = [
    { header: 'شناسه', field: 'SeqTurnId' },
    { header: 'صف نوبت', field: 'SeqTurnTitle' },
    {
      header: 'سهم خودگردان (ریال)',
      field: 'SelfGoverCost',
      format: 'currency',
    },
    {
      header: 'سهم صنف کامیون داران (ریال)',
      field: 'TruckersAssociationCost',
      format: 'currency',
    },
    {
      header: 'سهم صنف رانندگان (ریال)',
      field: 'TruckDriversAssociationCost',
      format: 'currency',
    },
    {
      field: 'delete',
      ...deleteCell.config,
      onAction: (row) => this.onDelete(row),
    },
  ];

  // AUTOCOMPLETE CONFIGS --------------------------------------------
  readonly SequentialInput = this.autoCompleteFactory.create(
    AutoCompleteType.SequentialTurn,
    this.ctrl('SeqTurnId'),
    {
      control: this.ctrl('SeqTurnTitle'),
    }
  );

  isDialogVisible = false;
  addonWidth = '8rem';

  onViewActivated(): void {
    this.loadTurnsCost();
  }

  // ------------------ LOAD DATA ------------------
  private async loadTurnsCost() {
    await this.withLoading(async () => {
      const response = await this.turnService.GetAllTurnCosts();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        delete: deleteCell.value,
      }));
      this.turnsCosts.set(rows);
    });
  }

  // ------------------ DELETE ------------------
  private async onDelete(row: TurnCost) {
    this.confirmService.confirmDelete(
      `هزینه نوبت با شناسه ${row.SeqTurnId}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeSequentialTurnCost(row);

        await this.withLoading(async () => {
          const res = await this.turnService.DeleteTurnCost(deletePayload);
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadTurnsCost();
      }
    );
  }

  // ------------------ SUBMIT ------------------
  async submitRegister() {
    if (this.loading() || this.form.invalid) return;

    await this.withLoading(async () => {
      const registerPayload = this.serializeSequentialTurnCost({
        ...this.form.getRawValue(),
      } as TurnCost);

      const res = await this.turnService.RegisterTurnCost(registerPayload);
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });

    await this.loadTurnsCost();
    this.isDialogVisible = false;
  }

  // ------------------ UTILITIES ------------------
  serializeSequentialTurnCost(obj: TurnCost): TurnCost {
    return {
      SeqTurnId: Number(obj.SeqTurnId),
      SeqTurnTitle: obj.SeqTurnTitle,
      SelfGoverCost: Number(obj.SelfGoverCost),
      TruckersAssociationCost: Number(obj.TruckersAssociationCost),
      TruckDriversAssociationCost: Number(obj.TruckDriversAssociationCost),
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset();
    this.isDialogVisible = true;
  }
}
