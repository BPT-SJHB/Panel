import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { Dialog } from 'primeng/dialog';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { TPTParamRelationToAnnouncementGroupAndSubGroup } from 'app/services/tpt-params-management/model/tptparam-info.model';
import { TPTParamsManagementService } from 'app/services/tpt-params-management/tptparams-management.service';
import { deepNullToUndefined } from 'app/utils/null-to-undefined';

// ------------------ INTERFACE ------------------
type TPTParamsDetailRow = TPTParamRelationToAnnouncementGroupAndSubGroup & {
  edit: string;
  delete: string;
};

enum FormMode {
  EDITABLE,
  REGISTER,
}

@Component({
  selector: 'app-tpt-parameters-announcement-relation-form',
  imports: [
    TableComponent,
    SearchAutoCompleteFactoryComponent,
    TextInputComponent,
    Dialog,
    ButtonComponent,
    ToggleSwitchInputComponent,
  ],
  templateUrl: './tpt-parameters-announcement-relation-form.component.html',
  styleUrl: './tpt-parameters-announcement-relation-form.component.scss',
})
export class TPTParametersAnnouncementRelationFormComponent extends BaseLoading {
  // ------------------ INJECTED SERVICES ------------------
  private readonly tptParamsService = inject(TPTParamsManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  // ------------------ SIGNALS & STATE ------------------
  readonly tptParamsDetail = signal<TPTParamsDetailRow[]>([]);
  readonly selectedTPTParams =
    signal<TPTParamRelationToAnnouncementGroupAndSubGroup | null>(null);
  readonly dialogTitle = signal<string>('');
  readonly formMode = signal<FormMode>(FormMode.REGISTER);
  isDialogVisible = false;
  addonWidth = '6rem';
  FormModel = FormMode;

  // ------------------ FORM ------------------
  readonly form = this.fb.group({
    TPTPId: this.fb.control<number | null>(null, ValidationSchema.id),
    TPTPTitle: this.fb.nonNullable.control('', ValidationSchema.title),

    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: this.fb.nonNullable.control<string>(''),

    AnnouncementSGId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementSGTitle: this.fb.control<string>(''),

    Cost: this.fb.control<number>(0, [Validators.min(1), Validators.required]),
    Active: this.fb.control<boolean>(true),
  });

  // ------------------ TABLE CONFIG ------------------
  readonly columns: TableColumn<TPTParamsDetailRow>[] = [
    { header: 'شناسه', field: 'TPTPDId' },
    { header: 'پارامتر موثر', field: 'TPTPTitle' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'مبلغ', field: 'Cost', format: 'currency' },
    { header: 'فعال/غیرفعال', field: 'Active', type: TableColumnType.BOOLEAN },
    { field: 'edit', ...editCell.config, onAction: (row) => this.onEdit(row) },
  ];

  // AUTOCOMPLETE CONFIGS --------------------------------------------
  readonly TPTParamsInput = this.autoCompleteFactory.create(
    AutoCompleteType.TPTParams,
    this.ctrl('TPTPId'),
    { control: this.ctrl('TPTPTitle') }
  );

  readonly announcementInput = this.autoCompleteFactory.create(
    AutoCompleteType.AnnouncementGroup,
    this.ctrl('AnnouncementId'),
    {
      control: this.ctrl('AnnouncementTitle'),
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
      readOnly: () => this.ctrl('AnnouncementId').invalid,
    }
  );

  // ------------------ LIFECYCLE HOOK ------------------
  onViewActivated(): void {
    this.loadTPTParamsDetail();
  }

  // ------------------ DATA METHODS ------------------
  private async loadTPTParamsDetail() {
    await this.withLoading(async () => {
      const response =
        await this.tptParamsService.GetAllRelationsToAnnouncementGroupAndSubGroup();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        delete: deleteCell.value,
        edit: editCell.value,
      }));
      this.tptParamsDetail.set(rows);
    });
  }

  // ------------------ CRUD ACTIONS ------------------

  async save() {
    if (this.form.invalid || this.loading()) return;

    await this.withLoading(async () => {
      if (this.formMode() === FormMode.EDITABLE) await this.submitEdit();
      else await this.submitRegister();
    });

    await this.loadTPTParamsDetail();
    this.isDialogVisible = false;
  }

  private async submitEdit() {
    const selectedTPTParams = this.selectedTPTParams();
    if (!selectedTPTParams) return;

    const editPayload = this.serializeTPTParamsDetails({
      ...selectedTPTParams,
      ...this.form.getRawValue(),
    } as TPTParamRelationToAnnouncementGroupAndSubGroup);

    const res =
      await this.tptParamsService.EditTPTParamRelationToAnnouncementGroupAndSubGroup(
        editPayload
      );
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitRegister() {
    await this.withLoading(async () => {
      const registerPayload = this.serializeTPTParamsDetails({
        ...this.form.getRawValue(),
      } as TPTParamRelationToAnnouncementGroupAndSubGroup);

      const res =
        await this.tptParamsService.RegisterTPTParamRelationToAnnouncementGroupAndSubGroup(
          deepNullToUndefined(registerPayload)
        );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  // ------------------ UTILITIES ------------------
  serializeTPTParamsDetails(
    obj: TPTParamRelationToAnnouncementGroupAndSubGroup
  ): TPTParamRelationToAnnouncementGroupAndSubGroup {
    return {
      TPTPDId: Number(obj.TPTPDId),
      TPTPId: Number(obj.TPTPId),
      TPTPTitle: obj.TPTPTitle,
      AnnouncementId: Number(obj.AnnouncementId),
      AnnouncementTitle: obj.AnnouncementTitle,
      AnnouncementSGId: Number(obj.AnnouncementSGId),
      AnnouncementSGTitle: obj.AnnouncementSGTitle,
      Cost: Number(obj.Cost),
      Active: obj.Active,
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset({ Active: true });
    this.formMode.set(FormMode.REGISTER);
    this.selectedTPTParams.set(null);
    this.dialogTitle.set('ثبت پارامترهای موثر - گروه و زیرگروه اعلام بار');
    this.isDialogVisible = true;
  }

  onEdit(row: TPTParamsDetailRow) {
    this.form.reset({ Active: true });
    this.form.patchValue({ ...row });
    this.formMode.set(FormMode.EDITABLE);
    this.selectedTPTParams.set(row);
    this.dialogTitle.set('ویرایش  پارامترهای موثر - گروه و زیرگروه اعلام بار');
    this.isDialogVisible = true;
  }
}
