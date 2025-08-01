import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { TableConfig } from 'app/constants/ui/table.ui';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement_group_subgroup_management/announcement-group-subgroup-management.service';
import { AnnouncementGroup } from 'app/services/announcement_group_subgroup_management/model/announcement-group.model';
import { AnnouncementSubGroup } from 'app/services/announcement_group_subgroup_management/model/announcement-subgroup.model';
import { RelationOfAnnouncementGroupAndSubGroup } from 'app/services/announcement_group_subgroup_management/model/relation-of-announcement-group-subgroup.model';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from "app/components/shared/button/button.component";

// 📦 Interface for displaying flat relation data in table
interface RowRelationOfAnnouncement {
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
}

@Component({
  selector: 'app-relation-of-announcement-group-and-sub-group',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SearchAutoCompleteComponent,
    TableModule,
    ConfirmDialogModule,
    ButtonComponent
],
  providers: [ConfirmationService],
  templateUrl: './relation-of-announcement-group-and-sub-group.component.html',
  styleUrl: './relation-of-announcement-group-and-sub-group.component.scss',
})
export class RelationOfAnnouncementGroupAndSubGroupComponent {
  // 💉 Dependency Injection
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private announcementService = inject(AnnouncementGroupSubgroupManagementService);

  readonly tableUi = TableConfig;
  // 📊 UI State
  loading = false;
  addonWidth = '8rem';
  cols = ['حذف', 'گروه اعلام بار', 'زیر گروه اعلام بار'];
  relationsAnnouncement: RowRelationOfAnnouncement[] = [];

  // 📄 Form Definition
  announcementGroupAndSubGroupForm = this.fb.group({
    announcementGroupId: [-1, Validators.min(0)],
    announcementGroupTitle: ['', Validators.required],
    announcementSubGroupId: [-1, Validators.min(0)],
    announcementSubGroupTitle: ['', Validators.required],
  });

  // 🔍 Search Handlers
  searchAnnouncementGroup = async (query: string) => {
    const res = await this.announcementService.GetAnnouncementGroups(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  searchAnnouncementSubGroup = async (query: string) => {
    const res = await this.announcementService.GetAnnouncementSupGroups(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  // 📥 Form Getters
  get announcementGroupId(): FormControl {
    return this.announcementGroupAndSubGroupForm.get('announcementGroupId') as FormControl;
  }

  get announcementGroupTitle(): FormControl {
    return this.announcementGroupAndSubGroupForm.get('announcementGroupTitle') as FormControl;
  }

  get announcementSubGroupId(): FormControl {
    return this.announcementGroupAndSubGroupForm.get('announcementSubGroupId') as FormControl;
  }

  get announcementSubGroupTitle(): FormControl {
    return this.announcementGroupAndSubGroupForm.get('announcementSubGroupTitle') as FormControl;
  }

  // 🧹 Reset value when input is cleared
  onAutoCompleteChange(controller: FormControl<any>) {
    controller.setValue(-1);
  }

  // 🔘 Group selected from autocomplete
  async onSelectAnnouncement(announcement: AnnouncementGroup) {
    this.announcementGroupId.setValue(announcement.AnnouncementId);
    try {
      this.loadingService.setLoading(true);
      await this.loadRelationOfAnnouncement(announcement.AnnouncementId);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🔘 Subgroup selected from autocomplete
  onSelectSubAnnouncement(subGroup: AnnouncementSubGroup) {
    this.announcementSubGroupId.setValue(subGroup.AnnouncementSGId);
  }

  // 📡 Fetch relation data from backend
  private async loadRelationOfAnnouncement(announcementId: number) {
    const res = await this.announcementService.GetRelationOfAnnouncementGroupAndSubGroup(announcementId);
    if (!checkAndToastError(res, this.toast)) return;
    this.relationsAnnouncement = this.flattenAnnouncementRelations(res.data!);
  }

  // 🔃 Convert nested relations to flat format for display
  private flattenAnnouncementRelations(data: RelationOfAnnouncementGroupAndSubGroup[]): RowRelationOfAnnouncement[] {
    return data.flatMap(group =>
      group.AnnouncementSubGroups.map(sub => ({
        AnnouncementId: group.AnnouncementId,
        AnnouncementTitle: group.AnnouncementTitle ?? '',
        AnnouncementSGId: sub.AnnouncementSGId,
        AnnouncementSGTitle: sub.AnnouncementSGTitle ?? '',
      }))
    );
  }

  // ❌ Delete confirmation dialog
  onDelete(row: RowRelationOfAnnouncement) {
    this.confirmationService.confirm({
      message: `آیا می‌خواهید رکورد با کد گروه ${row.AnnouncementId} و کد زیرگروه ${row.AnnouncementSGId} را حذف کنید؟`,
      header: 'حذف رکورد',
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'لغو',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تایید',
        severity: 'danger',
      },
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.deleteRelationAnnouncement(row);
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  // ❌ Delete relation from backend
  private async deleteRelationAnnouncement(row: RowRelationOfAnnouncement) {
    const res = await this.announcementService.DeleteRelationOfAnnouncementGroupAndSubGroup(
      row.AnnouncementId,
      row.AnnouncementSGId
    );
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
    await this.loadRelationOfAnnouncement(row.AnnouncementId);
  }

  // ✅ Register new relation
  async registerRelationAnnouncement() {
    if (this.announcementGroupAndSubGroupForm.invalid || this.loading) return;
    try {
      this.loadingService.setLoading(true);
      const res = await this.announcementService.RegisterNewRelationOfAnnouncementGroupAndSubGroup(
        this.announcementGroupId.value,
        this.announcementSubGroupId.value
      );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data?.Message ?? '');
      await this.loadRelationOfAnnouncement(this.announcementGroupId.value);
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}