import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { BaseLoading } from '../shared/component-base/base-loading';

import { ConfigManagementService } from 'app/services/config-management/config-management.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';

import { checkAndToastError } from 'app/utils/api-utils';
import { LoadAnnouncementConfig } from 'app/services/config-management/model/load-announcement-config.model';

import {
  TableColumn,
  TableColumnType,
  TableComponent,
  editCell,
  deleteCell,
} from 'app/components/shared/table/table.component';

import { Dialog } from 'primeng/dialog';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ButtonComponent } from 'app/components/shared/button/button.component';

// TYPES ------------------------------------------------------------

type LoadAnnouncementConfigRow = LoadAnnouncementConfig & {
  edit: string;
  delete: string;
  copy: string;
};

enum FormMode {
  EDITABLE,
  REGISTER,
}

// COMPONENT ---------------------------------------------------------

@Component({
  selector: 'app-load-announcement-config-form',
  templateUrl: './load-announcement-config-form.component.html',
  styleUrl: './load-announcement-config-form.component.scss',
  imports: [
    TableComponent,
    Dialog,
    TextInputComponent,
    SearchAutoCompleteFactoryComponent,
    ButtonComponent,
  ],
})
export class LoadAnnouncementConfigFormComponent extends BaseLoading {
  // SERVICES --------------------------------------------------------

