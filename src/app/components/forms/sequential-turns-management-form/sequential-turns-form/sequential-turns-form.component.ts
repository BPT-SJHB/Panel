import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';

import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';

import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';

import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { AppTitles } from 'app/constants/Titles';
import { BaseLoading } from '../../shared/component-base/base-loading';

enum FormMode {
  EDITABLE,
  REGISTER,
}

export type SequentialTurnTableRow = SequentialTurn & {
  edit: string;
  delete: string;
};

@Component({
  selector: 'app-sequential-turns-form',
  templateUrl: './sequential-turns-form.component.html',
  styleUrl: './sequential-turns-form.component.scss',
  standalone: true,
  imports: [
    ButtonModule,
    SearchInputComponent,
    TableComponent,
    ConfirmDialogModule,
    Dialog,
    TextInputComponent,
    ToggleSwitchInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  providers: [ConfirmationService],
})
export class SequentialTurnsFormComponent extends BaseLoading {
  private readonly fb = inject(FormBuilder);
  private readonly sequentialTurnsService = inject(
    SequentialTurnManagementService
  );
  private readonly confirmService = inject(AppConfirmService);
  readonly tableUi = TableConfig;
  readonly appTitle = AppTitles;

  sequentialTurnForm = this.fb.group({
    id: this.fb.control<number | null>(null),
    title: ['', ValidationSchema.title],
    keyword: ['', ValidationSchema.keyword],
    status: [true, Validators.required],
  });

  sequentialTurnFormMode = FormMode.REGISTER;
  searchSequentialTurn = new FormControl<string>('', Validators.required);
  sequentialTurns: SequentialTurnTableRow[] = [];
  displaySequentialTurns: SequentialTurnTableRow[] = [];

  headerTitle = '';
  formDialogVisible = false;

  readonly columns: TableColumn<SequentialTurnTableRow>[] = [
    {
      field: 'SeqTurnId',
      header: 'شناسه',
    },
    {
      field: 'SeqTurnTitle',
      header: 'عنوان صف نوبت',
    },
    {
      field: 'SeqTurnKeyWord',
      header: 'کلمه کلیدی',
      class: 'font-bold',
    },
    {
      ...editCell.config,
      field: 'edit',
      onAction: (row: SequentialTurn) => this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: (row: SequentialTurn) => this.onDelete(row),
    },
  ];

  private async initialize(): Promise<void> {
    await this.loadSequentialTurns();
  }

  private async loadSequentialTurns(): Promise<void> {
    if (this.loading()) return;

    this.withLoading(async () => {
      const response = await this.sequentialTurnsService.GetSequentialTurns('');
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((st) => ({
        ...st,
        edit: editCell.value,
        delete: deleteCell.value,
      }));
      this.sequentialTurns = rows;
      this.displaySequentialTurns = [...this.sequentialTurns];
    });
  }

  handleSearch(results: SequentialTurnTableRow[]): void {
    this.displaySequentialTurns = results;
  }

  filterSequentialTurnGroup = (turn: SequentialTurn, query: string): boolean =>
    turn.SeqTurnTitle?.includes(query) ?? false;

  onDelete(row: SequentialTurn): void {
    if (this.loading()) return;

    this.confirmService.confirmDelete(
      `${row.SeqTurnTitle} با شناسه ${row.SeqTurnId}`,
      async () => {
        await this.withLoading(async () => {
          await this.deleteSequentialTurn(row.SeqTurnId);
        });
      }
    );
  }

  onEdit(row: SequentialTurn): void {
    this.headerTitle = 'ویرایش صف نوبت';
    this.populateSequentialForm(row);
    this.sequentialTurnFormMode = FormMode.EDITABLE;
    this.formDialogVisible = true;
  }

  onNew(): void {
    this.headerTitle = 'افزودن رکورد نوبت صفوف';
    this.resetSequentialTurnForm();
    this.sequentialTurnFormMode = FormMode.REGISTER;
    this.formDialogVisible = true;
  }

  onCloseDialog(): void {
    this.formDialogVisible = false;
  }

  isFormEditable(): boolean {
    return this.sequentialTurnFormMode === FormMode.EDITABLE;
  }

  async registerOrEdit(): Promise<void> {
    if (this.loading()) return;
    await this.withLoading(async () => {
      if (this.sequentialTurnFormMode === FormMode.REGISTER) {
        await this.registerSequentialTurn();
      } else {
        await this.editSequentialTurn();
      }
      this.onCloseDialog();
    });
  }

  private populateSequentialForm(data: SequentialTurn): void {
    this.sequentialTurnForm.patchValue({
      id: data.SeqTurnId,
      title: data.SeqTurnTitle,
      keyword: data.SeqTurnKeyWord,
      status: data.Active,
    });
  }

  private extractSequentialForm(): SequentialTurn {
    return {
      SeqTurnId: this.sequentialTurnId.value,
      SeqTurnTitle: this.sequentialTurnTitle.value,
      SeqTurnKeyWord: this.sequentialTurnKeyword.value,
      Active: this.sequentialTurnStatus.value,
    };
  }

  private async registerSequentialTurn(): Promise<void> {
    const turn = this.extractSequentialForm();
    const response =
      await this.sequentialTurnsService.RegisterNewSequentialTurn(
        turn.SeqTurnId,
        turn.SeqTurnTitle ?? '',
        turn.SeqTurnKeyWord ?? '',
        turn.Active ?? true
      );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    await this.loadSequentialTurns();
  }

  private async editSequentialTurn(): Promise<void> {
    const turn = this.extractSequentialForm();
    const response = await this.sequentialTurnsService.EditSequentialTurn(
      turn.SeqTurnId,
      turn.SeqTurnTitle ?? '',
      turn.SeqTurnKeyWord ?? '',
      turn.Active ?? true
    );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    await this.loadSequentialTurns();
  }

  private async deleteSequentialTurn(id: number): Promise<void> {
    const response = await this.sequentialTurnsService.DeleteSequentialTurn(id);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    await this.loadSequentialTurns();
  }

  private resetSequentialTurnForm(): void {
    this.sequentialTurnForm.reset({
      id: null,
      title: '',
      keyword: '',
      status: true,
    });
  }

  // ========= Form Getters ==========
  get sequentialTurnId(): FormControl {
    return this.sequentialTurnForm.get('id') as FormControl;
  }

  get sequentialTurnTitle(): FormControl {
    return this.sequentialTurnForm.get('title') as FormControl;
  }

  get sequentialTurnKeyword(): FormControl {
    return this.sequentialTurnForm.get('keyword') as FormControl;
  }

  get sequentialTurnStatus(): FormControl {
    return this.sequentialTurnForm.get('status') as FormControl;
  }
}
