import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { ConfigManagementService } from 'app/services/config-management/config-management.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { Dialog } from 'primeng/dialog';
import { BaseLoading } from '../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { DeviceConfig } from 'app/services/config-management/model/device-config.model';

type DeviceConfigRow = DeviceConfig & {
  edit: string;
  delete: string;
  copy: string;
};

enum FormMode {
  EDITABLE,
  REGISTER,
}

@Component({
  selector: 'app-equipment-device-config-form',
  imports: [
    TableComponent,
    Dialog,
    TextInputComponent,
    SearchAutoCompleteFactoryComponent,
    ButtonComponent,
  ],
  templateUrl: './equipment-device-config-form.component.html',
  styleUrl: './equipment-device-config-form.component.scss',
})
export class EquipmentDeviceConfigFormComponent extends BaseLoading {
  // SERVICES --------------------------------------------------------
  private readonly configService = inject(ConfigManagementService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly fb = inject(FormBuilder);

  // SIGNALS ---------------------------------------------------------
  readonly formMode = signal<FormMode>(FormMode.REGISTER);
  readonly devicesConfig = signal<DeviceConfigRow[]>([]);
  readonly dialogTitle = signal<string>('');
  readonly currentRow = signal<DeviceConfig | null>(null);

  // STATE -----------------------------------------------------------
  isDialogVisible = false;
  readonly addonWidth = '6rem';

  // FORM ------------------------------------------------------------
  readonly form = this.fb.group({
    CODId: this.fb.control<number | null>(null, ValidationSchema.id),
    CODTitle: this.fb.nonNullable.control<string>('', [Validators.required]),
    CODIndexTitle: this.fb.nonNullable.control<string>('', [
      Validators.required,
    ]),
    DeviceId: this.fb.control<number | null>(null, ValidationSchema.id),
    DeviceTitle: this.fb.nonNullable.control<string>('', [Validators.required]),
    CODValue: this.fb.nonNullable.control<string>(''),
  });

  ctrl<T extends keyof typeof this.form.controls>(control: T) {
    return this.form.get(control as string) as FormControl;
  }

  // AUTOCOMPLETE CONFIGS --------------------------------------------
  readonly DevicesInput = this.autoCompleteFactory.create(
    AutoCompleteType.Devices,
    this.ctrl('DeviceId'),
    {
      control: this.ctrl('DeviceTitle'),
      readOnly: () => this.formMode() === FormMode.EDITABLE,
    }
  );

  // TABLE COLUMNS ---------------------------------------------------
  readonly columns: TableColumn<DeviceConfigRow>[] = [
    { header: 'شناسه', field: 'CODId' },
    { header: 'عنوان اصلی', field: 'CODTitle' },
    { header: 'عنوان فرعی', field: 'CODIndexTitle' },
    { header: 'دیوایس', field: 'DeviceTitle' },
    { header: 'مقدار', field: 'CODValue' },
    { header: 'توضیحات', field: 'Description' },
    {
      ...editCell.config,
      field: 'edit',
      header: 'ویرایش',
      disable: (row: DeviceConfig) => row.DeviceId === 0,
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
      disable: (row: DeviceConfig) => row.DeviceId !== 0,
      onAction: (row) => this.openDialog(FormMode.REGISTER, row),
    },
  ];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadDevicesConfigs();
  }

  // LOAD ------------------------------------------------------------
  private async loadDevicesConfigs() {
    await this.withLoading(async () => {
      const res = await this.configService.GetAllOfDeviceConfigs();
      if (!checkAndToastError(res, this.toast)) return;

      const rows = res.data.map((item) => ({
        ...item,
        edit: editCell.value,
        delete: deleteCell.value,
        copy: 'pi pi-copy',
      }));

      this.devicesConfig.set(rows);
    });
  }

  // DELETE ----------------------------------------------------------
  private async onDelete(row: DeviceConfig) {
    this.confirmService.confirmDelete(
      `شناسه ${row.CODId} و عنوان اصلی ${row.CODTitle}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeDeviceConfig(row);

        await this.withLoading(async () => {
          const res =
            await this.configService.DeleteDeviceConfig(deletePayload);
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadDevicesConfigs();
      }
    );
  }

  // DIALOG ----------------------------------------------------------
  openDialog(mode: FormMode, row: DeviceConfig) {
    this.form.reset();
    this.form.patchValue({ ...row });

    if (mode === FormMode.REGISTER) {
      this.resetDeviceField();
      this.dialogTitle.set('کپی پیکربندی');
    } else {
      this.dialogTitle.set('ویرایش پیکربندی');
    }

    this.currentRow.set(row);
    this.formMode.set(mode);
    this.isDialogVisible = true;
  }

  private resetDeviceField() {
    this.ctrl('DeviceId').reset();
    this.ctrl('DeviceTitle').reset();
  }

  // SAVE (REGISTER/EDIT) -------------------------------------------
  async save() {
    if (this.form.invalid || this.loading()) return;

    await this.withLoading(async () => {
      if (this.formMode() === FormMode.EDITABLE) await this.submitEdit();
      else await this.submitRegister();
    });

    await this.loadDevicesConfigs();
    this.isDialogVisible = false;
  }

  private async submitRegister() {
    const row = this.currentRow();
    if (!row) return;

    const registerPayload = this.serializeDeviceConfig({
      ...row,
      ...this.form.getRawValue(),
    } as DeviceConfig);

    const res = await this.configService.RegisterDeviceConfig(registerPayload);
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitEdit() {
    const row = this.currentRow();
    if (!row) return;

    const editPayload = this.serializeDeviceConfig({
      ...row,
      ...this.form.getRawValue(),
    } as DeviceConfig);

    const res = await this.configService.EditDeviceConfig(editPayload);
    if (!checkAndToastError(res, this.toast)) return;

    this.toast.success('موفق', res.data.Message);
  }

  serializeDeviceConfig(raw: DeviceConfig): DeviceConfig {
    return {
      CODId: Number(raw.CODId),
      CODName: raw.CODName.trim(),
      CODTitle: raw.CODTitle.trim(),
      CODIndex: Number(raw.CODIndex),
      CODIndexTitle: raw.CODIndexTitle.trim(),
      DeviceId: Number(raw.DeviceId),
      DeviceTitle: raw.DeviceTitle.trim(),
      Description: raw.Description.trim(),
      CODValue: raw.CODValue.toString().trim(),
    };
  }
}
