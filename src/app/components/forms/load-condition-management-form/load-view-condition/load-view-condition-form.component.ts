import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { FormBuilder, FormControl } from '@angular/forms';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { checkAndToastError } from 'app/utils/api-utils';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
  BaseAutoCompleteFilter,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Dialog } from 'primeng/dialog';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ConfigManagementService } from 'app/services/config-management/config-management.service';
import { LoadViewConditionInfo } from 'app/services/config-management/model/load-view-condition-info.model';

/* ---------------------------------- ENUMS ---------------------------------- */
enum FormMode {
  EDITABLE,
  REGISTER,
}

export enum LoadCondition {
  VIEW,
  SELECT,
}

/* ----------------------------- INTERFACES ---------------------------------- */
type LoadViewConditionRow = LoadViewConditionInfo & {
  delete: string;
  edit: string;
};

/* ---------------------------------- MOCKS ---------------------------------- */
export const mockTurnStatus = [
  {
    TurnStatusId: 1,
    TurnStatusTitle: 'صادر شده',
  },
  {
    TurnStatusId: 2,
    TurnStatusTitle: 'باطل شده - کاربر',
  },
  {
    TurnStatusId: 3,
    TurnStatusTitle: 'باطل شده - زیر اعتبار',
  },
  {
    TurnStatusId: 4,
    TurnStatusTitle: 'باطل شده - سیستم',
  },
  {
    TurnStatusId: 5,
    TurnStatusTitle: 'باطل شده - کنسلی مجوز بارگیری',
  },
  {
    TurnStatusId: 6,
    TurnStatusTitle: 'مجوز صادر شده',
  },
  {
    TurnStatusId: 7,
    TurnStatusTitle: 'تخصیص صادر شده',
  },
  {
    TurnStatusId: 8,
    TurnStatusTitle: 'احیاشده - کنسلی مجوز بارگیری',
  },
  {
    TurnStatusId: 9,
    TurnStatusTitle: 'احیاشده - کنسلی تخصیص بار',
  },
  {
    TurnStatusId: 10,
    TurnStatusTitle: 'احیاشده - کاربر',
  },
  {
    TurnStatusId: 11,
    TurnStatusTitle: 'باطل شده - پایان زمان اعتبار',
  },
];

/* -------------------------------- COMPONENT -------------------------------- */
@Component({
  selector: 'app-load-view-condition-form',
  templateUrl: './load-view-condition-form.component.html',
  styleUrl: './load-view-condition-form.component.scss',
  imports: [
    TableComponent,
    SearchAutoCompleteFactoryComponent,
    ButtonComponent,
    Dialog,
    TextInputComponent,
  ],
})
export class LoadViewConditionFormComponent extends BaseLoading {
  /* -------------------------- INJECTED SERVICES -------------------------- */
  private readonly configService = inject(ConfigManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );

  /* ---------------------------- STATE & SIGNALS --------------------------- */
  readonly loadsViews = signal<LoadViewConditionRow[]>([]);
  readonly dialogTitle = signal<string>('');
  readonly formMode = signal<FormMode>(FormMode.REGISTER);
  readonly selectedLoadView = signal<LoadViewConditionInfo | null>(null);

  isDialogVisible = false;
  addonWidth = '7rem';
  FormModel = FormMode;

  /* ---------------------------------- FORM ---------------------------------- */
  readonly form = this.fb.group({
    LoadViewConditionId: this.fb.control<number | null>(null),

    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: this.fb.nonNullable.control(''),

    AnnouncementSGId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementSGTitle: this.fb.nonNullable.control(''),

    SequentialTurnId: this.fb.control<number | null>(null, ValidationSchema.id),
    SequentialTurnTitle: this.fb.nonNullable.control(''),

    TruckNativenessTypeId: this.fb.control<number | null>(
      null,
      ValidationSchema.id
    ),
    TruckNativenessTypeTitle: this.fb.nonNullable.control(''),

    LoadStatusId: this.fb.control<number | null>(null, ValidationSchema.id),
    LoadStatusTitle: this.fb.nonNullable.control('', ValidationSchema.title),

    RequesterId: this.fb.control<number | null>(null, ValidationSchema.id),
    RequesterTitle: this.fb.nonNullable.control(''),
  });

  /* ------------------------------- TABLE CONFIG ------------------------------ */
  readonly columns: TableColumn<LoadViewConditionRow>[] = [
    { header: 'شناسه', field: 'LoadViewConditionId' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیر گروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'صف نوبت', field: 'SequentialTurnTitle' },
    { header: 'وضعیت بار', field: 'LoadStatusTitle' },
    { header: 'محل درخواست', field: 'RequesterTitle' },
    { header: 'بومی / غیربومی', field: 'TruckNativenessTypeTitle' },
    {
      ...editCell.config,
      field: 'edit',
      onAction: (row: LoadViewConditionInfo) => this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: (row: LoadViewConditionInfo) => this.onDelete(row),
    },
  ];

