import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
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
import { AppTitles } from 'app/constants/Titles';

enum FormMode {
  EDITABLE,
  REGISTER,
}

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
  ],
  providers: [ConfirmationService],
  templateUrl: './announcement-group-form.component.html',
  styleUrl: './announcement-group-form.component.scss',
})
export class AnnouncementGroupFormComponent implements OnInit, OnDestroy {
  // ========== 🧩 Dependencies ==========
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly confirmationService = inject(ConfirmationService);
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

  announcementsGroup: AnnouncementGroup[] = [];
  displayAnnouncementsGroup: AnnouncementGroup[] = [];

  readonly cols = ['کد', 'ویرایش', 'حذف', 'عنوان', 'فعال/غیرفعال'];

  // ========== 🧾 Form ==========
  searchAnnouncementTitle = new FormControl('');
  announcementGroupForm = this.fb.group({
    AnnouncementId: [-1, ValidationSchema.id],
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
  handleSearch(filtered: AnnouncementGroup[]): void {
    this.displayAnnouncementsGroup = filtered;
  }

  filterAnnouncementsGroup = (
    item: AnnouncementGroup,
    query: string
  ): boolean => item.AnnouncementTitle?.includes(query) ?? false;

  // ========== 🎯 Actions ==========
  onNew(): void {
    this.headerTitle = 'افزودن گروه';
    this.announcementFormGroupMode = FormMode.REGISTER;
    this.formDialogVisible = true;
  }

  onEdit(row: AnnouncementGroup): void {
    this.headerTitle = 'ویرایش گروه';
    this.announcementFormGroupMode = FormMode.EDITABLE;
    this.populateFormAnnouncementGroup(row);
    this.formDialogVisible = true;
  }

  onDelete(row: AnnouncementGroup): void {
    this.confirmationService.confirm({
      header: `حذف رکورد ${row.AnnouncementId}`,
      message: `آیا می‌خواهید رکورد با عنوان ${row.AnnouncementTitle} و کد ${row.AnnouncementId} حذف شود؟`,
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
          await this.deleteAnnouncementGroup(row.AnnouncementId);
          await this.loadAnnouncementGroups();
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  async registerOrEdit(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      this.announcementFormGroupMode === FormMode.REGISTER
        ? await this.registerAnnouncementGroup()
        : await this.editAnnouncementGroup();
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
      this.announcementsGroup = response.data;
      this.displayAnnouncementsGroup = response.data;
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
      AnnouncementId: -1,
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
