import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { SearchInputComponent } from '../../../shared/inputs/search-input/search-input.component';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';

import { checkAndToastError } from 'app/utils/api-utils';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';

import { AnnouncementSubGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-subgroup.model';
import { ValidationSchema } from 'app/constants/validation-schema';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';

enum FormMode {
  EDITABLE,
  REGISTER,
}

@Component({
  selector: 'app-announcement-sub-group-form',
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
  ],
  providers: [ConfirmationService],
  templateUrl: './announcement-sub-group-form.component.html',
  styleUrl: './announcement-sub-group-form.component.scss',
})
export class AnnouncementSubGroupFormComponent implements OnInit, OnDestroy {
  // 🔧 Injected Services
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );
  private readonly destroy$ = new Subject<void>();
  readonly tableUi = TableConfig;
  readonly appTitle = AppTitles;

  // 🌐 UI State
  loading = false;
  formDialogVisible = false;
  headerTitle = '';
  private announcementFormSubGroupMode = FormMode.REGISTER;

  // 📋 Data
  announcementsSubGroup: AnnouncementSubGroup[] = [];
  displayAnnouncementsSubGroup: AnnouncementSubGroup[] = [];
  readonly cols = ['کد', 'ویرایش', 'حذف', 'عنوان', 'فعال/غیرفعال'];

  // 📝 Form
  searchControl = new FormControl('');
  announcementSubGroupForm = this.fb.group({
    AnnouncementSGId: [-1, ValidationSchema.id],
    AnnouncementSGTitle: ['', ValidationSchema.title],
    Active: [true],
  });

  // 🔄 Lifecycle
  ngOnInit(): void {
    this.loadAnnouncementSubGroups();
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.loading = val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 🔍 Search
  handleSearch(filtered: AnnouncementSubGroup[]): void {
    this.displayAnnouncementsSubGroup = filtered;
  }

  filterAnnouncementsSubGroup = (
    item: AnnouncementSubGroup,
    query: string
  ): boolean => item.AnnouncementSGTitle?.includes(query) ?? false;

  // 🎯 Actions
  onNew(): void {
    this.headerTitle = 'افزودن زیرگروه';
    this.announcementFormSubGroupMode = FormMode.REGISTER;
    this.formDialogVisible = true;
  }

  onEdit(row: AnnouncementSubGroup): void {
    this.headerTitle = 'ویرایش زیرگروه';
    this.announcementFormSubGroupMode = FormMode.EDITABLE;
    this.populateForm(row);
    this.formDialogVisible = true;
  }

  onDelete(row: AnnouncementSubGroup): void {
    const title = `حذف رکورد ${row.AnnouncementSGId}`;
    const message = `آیا می‌خواهید رکورد با عنوان ${row.AnnouncementSGTitle} و کد ${row.AnnouncementSGId} حذف شود؟`;

    this.confirmationService.confirm({
      header: title,
      message,
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'لغو',
        severity: 'secondary',
        outlined: true,
      },
      acceptLabel: 'تایید',
      rejectLabel: 'لغو',
      acceptButtonProps: {
        label: 'تایید',
        severity: 'danger',
      },
      accept: async () => {
        this.loadingService.setLoading(true);
        try {
          await this.deleteAnnouncementSubGroup(row.AnnouncementSGId);
          await this.loadAnnouncementSubGroups();
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  async registerOrEdit(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      this.announcementFormSubGroupMode === FormMode.REGISTER
        ? await this.registerAnnouncementSubGroup()
        : await this.editAnnouncementSubGroup();

      await this.loadAnnouncementSubGroups();
      this.closeForm();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  isFormEditable(): boolean {
    return this.announcementFormSubGroupMode === FormMode.EDITABLE;
  }

  // 🧠 Helpers
  private async loadAnnouncementSubGroups(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      const response =
        await this.announcementService.GetAnnouncementSupGroups('');
      if (!checkAndToastError(response, this.toast)) return;
      this.announcementsSubGroup = this.displayAnnouncementsSubGroup =
        response.data;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private async deleteAnnouncementSubGroup(id: number): Promise<void> {
    const response =
      await this.announcementService.DeleteAnnouncementSubGroup(id);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private async registerAnnouncementSubGroup(): Promise<void> {
    const { AnnouncementSGTitle, Active } = this.extractFormData();
    const response =
      await this.announcementService.RegisterNewAnnouncementSubGroup(
        AnnouncementSGTitle ?? '',
        Active ?? true
      );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private async editAnnouncementSubGroup(): Promise<void> {
    const { AnnouncementSGId, AnnouncementSGTitle, Active } =
      this.extractFormData();
    const response = await this.announcementService.EditAnnouncementSubGroup(
      AnnouncementSGId,
      AnnouncementSGTitle ?? '',
      Active ?? true
    );
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message ?? '');
  }

  private extractFormData(): AnnouncementSubGroup {
    return this.announcementSubGroupForm.getRawValue() as AnnouncementSubGroup;
  }

  private populateForm(subGroup: AnnouncementSubGroup): void {
    this.announcementSubGroupForm.patchValue({ ...subGroup });
  }

  private resetForm(): void {
    this.announcementSubGroupForm.reset({
      AnnouncementSGId: -1,
      AnnouncementSGTitle: '',
      Active: true,
    });
  }

  closeForm(): void {
    this.formDialogVisible = false;
    this.resetForm();
  }

  // 📥 Form Getters
  get AnnouncementSGId(): FormControl {
    return this.announcementSubGroupForm.get('AnnouncementSGId') as FormControl;
  }

  get AnnouncementSGTitle(): FormControl {
    return this.announcementSubGroupForm.get(
      'AnnouncementSGTitle'
    ) as FormControl;
  }

  get AnnouncementActive(): FormControl {
    return this.announcementSubGroupForm.get('Active') as FormControl;
  }
}
