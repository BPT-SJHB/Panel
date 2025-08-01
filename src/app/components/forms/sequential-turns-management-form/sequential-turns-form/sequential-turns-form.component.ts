import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';

import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';

import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from "app/components/shared/button/button.component";

enum FormMode {
  EDITABLE,
  REGISTER,
}

@Component({
  selector: 'app-sequential-turns-form',
  templateUrl: './sequential-turns-form.component.html',
  styleUrl: './sequential-turns-form.component.scss',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    SearchInputComponent,
    NgClass,
    ConfirmDialogModule,
    Dialog,
    TextInputComponent,
    BinaryRadioInputComponent,
    ReactiveFormsModule,
    ButtonComponent
],
  providers: [ConfirmationService],
})
export class SequentialTurnsFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly loadingService = inject(LoadingService);
  private readonly sequentialTurnsService = inject(SequentialTurnManagementService);
  private readonly toast = inject(ToastService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroy$ = new Subject<void>();
  readonly tableUi = TableConfig;

  sequentialTurnForm = this.fb.group({
    id: [-1, ValidationSchema.id],
    title: ['', ValidationSchema.title],
    keyword: ['', ValidationSchema.keyword],
    status: [true, Validators.required],
  });

  sequentialTurnFormMode = FormMode.REGISTER;
  searchSequentialTurn = new FormControl<string>('', Validators.required);
  sequentialTurns: SequentialTurn[] = [];
  displaySequentialTurns: SequentialTurn[] = [];

  headerTitle: string = '';
  formDialogVisible = false;
  loading = false;

  cols = ['ویرایش', 'حذف', 'شناسه', 'عنوان نوبت', 'کلمه کلیدی', 'فعال'];

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => (this.loading = value));

    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async initialize(): Promise<void> {
    await this.loadSequentialTurns();
  }

  private async loadSequentialTurns(): Promise<void> {
    try {
      this.loadingService.setLoading(true);
      const response = await this.sequentialTurnsService.GetSequentialTurns('');
      if (!checkAndToastError(response, this.toast)) return;

      this.sequentialTurns = response.data ?? [];
      this.displaySequentialTurns = [...this.sequentialTurns];
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  handleSearch(results: SequentialTurn[]): void {
    this.displaySequentialTurns = results;
  }

  filterSequentialTurnGroup = (turn: SequentialTurn, query: string): boolean =>
    turn.SeqTurnTitle?.includes(query) ?? false;

  onDelete(row: SequentialTurn): void {
    const message = `آیا می‌خواهید رکورد با عنوان ${row.SeqTurnTitle} و کد ${row.SeqTurnId} حذف شود؟`;

    this.confirmationService.confirm({
      message,
      header: 'حذف رکورد',
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'لغو',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تایید',
        severity: 'danger',
      },
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.deleteSequentialTurn(row.SeqTurnId);
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  onEdit(row: SequentialTurn): void {
    this.headerTitle = 'ویرایش رکورد نوبت صفوف'
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

  isFormEditable():boolean {
    return this.sequentialTurnFormMode === FormMode.EDITABLE;
  }

  async registerOrEdit(): Promise<void> {
    try {
      this.loadingService.setLoading(true);
      if (this.sequentialTurnFormMode === FormMode.REGISTER) {
        await this.registerSequentialTurn();
      } else {
        await this.editSequentialTurn();
      }
      this.onCloseDialog();
    } finally {
      this.loadingService.setLoading(false);
    }
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
    const response = await this.sequentialTurnsService.RegisterNewSequentialTurn(
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
      id: -1,
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