  private readonly configService = inject(ConfigManagementService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly fb = inject(FormBuilder);

  // SIGNALS ---------------------------------------------------------

  readonly formMode = signal<FormMode>(FormMode.REGISTER);
  readonly loadsConfig = signal<LoadAnnouncementConfigRow[]>([]);
  readonly dialogTitle = signal<string>('');
  readonly currentRow = signal<LoadAnnouncementConfig | null>(null);

  // STATE -----------------------------------------------------------

  isDialogVisible = false;
  readonly addonWidth = '6rem';

  // FORM ------------------------------------------------------------

  readonly form = this.fb.group({
    COLAId: this.fb.control<number | null>(null, ValidationSchema.id),
    COLATitle: this.fb.nonNullable.control<string>(''),
    COLAIndexTitle: this.fb.nonNullable.control<string>(''),

    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: this.fb.nonNullable.control<string>(''),

    AnnouncementSGId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementSGTitle: this.fb.control<string>(''),

    COLAValue: this.fb.nonNullable.control<string>(''),
  });

  // HELPERS ---------------------------------------------------------

  ctrl<T extends keyof typeof this.form.controls>(control: T) {
    return this.form.get(control as string) as FormControl;
  }

  // AUTOCOMPLETE CONFIGS --------------------------------------------

  readonly announcementInput = this.autoCompleteFactory.create(
    AutoCompleteType.AnnouncementGroup,
    this.ctrl('AnnouncementId'),
    {
      control: this.ctrl('AnnouncementTitle'),
      readOnly: () => this.formMode() === FormMode.EDITABLE,
      valueChange: () => {
        this.ctrl('AnnouncementId').reset();
        this.ctrl('AnnouncementSGId').reset();
        this.ctrl('AnnouncementSGTitle').reset('');
      },
    }
  );

  readonly subAnnouncementInput = this.autoCompleteFactory.create(
    AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
    this.ctrl('AnnouncementSGId'),
    {
      groupControlId: this.ctrl('AnnouncementId'),
      control: this.ctrl('AnnouncementSGTitle'),
      readOnly: () =>
        this.ctrl('AnnouncementId').invalid ||
        this.formMode() === FormMode.EDITABLE,
      valueChange: () => {
        this.ctrl('AnnouncementSGId').reset();
      },
    }
  );

  // TABLE COLUMNS ---------------------------------------------------

  readonly columns: TableColumn<LoadAnnouncementConfigRow>[] = [
    { header: 'شناسه', field: 'COLAId' },
    { header: 'عنوان اصلی', field: 'COLATitle' },
    { header: 'عنوان فرعی', field: 'COLAIndexTitle' },
    { header: 'گروه بار', field: 'AnnouncementId' },
    { header: 'زیر گروه اعلام بار', field: 'AnnouncementSGId' },
    { header: 'مقدار', field: 'COLAValue' },
    { header: 'توضیحات', field: 'Description' },

    {
      ...editCell.config,
      field: 'edit',
      header: 'ویرایش',
      disable: (row: LoadAnnouncementConfig) => row.AnnouncementSGId === 0,
      onAction: (row) => this.openDialog(FormMode.EDITABLE, row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      header: 'حذف',
      onAction: (row) => this.onDelete(row),
    },
    {
      field: 'copy',
      header: 'کپی',
      type: TableColumnType.BUTTON_ICON,
      sorting: false,
      class: editCell.config.class,
      disable: (row) => row.AnnouncementSGId !== 0,
      onAction: (row) => this.openDialog(FormMode.REGISTER, row),
    },
  ];

  // LIFECYCLE -------------------------------------------------------

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadConfigs();
  }

  // LOAD ------------------------------------------------------------

  private async loadConfigs() {
    await this.withLoading(async () => {
      const res = await this.configService.GetAllOfLoadAnnouncementConfig();
      if (!checkAndToastError(res, this.toast)) return;

      const rows = res.data.map((item) => ({
        ...item,
        edit: editCell.value,
        delete: deleteCell.value,
        copy: 'pi pi-copy',
      }));

      this.loadsConfig.set(rows);
    });
  }

  // DELETE ----------------------------------------------------------

  private async onDelete(row: LoadAnnouncementConfig) {
    this.confirmService.confirmDelete(
      `شناسه ${row.COLAId} و عنوان اصلی ${row.COLATitle}`,
      async () => {
        if (this.loading()) return;

        await this.withLoading(async () => {
          const res =
            await this.configService.DeleteLoadAnnouncementConfig(row);
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadConfigs();
      }
    );
  }

  // DIALOG ----------------------------------------------------------

  openDialog(mode: FormMode, row: LoadAnnouncementConfig) {
    this.form.reset();
    this.form.patchValue({ ...row });

    if (mode === FormMode.REGISTER) {
      this.resetAnnouncementFields();
      this.dialogTitle.set('کپی پیکربندی');
    } else {
      this.dialogTitle.set('ویرایش پیکربندی');
    }

    this.currentRow.set(row);
    this.formMode.set(mode);
    this.isDialogVisible = true;
  }

  private resetAnnouncementFields() {
    this.ctrl('AnnouncementId').reset();
    this.ctrl('AnnouncementTitle').reset();
    this.ctrl('AnnouncementSGId').reset();
    this.ctrl('AnnouncementSGTitle').reset();
  }

  // SAVE (REGISTER/EDIT) -------------------------------------------

  async save() {
    if (this.form.invalid || this.loading()) return;

    await this.withLoading(async () => {
      if (this.formMode() === FormMode.EDITABLE) await this.submitEdit();
      else await this.submitRegister();
    });

    await this.loadConfigs();
    this.isDialogVisible = false;
  }

  private async submitRegister() {
    const row = this.currentRow();
    if (!row) return;

    const payload = {
      ...row,
      ...this.form.getRawValue(),
    } as LoadAnnouncementConfig;

    const res =
      await this.configService.RegisterLoadAnnouncementConfig(payload);
    if (!checkAndToastError(res, this.toast)) return;

    this.toast.success('موفق', res.data.Message);
  }

  private async submitEdit() {
    const row = this.currentRow();
    if (!row) return;

    const payload = {
      ...row,
      ...this.form.getRawValue(),
    } as LoadAnnouncementConfig;

    const res = await this.configService.EditLoadAnnouncementConfig(payload);
    if (!checkAndToastError(res, this.toast)) return;

    this.toast.success('موفق', res.data.Message);
  }
}
