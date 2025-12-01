import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../shared/component-base/base-loading';
import { ConfigManagementService } from 'app/services/config-management/config-management.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import { DeviceInfo } from 'app/services/config-management/model/device-info.model';

import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';

import { checkAndToastError } from 'app/utils/api-utils';
import { AppConfirmService } from 'app/services/confirm/confirm.service';

import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from 'app/components/shared/button/button.component';

// Form modes: editing an existing device or creating a new one
enum FormMode {
  EDITABLE,
  REGISTER,
}

// Row format for table (device fields + edit/delete action cells)
type DeviceInfoRow = DeviceInfo & { edit: string; delete: string };

@Component({
  selector: 'app-device-management-form',
  templateUrl: './device-management-form.component.html',
  imports: [
    TableComponent,
    ToggleSwitchInputComponent,
    TextInputComponent,
    DialogModule,
    ButtonComponent,
  ],
})
export class DeviceManagementFormComponent extends BaseLoading {
  // Inject required services
  private readonly configService = inject(ConfigManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);

  // Signals for table rows, selected item, dialog title, and mode
  readonly devices = signal<DeviceInfoRow[]>([]);
  readonly selectedDevice = signal<DeviceInfo | null>(null);
  readonly dialogTitle = signal<string>('');
  readonly formMode = signal<FormMode>(FormMode.REGISTER);

  // Expose enum to template
  FormMode = FormMode;

  // Reactive form for device data
  readonly form = this.fb.group({
    DeviceId: this.fb.control<number | null>(null),
    DeviceTitle: this.fb.nonNullable.control('', ValidationSchema.title),
    DeviceLocation: this.fb.nonNullable.control(
      '',
      ValidationSchema.deviceLocation
    ),
    Active: this.fb.nonNullable.control(true, Validators.required),
  });

  // Table configuration
  readonly columns: TableColumn<DeviceInfoRow>[] = [
    { header: 'شناسه', field: 'DeviceId' },
    { header: 'عنوان دیوایس', field: 'DeviceTitle' },
    { header: 'محل دیوایس', field: 'DeviceLocation' },
    {
      header: 'وضعیت فعال/غیرفعال',
      field: 'Active',
      type: TableColumnType.BOOLEAN,
    },
    { field: 'edit', ...editCell.config, onAction: (row) => this.onEdit(row) },
    {
      field: 'delete',
      ...deleteCell.config,
      onAction: (row) => this.onDelete(row),
    },
  ];

  isDialogVisable = false;
  addonWidth = '7rem';

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadDevices();
  }

  //
  // LOAD DEVICES FROM SERVER
  //
  private async loadDevices() {
    await this.withLoading(async () => {
      const response = await this.configService.GetAllOfDevices();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        edit: editCell.value,
        delete: deleteCell.value,
      }));

      this.devices.set(rows);
    });
  }

  //
  // EDIT EXISTING DEVICE
  //
  async editDevice() {
    const selected = this.selectedDevice();
    if (this.loading() || !selected || this.form.invalid) return;

    const updated: DeviceInfo = {
      ...selected,
      ...(this.form.getRawValue() as DeviceInfo),
    };

    await this.withLoading(async () => {
      const response = await this.configService.EditDevice(
        this.serializeDevice(updated)
      );
      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });

    this.isDialogVisable = false;
    await this.loadDevices();
  }

  //
  // REGISTER NEW DEVICE
  //
  async registerDevice() {
    if (this.loading() || this.form.invalid) return;

    const newDevice: DeviceInfo = {
      ...(this.form.getRawValue() as DeviceInfo),
    };

    await this.withLoading(async () => {
      const response = await this.configService.RegisterDevice(
        this.serializeDevice(newDevice)
      );
      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });

    this.isDialogVisable = false;
    await this.loadDevices();
  }

  //
  // DELETE DEVICE
  //
  async onDelete(row: DeviceInfo) {
    if (this.loading()) return;

    this.confirmService.confirmDelete(
      `شناسه ${row.DeviceId} و عنوان دیوایس ${row.DeviceTitle}`,
      async () => {
        await this.withLoading(async () => {
          const response = await this.configService.DeleteDevice(
            this.serializeDevice(row)
          );
          if (!checkAndToastError(response, this.toast)) return;

          await this.loadDevices();
          this.toast.success('موفق', response.data.Message);
        });
      }
    );
  }

  //
  // HELPERS
  //

  // Serialize object to match expected API shape
  serializeDevice(obj: DeviceInfo): DeviceInfo {
    return {
      DeviceId: obj.DeviceId,
      DeviceTitle: obj.DeviceTitle,
      DeviceLocation: obj.DeviceLocation,
      Active: obj.Active,
    };
  }

  // Shortcut for strongly typed form controls
  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  // Enter edit mode
  onEdit(row: DeviceInfo) {
    this.selectedDevice.set(row);
    this.formMode.set(FormMode.EDITABLE);
    this.form.reset({ ...row });
    this.dialogTitle.set('ویرایش  دیوایس');
    this.isDialogVisable = true;
  }

  // Enter create mode
  onNew() {
    this.selectedDevice.set(null);
    this.formMode.set(FormMode.REGISTER);
    this.form.reset();
    this.dialogTitle.set('ثبت دیوایس');
    this.isDialogVisable = true;
  }

  // Submit depends on form mode
  async submitForm() {
    if (this.formMode() === FormMode.EDITABLE) await this.editDevice();
    else await this.registerDevice();
  }
}
