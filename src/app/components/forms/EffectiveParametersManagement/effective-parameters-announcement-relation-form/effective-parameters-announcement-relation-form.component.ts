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
import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';

// ------------------ INTERFACE ------------------
export interface TPTParamsDetail {
  TPTPDId: number;
  TPTPId: number;
  TPTPTitle: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  Mblgh: number;
  Active: boolean;
}

type TPTParamsDetailRow = TPTParamsDetail & { edit: string; delete: string };

enum FormMode {
  EDITABLE,
  REGISTER,
}

// ------------------ MOCK DATA ------------------
export const mockTPTParamsDetail: TPTParamsDetail[] = [
  {
    TPTPDId: 157,
    TPTPId: 8,
    TPTPTitle: 'پروژه',
    AnnouncementId: 2,
    AnnouncementTitle: 'تريلي برون شهري ذوب و سبا',
    AnnouncementSGId: 7,
    AnnouncementSGTitle: 'برون شهری آهن آلات ذوبی',
    Mblgh: 7000000,
    Active: true,
  },
  {
    TPTPDId: 163,
    TPTPId: 11,
    TPTPTitle: 'تیرآهن نرمال',
    AnnouncementId: 2,
    AnnouncementTitle: 'تريلي برون شهري ذوب و سبا',
    AnnouncementSGId: 7,
    AnnouncementSGTitle: 'برون شهری آهن آلات ذوبی',
    Mblgh: 7000000,
    Active: true,
  },
  {
    TPTPDId: 143,
    TPTPId: 3,
    TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
    AnnouncementId: 2,
    AnnouncementTitle: 'تريلي برون شهري ذوب و سبا',
    AnnouncementSGId: 7,
    AnnouncementSGTitle: 'برون شهری آهن آلات ذوبی',
    Mblgh: 14000000,
    Active: true,
  },
  {
    TPTPDId: 135,
    TPTPId: 1,
    TPTPTitle: 'دو باسکوله (ذوب آهنی)',
    AnnouncementId: 2,
    AnnouncementTitle: 'تريلي برون شهري ذوب و سبا',
    AnnouncementSGId: 7,
    AnnouncementSGTitle: 'برون شهری آهن آلات ذوبی',
    Mblgh: 6000000,
    Active: true,
  },
  {
    TPTPDId: 297,
    TPTPId: 1,
    TPTPTitle: 'دو باسکوله (ذوب آهنی)',
    AnnouncementId: 4,
    AnnouncementTitle: 'شمش برون شهري',
    AnnouncementSGId: 17,
    AnnouncementSGTitle: 'شمش کوهپايه برون شهري',
    Mblgh: 8000000,
    Active: true,
  },
  {
    TPTPDId: 217,
    TPTPId: 20,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 50%)',
    AnnouncementId: 2,
    AnnouncementTitle: 'تريلي برون شهري ذوب و سبا',
    AnnouncementSGId: 7,
    AnnouncementSGTitle: 'برون شهری آهن آلات ذوبی',
    Mblgh: 19000000,
    Active: true,
  },
];

@Component({
  selector: 'app-effective-parameters-announcement-relation-form',
  imports: [
    TableComponent,
    SearchAutoCompleteFactoryComponent,
    TextInputComponent,
    Dialog,
    ButtonComponent,
    ToggleSwitchInputComponent,
  ],
  templateUrl:
    './effective-parameters-announcement-relation-form.component.html',
  styleUrl: './effective-parameters-announcement-relation-form.component.scss',
})
export class EffectiveParametersAnnouncementRelationFormComponent extends BaseLoading {
  // ------------------ INJECTED SERVICES ------------------
  private readonly transportCompanyService = inject(
    TransportCompaniesManagementService
  );
  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  // ------------------ SIGNALS & STATE ------------------
  readonly tptParamsDetail = signal<TPTParamsDetailRow[]>([]);
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

    Mblgh: this.fb.control<number>(0, [Validators.min(1), Validators.required]),
    Active: this.fb.control<boolean>(true),
  });

  // ------------------ TABLE CONFIG ------------------
  readonly columns: TableColumn<TPTParamsDetailRow>[] = [
    { header: 'شناسه', field: 'TPTPDId' },
    { header: 'پارامتر موثر', field: 'TPTPTitle' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'مبلغ', field: 'Mblgh', format: 'currency' },
    { header: 'فعال/غیرفعال', field: 'Active', type: TableColumnType.BOOLEAN },
    { field: 'edit', ...editCell.config, onAction: (row) => this.onEdit(row) },
    {
      field: 'delete',
      ...deleteCell.config,
      onAction: (row) => this.onDelete(row),
    },
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
      const response = { success: true, data: mockTPTParamsDetail };
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
  private async onDelete(row: TPTParamsDetail) {
    this.confirmService.confirmDelete(
      `پارامترهای موثر - گروه و زیرگروه اعلام بار با شناسه ${row.TPTPDId}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeTPTParamsDetails(row);
        console.log({ deletePayload });

        await this.withLoading(async () => {
          const res = { success: true, data: mockShortResponse };
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadTPTParamsDetail();
      }
    );
  }

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
    const editPayload = this.serializeTPTParamsDetails({
      ...this.form.getRawValue(),
    } as TPTParamsDetailRow);

    console.log({ editPayload });

    const res = { success: true, data: mockShortResponse };
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
  }

  private async submitRegister() {
    await this.withLoading(async () => {
      const registerPayload = this.serializeTPTParamsDetails({
        ...this.form.getRawValue(),
      } as TPTParamsDetailRow);

      console.log({ registerPayload });

      const res = { success: true, data: mockShortResponse };
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });
  }

  // ------------------ UTILITIES ------------------
  serializeTPTParamsDetails(obj: TPTParamsDetail): TPTParamsDetail {
    return {
      TPTPDId: Number(obj.TPTPDId),
      TPTPId: Number(obj.TPTPId),
      TPTPTitle: obj.TPTPTitle,
      AnnouncementId: Number(obj.AnnouncementId),
      AnnouncementTitle: obj.AnnouncementTitle,
      AnnouncementSGId: Number(obj.AnnouncementSGId),
      AnnouncementSGTitle: obj.AnnouncementSGTitle,
      Mblgh: Number(obj.Mblgh),
      Active: obj.Active,
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset({ Active: true });
    this.formMode.set(FormMode.REGISTER);
    this.dialogTitle.set('ثبت پارامترهای موثر - گروه و زیرگروه اعلام بار');
    this.isDialogVisible = true;
  }

  onEdit(row: TPTParamsDetailRow) {
    this.form.reset({ Active: true });
    this.form.patchValue({ ...row });
    this.formMode.set(FormMode.EDITABLE);
    this.dialogTitle.set('ویرایش  پارامترهای موثر - گروه و زیرگروه اعلام بار');
    this.isDialogVisible = true;
  }
}