  // ---------------------------- AUTOCOMPLETE CONFIGS --------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly autoCompleteInputs: BaseAutoCompleteFilter<any>[] = [
    this.autoCompleteFactory.create(
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
    ),

    this.autoCompleteFactory.create(
      AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
      this.ctrl('AnnouncementSGId'),
      {
        groupControlId: this.ctrl('AnnouncementId'),
        control: this.ctrl('AnnouncementSGTitle'),
        readOnly: () => this.ctrl('AnnouncementId').invalid,
      }
    ),

    this.autoCompleteFactory.create(
      AutoCompleteType.SequentialTurn,
      this.ctrl('SequentialTurnId'),
      { control: this.ctrl('SequentialTurnTitle') }
    ),

    this.autoCompleteFactory.create(
      AutoCompleteType.LoadStatus,
      this.ctrl('LoadStatusId'),
      { control: this.ctrl('LoadStatusTitle') }
    ),

    this.autoCompleteFactory.create(
      AutoCompleteType.RequesterInfo,
      this.ctrl('RequesterId'),
      { control: this.ctrl('RequesterTitle') }
    ),

    this.autoCompleteFactory.create(
      AutoCompleteType.NativenessType,
      this.ctrl('TruckNativenessTypeId'),
      { control: this.ctrl('TruckNativenessTypeTitle') }
    ),
  ];

  /* -------------------------------- LIFECYCLE -------------------------------- */
  onViewActivated(): void {
    this.loadLoadsViews();
  }

  /* ---------------------------------- LOAD DATA ---------------------------------- */
  private async loadLoadsViews() {
    await this.withLoading(async () => {
      const response = await this.configService.GetAllOfLoadViewConditions();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        delete: deleteCell.value,
        edit: editCell.value,
      }));

      this.loadsViews.set(rows);
    });
  }

  /* -------------------------------- CRUD ACTIONS -------------------------------- */
  private async onDelete(row: LoadViewConditionInfo) {
    this.confirmService.confirmDelete(
      `شرایط مشاهده بار با شناسه ${row.LoadViewConditionId}`,
      async () => {
        if (this.loading()) return;

        await this.withLoading(async () => {
          const res = await this.configService.DeleteLoadViewCondition({
            LoadViewConditionId: Number(row.LoadViewConditionId),
          });

          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadLoadsViews();
      }
    );
  }

  async save() {
    if (this.form.invalid || this.loading()) return;

    await this.withLoading(async () => {
      if (this.formMode() === FormMode.EDITABLE) await this.submitEdit();
      else await this.submitRegister();
    });

    await this.loadLoadsViews();
    this.isDialogVisible = false;
  }

  private async submitEdit() {
    const selectedLoadAllocations = this.selectedLoadView();
    if (!selectedLoadAllocations) return;

    const payload = this.serializeLoadAllocations({
      ...selectedLoadAllocations,
      ...(this.form.getRawValue() as LoadViewConditionInfo),
    });

    const res = await this.configService.EditLoadViewCondition(payload);
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitRegister() {
    const registerPayload = this.serializeLoadAllocations(
      this.form.getRawValue() as LoadViewConditionInfo
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { LoadViewConditionId: _, ...payload } = registerPayload;

    const res = await this.configService.RegisterLoadViewCondition(payload);
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  /* ---------------------------------- UTILITIES ---------------------------------- */
  serializeLoadAllocations(obj: LoadViewConditionInfo): LoadViewConditionInfo {
    return {
      LoadViewConditionId: Number(obj.LoadViewConditionId),
      AnnouncementId: Number(obj.AnnouncementId),
      AnnouncementTitle: obj.AnnouncementTitle?.trim() ?? '',
      AnnouncementSGId: Number(obj.AnnouncementSGId),
      AnnouncementSGTitle: obj.AnnouncementSGTitle?.trim() ?? '',
      SequentialTurnId: Number(obj.SequentialTurnId),
      SequentialTurnTitle: obj.SequentialTurnTitle?.trim() ?? '',
      TruckNativenessTypeId: Number(obj.TruckNativenessTypeId),
      TruckNativenessTypeTitle: obj.TruckNativenessTypeTitle?.trim() ?? '',
      LoadStatusId: Number(obj.LoadStatusId),
      LoadStatusTitle: obj.LoadStatusTitle?.trim() ?? '',
      RequesterId: Number(obj.RequesterId),
      RequesterTitle: obj.RequesterTitle?.trim() ?? '',
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  /* ---------------------------------- DIALOG ACTIONS ---------------------------------- */
  onNew() {
    this.form.reset();
    this.formMode.set(FormMode.REGISTER);
    this.selectedLoadView.set(null);
    this.isDialogVisible = true;
    const title = 'ثبت شرایط مشاهده بار';
    this.dialogTitle.set(title);
  }

  onEdit(row: LoadViewConditionInfo) {
    this.form.reset();
    this.form.patchValue({ ...row });
    this.formMode.set(FormMode.EDITABLE);
    this.selectedLoadView.set(row);
    this.isDialogVisible = true;
    const title = 'ویرایش شرایط مشاهده بار';

    this.dialogTitle.set(title);
  }
}
