// ------------------ IMPORTS ------------------
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { Dialog } from 'primeng/dialog';

// ------------------ INTERFACES & TYPES ------------------
export interface TPTParams {
  TPTPId: number;
  TPTPTitle: string;
}

type TPTParamsRow = TPTParams & {
  edit: string;
  delete: string;
};

// ------------------ ENUMS ------------------
enum FormMode {
  EDITABLE,
  REGISTER,
}

// ------------------ MOCK DATA ------------------
export const mockTPTParams: TPTParams[] = [
  { TPTPId: 1, TPTPTitle: 'دو باسکوله (ذوب آهنی)' },
  { TPTPId: 2, TPTPTitle: 'سه باسکوله (ذوب آهنی)' },
  { TPTPId: 3, TPTPTitle: 'چهار باسکوله (ذوب آهنی)' },
  { TPTPId: 4, TPTPTitle: 'شب آخر' },
  { TPTPId: 7, TPTPTitle: 'کلاف' },
  { TPTPId: 8, TPTPTitle: 'پروژه' },
  { TPTPId: 10, TPTPTitle: 'دومحل تخلیه (توافقی)' },
  { TPTPId: 11, TPTPTitle: 'تیرآهن نرمال' },
  { TPTPId: 12, TPTPTitle: 'میلگرد نرمال' },
  { TPTPId: 13, TPTPTitle: 'طرح شهری (روز تخلیه)' },
  { TPTPId: 14, TPTPTitle: 'طرح شهری محل خاص و پروژه  (شب تخلیه)' },
  { TPTPId: 15, TPTPTitle: 'طرح (شهرستان)' },
  {
    TPTPId: 16,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک بدون جابجایی)',
  },
  {
    TPTPId: 17,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور بدون جابجایی)',
  },
  {
    TPTPId: 18,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 50%)',
  },
  {
    TPTPId: 19,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 70%)',
  },
  {
    TPTPId: 20,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 50%)',
  },
  {
    TPTPId: 21,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 70%)',
  },
  {
    TPTPId: 22,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (جابجایی 100% = کرایه کامل شهری)',
  },
  {
    TPTPId: 23,
    TPTPTitle:
      'دو محل بارگیری ذوب و انبار (انبار دور با فاصله غیر متعارف = توافق دو صنف)',
  },
  { TPTPId: 24, TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک بدون جابجایی)' },
  { TPTPId: 25, TPTPTitle: 'دو محل بارگیری انباری (انبار دور بدون جابجایی)' },
  {
    TPTPId: 26,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 50%)',
  },
  {
    TPTPId: 27,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 70%)',
  },
  {
    TPTPId: 28,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 100%)',
  },
  { TPTPId: 29, TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 50%)' },
  { TPTPId: 30, TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 70%)' },
  {
    TPTPId: 31,
    TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 100%)',
  },
  {
    TPTPId: 32,
    TPTPTitle:
      'دو محل بارگیری انباری (انبار دور با فاصله غیر متعارف = توافق دو صنف)',
  },
];

// ------------------ COMPONENT ------------------
@Component({
  selector: 'app-effective-parameters-form',
  imports: [TableComponent, Dialog, TextInputComponent, ButtonComponent],
  templateUrl: './effective-parameters-form.component.html',
  styleUrl: './effective-parameters-form.component.scss',
})
export class EffectiveParametersFormComponent extends BaseLoading {
  // ------------------ INJECTED SERVICES ------------------
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);

  // ------------------ SIGNALS & STATE ------------------
  readonly tptParams = signal<TPTParamsRow[]>([]);
  readonly dialogTitle = signal<string>('');
  readonly formMode = signal<FormMode>(FormMode.REGISTER);
  isDialogVisible = false;
  addonWidth = '6rem';
  FormModel = FormMode;

  // ------------------ FORM ------------------
  readonly form = this.fb.group({
    TPTPId: this.fb.control<number | null>(null),
    TPTPTitle: this.fb.nonNullable.control('', ValidationSchema.title),
  });

  // ------------------ TABLE CONFIG ------------------
  readonly columns: TableColumn<TPTParamsRow>[] = [
    { header: 'شناسه', field: 'TPTPId' },
    { header: 'عنوان', field: 'TPTPTitle' },
    { field: 'edit', ...editCell.config, onAction: (row) => this.onEdit(row) },
    {
      field: 'delete',
      ...deleteCell.config,
      onAction: (row) => this.onDelete(row),
    },
  ];

  // ------------------ LIFECYCLE HOOK ------------------
  onViewActivated(): void {
    this.loadTPTParams();
  }

  // ------------------ DATA METHODS ------------------
  private async loadTPTParams() {
    await this.withLoading(async () => {
      const response = { success: true, data: mockTPTParams };
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        delete: deleteCell.value,
        edit: editCell.value,
      }));
      this.tptParams.set(rows);
    });
  }

  // ------------------ CRUD ACTIONS ------------------
  private async onDelete(row: TPTParams) {
    this.confirmService.confirmDelete(
      `پارامتر موثر با شناسه ${row.TPTPId} و عنوان ${row.TPTPTitle}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeTPTParams(row);
        console.log({ deletePayload });

        await this.withLoading(async () => {
          const res = { success: true, data: mockShortResponse };
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadTPTParams();
      }
    );
  }

  async save() {
    if (this.form.invalid || this.loading()) return;

    await this.withLoading(async () => {
      if (this.formMode() === FormMode.EDITABLE) await this.submitEdit();
      else await this.submitRegister();
    });

    await this.loadTPTParams();
    this.isDialogVisible = false;
  }

  private async submitEdit() {
    const editPayload = this.serializeTPTParams({
      ...this.form.getRawValue(),
    } as TPTParams);

    console.log({ editPayload });

    const res = { success: true, data: mockShortResponse };
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitRegister() {
    await this.withLoading(async () => {
      const registerPayload = this.serializeTPTParams({
        ...this.form.getRawValue(),
      } as TPTParams);

      console.log({ registerPayload });

      const res = { success: true, data: mockShortResponse };
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  // ------------------ UTILITIES ------------------
  serializeTPTParams(obj: TPTParams): TPTParams {
    return {
      TPTPId: Number(obj.TPTPId),
      TPTPTitle: obj.TPTPTitle,
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset();
    this.formMode.set(FormMode.REGISTER);
    this.dialogTitle.set('ثبت پارامتر موثر');
    this.isDialogVisible = true;
  }

  onEdit(row: TPTParams) {
    this.form.reset();
    this.form.patchValue({ ...row });
    this.formMode.set(FormMode.EDITABLE);
    this.dialogTitle.set('ویرایش پارامتر موثر');
    this.isDialogVisible = true;
  }
}
