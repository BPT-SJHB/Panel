import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import {
  TableComponent,
  TableColumn,
  editCell,
} from 'app/components/shared/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { BaseLoading } from '../shared/component-base/base-loading';
import { ConfigManagementService } from 'app/services/config-management/config-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import { GeneralConfig } from 'app/services/config-management/model/general-config.model';

type GeneralConfigRow = GeneralConfig & { edit: string };

// ------------------ COMPONENT ------------------

@Component({
  selector: 'app-general-configuration-form',
  imports: [TableComponent, ButtonComponent, DialogModule, TextInputComponent],
  templateUrl: './general-configuration-form.component.html',
  styleUrl: './general-configuration-form.component.scss',
})
export class GeneralConfigurationFormComponent extends BaseLoading {
  private readonly configService = inject(ConfigManagementService);
  private readonly fb = inject(FormBuilder);
  readonly configs = signal<GeneralConfigRow[]>([]);
  readonly selectedConfig = signal<GeneralConfig | null>(null);

  readonly form = this.fb.group({
    CId: this.fb.control<number | null>(null, ValidationSchema.id),
    CTitle: this.fb.nonNullable.control('', ValidationSchema.title),
    CIndexTitle: this.fb.nonNullable.control('', ValidationSchema.title),
    CValue: this.fb.nonNullable.control('', Validators.required),
  });

  readonly columns: TableColumn<GeneralConfigRow>[] = [
    { header: 'شناسه', field: 'CId' },
    { header: 'عنوان اصلی', field: 'CTitle' },
    { header: 'عنوان فرعی', field: 'CIndexTitle' },
    { header: 'مقدار', field: 'CValue', dir: 'ltr' },
    { header: 'توضیحات', field: 'Description' },
    { field: 'edit', ...editCell.config, onAction: (row) => this.onEdit(row) },
  ];

  isDialogVisable = false;
  addonWidth = '6rem';

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadAllConfig();
  }

  // ------------------ LOAD DATA ------------------

  private async loadAllConfig() {
    await this.withLoading(async () => {
      const response = await this.configService.GetAllOfGeneralConfig();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        edit: editCell.value,
      }));

      this.configs.set(rows);
    });
  }

  // ------------------ EDIT ------------------

  async editConfig() {
    const selectedConfig = this.selectedConfig();
    if (this.loading() || !selectedConfig || this.form.invalid) return;

    const config = {
      ...selectedConfig,
      ...(this.form.getRawValue() as GeneralConfig),
    };
    await this.withLoading(async () => {
      // TODO: call real API
      const response = await this.configService.EditGeneralConfig(
        this.serializeGeneralConfig(config)
      );

      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });

    this.isDialogVisable = false;
    await this.loadAllConfig();
  }

  // ------------------ UTILITIES ------------------

  serializeGeneralConfig(obj: GeneralConfig): GeneralConfig {
    return {
      CId: Number(obj.CId),
      CTitle: String(obj.CTitle),
      CName: String(obj.CName),
      CIndex: Number(obj.CIndex),
      CIndexTitle: String(obj.CIndexTitle),
      CValue: String(obj.CValue),
      Description: String(obj.Description),
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onEdit(row: GeneralConfig) {
    this.selectedConfig.set(row);
    this.form.reset({ ...row });
    this.isDialogVisable = true;
  }
}
