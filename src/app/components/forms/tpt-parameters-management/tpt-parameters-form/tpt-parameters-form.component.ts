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
import { BaseLoading } from '../../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { Dialog } from 'primeng/dialog';
import { TPTParamsManagementService } from 'app/services/tpt-params-management/tptparams-management.service';
import { TPTParamInfo } from 'app/services/tpt-params-management/model/tptparam-info.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { deepNullToUndefined } from 'app/utils/null-to-undefined';

// ------------------ INTERFACES & TYPES ------------------
type TPTParamsRow = TPTParamInfo & {
  edit: string;
  delete: string;
};

// ------------------ ENUMS ------------------
enum FormMode {
  EDITABLE,
  REGISTER,
}

// ------------------ COMPONENT ------------------
@Component({
  selector: 'app-tpt-parameters-form',
  imports: [TableComponent, Dialog, TextInputComponent, ButtonComponent],
  templateUrl: './tpt-parameters-form.component.html',
  styleUrl: './tpt-parameters-form.component.scss',
})
export class TPTParametersFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  // ------------------ INJECTED SERVICES ------------------
  private readonly tptParamsService = inject(TPTParamsManagementService);
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
      const response = await this.tptParamsService.GetAllTPTParams();
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
  private async onDelete(row: TPTParamInfo) {
    this.confirmService.confirmDelete(
      `پارامتر موثر با شناسه ${row.TPTPId} و عنوان ${row.TPTPTitle}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeTPTParams(row);

        await this.withLoading(async () => {
          const res = await this.tptParamsService.DeleteTPTParam(deletePayload);
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
    } as TPTParamInfo);

    const res = await this.tptParamsService.EditTPTParam(editPayload);
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitRegister() {
    await this.withLoading(async () => {
      const registerPayload = {
        ...this.form.getRawValue(),
      } as TPTParamInfo;

      const res = await this.tptParamsService.RegisterTPTParam(
        deepNullToUndefined(registerPayload)
      );

      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  // ------------------ UTILITIES ------------------
  serializeTPTParams(obj: TPTParamInfo) {
    return {
      TPTPId: Number(obj.TPTPId),
      TPTPTitle: obj.TPTPTitle,
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset({ TPTPId: null });
    this.formMode.set(FormMode.REGISTER);
    this.dialogTitle.set('ثبت پارامتر موثر');
    this.isDialogVisible = true;
  }

  onEdit(row: TPTParamInfo) {
    this.form.reset();
    this.form.patchValue({ ...row });
    this.formMode.set(FormMode.EDITABLE);
    this.dialogTitle.set('ویرایش پارامتر موثر');
    this.isDialogVisible = true;
  }
}
