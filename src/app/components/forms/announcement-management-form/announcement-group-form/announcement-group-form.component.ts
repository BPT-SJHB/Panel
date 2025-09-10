import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';

import { ValidationSchema } from 'app/constants/validation-schema';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { AnnouncementGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-group.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { AppTitles } from 'app/constants/Titles';

enum FormMode {
  EDITABLE,
  REGISTER,
}

type AnnouncementGroupTableRow = AnnouncementGroup & {
  edit: string;
  delete: string;
};

@Component({
  selector: 'app-announcement-group-form',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    NgClass,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    SearchInputComponent,
    TextInputComponent,
    ToggleSwitchInputComponent,
    ButtonComponent,
    TableComponent,
  ],
  providers: [],
  templateUrl: './announcement-group-form.component.html',
  styleUrl: './announcement-group-form.component.scss',
})
export class AnnouncementGroupFormComponent implements OnInit, OnDestroy {
  // ========== 🧩 Dependencies ==========
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );

  private readonly destroy$ = new Subject<void>();
  readonly appTitle = AppTitles;

  // ========== 🧠 State ==========
  loading = false;
  formDialogVisible = false;
  headerTitle = '';
  announcementFormGroupMode = FormMode.REGISTER;
  tableUi = TableConfig;

  announcementsGroup: AnnouncementGroupTableRow[] = [];
  displayAnnouncementsGroup: AnnouncementGroupTableRow[] = [];

  readonly columns: TableColumn<AnnouncementGroupTableRow>[] = [
    {
      field: 'AnnouncementId',
      header: 'شناسه',
    },
    {
      field: 'AnnouncementTitle',
      header: 'عنوان',
    },
    {
      field: 'Active',
      header: 'فعال/غیرفعال',
      type: TableColumnType.BOOLEAN,
    },
    {
      ...editCell.config,
      field: 'edit',
      onAction: (row: AnnouncementGroup) => this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: (row: AnnouncementGroup) => this.onDelete(row),
    },
  ];

  // ========== 🧾 Form ==========
  searchAnnouncementTitle = new FormControl('');
  announcementGroupForm = this.fb.group({
    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: ['', ValidationSchema.title],
    Active: [true],
  });

  // ========== ♻️ Lifecycle ==========
  ngOnInit(): void {
    this.loadAnnouncementGroups();

    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.loading = val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========== 🔍 Search ==========
  handleSearch(filtered: AnnouncementGroupTableRow[]): void {
    this.displayAnnouncementsGroup = filtered;
  }

  filterAnnouncementsGroup = (
    item: AnnouncementGroup,
    query: string
  ): boolean => item.AnnouncementTitle?.includes(query) ?? false;

  // ========== 🎯 Actions ==========
  onNew(): void {
    this.headerTitle = 'افزودن گروه اعلام بار';
    this.announcementFormGroupMode = FormMode.REGISTER;
    this.formDialogVisible = true;
  }

  onEdit(row: AnnouncementGroup): void {
    this.headerTitle = 'ویرایش گروه اعلام بار';
    this.announcementFormGroupMode = FormMode.EDITABLE;
    this.populateFormAnnouncementGroup(row);
    this.formDialogVisible = true;
  }

  onDelete(row: AnnouncementGroup): void {
    this.confirmService.confirmDelete(
      `${row.AnnouncementTitle} با شناسه ${row.AnnouncementId}`,
      async () => {
        this.loadingService.setLoading(true);
        try {
          await this.deleteAnnouncementGroup(row.AnnouncementId);
          await this.loadAnnouncementGroups();
        } finally {
          this.loadingService.setLoading(false);
        }
      }
    );
  }

  async registerOrEdit(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      if (this.isFormEditable()) {
        await this.editAnnouncementGroup();
      } else {
        await this.registerAnnouncementGroup();
      }
      await this.loadAnnouncementGroups();
      this.closeAnnouncementFormGroup();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  isFormEditable(): boolean {
    return this.announcementFormGroupMode === FormMode.EDITABLE;
  }

  closeAnnouncementFormGroup(): void {
    this.formDialogVisible = false;
    this.resetAnnouncementFormGroup();
  }

  // ========== 🛠️ Helpers ==========
  private async loadAnnouncementGroups(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      const response = await this.announcementService.GetAnnouncementGroups('');
      if (!checkAndToastError(response, this.toast)) return;
      const rows = response.data.map((a) => ({
        ...a,
        edit: editCell.value,
        delete: deleteCell.value,
      }));
      this.announcementsGroup = rows;
      this.displayAnnouncementsGroup = [...rows];
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async deleteAnnouncementGroup(id: number): Promise<void> {
    const response = await this.announcementService.DeleteAnnouncementGroup(id);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private async registerAnnouncementGroup(): Promise<void> {
    const { AnnouncementTitle } = this.extractAnnouncementGroup();
    const response =
      await this.announcementService.RegisterNewAnnouncementGroup(
        AnnouncementTitle ?? ''
      );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private async editAnnouncementGroup(): Promise<void> {
    const { AnnouncementId, AnnouncementTitle, Active } =
      this.extractAnnouncementGroup();
    const response = await this.announcementService.EditAnnouncementGroup(
      AnnouncementId,
      AnnouncementTitle ?? '',
      Active ?? true
    );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private populateFormAnnouncementGroup(data: AnnouncementGroup): void {
    this.announcementGroupForm.patchValue({ ...data });
  }

  private extractAnnouncementGroup(): AnnouncementGroup {
    return this.announcementGroupForm.getRawValue() as AnnouncementGroup;
  }

  private resetAnnouncementFormGroup(): void {
    this.announcementGroupForm.reset({
      AnnouncementId: null,
      AnnouncementTitle: '',
      Active: true,
    });
  }

  // ========== 🧪 Form Getters ==========
  get AnnouncementId(): FormControl {
    return this.announcementGroupForm.get('AnnouncementId') as FormControl;
  }

  get AnnouncementTitle(): FormControl {
    return this.announcementGroupForm.get('AnnouncementTitle') as FormControl;
  }

  get AnnouncementActive(): FormControl {
    return this.announcementGroupForm.get('Active') as FormControl;
  }
}
