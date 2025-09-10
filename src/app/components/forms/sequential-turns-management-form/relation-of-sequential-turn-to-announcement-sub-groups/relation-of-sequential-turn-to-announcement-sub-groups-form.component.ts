import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { TableConfig } from 'app/constants/ui/table.ui';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { AnnouncementGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-group.model';
import { AnnouncementSubGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-subgroup.model';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { RelationOfSequentialTurnToAnnouncementSubGroup } from 'app/services/sequential-turn-management/model/relation-of-sequentialTurn-to-announcementSubGroup.model';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import {
  deleteCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { AppTitles } from 'app/constants/Titles';

// 📦 Interface for displaying flat relation data in table
interface RowRelationOfSequential {
  SeqTurnId: number;
  SeqTurnTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  delete: string;
}

@Component({
  selector: 'app-relation-of-announcement-group-and-sub-group',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SearchAutoCompleteComponent,
    TableModule,
    ConfirmDialogModule,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl:
    './relation-of-sequential-turn-to-announcement-sub-groups-form.component.html',
  styleUrl:
    './relation-of-sequential-turn-to-announcement-sub-groups-form.component.scss',
})
export class RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent {
  // 💉 Dependency Injection
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirmService = inject(AppConfirmService);
  private sequentialTurnService = inject(SequentialTurnManagementService);
  private announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );

  readonly tableUi = TableConfig;
  readonly appTitle = AppTitles;

  // 📊 UI State
  loading = false;
  addonWidth = '10rem';
  relationsSequential: RowRelationOfSequential[] = [];

  readonly columns: TableColumn<RowRelationOfSequential>[] = [
    {
      field: 'SeqTurnTitle',
      header: 'صف نوبت',
    },
    {
      field: 'AnnouncementSGTitle',
      header: 'زیر گروه',
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: (row: RowRelationOfSequential) => this.onDelete(row),
    },
  ];

  // 📄 Form Definition
  sequentialTurnForm = this.fb.group({
    sequentialTurnId: [-1, Validators.min(0)],
    sequentialTurnTitle: ['', Validators.required],
    announcementGroupId: [-1, Validators.min(0)],
    announcementGroupTitle: ['', Validators.required],
    announcementSubGroupId: [-1, Validators.min(0)],
    announcementSubGroupTitle: ['', Validators.required],
  });

  // 🔍 Search Handlers
  searchSequentialTurn = async (query: string) => {
    const res = await this.sequentialTurnService.GetSequentialTurns(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  searchAnnouncementGroup = async (query: string) => {
    const res = await this.announcementService.GetAnnouncementGroups(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  searchAnnouncementSubGroup = async (query: string) => {
    if (this.announcementGroupId.invalid) return [];

    const res =
      await this.announcementService.GetRelationOfAnnouncementGroupAndSubGroup(
        this.announcementGroupId.value
      );

    if (!checkAndToastError(res, this.toast)) return [];

    return res.data.flatMap((group) =>
      group.AnnouncementSubGroups.map((sub) => ({
        AnnouncementSGId: sub.AnnouncementSGId,
        AnnouncementSGTitle: sub.AnnouncementSGTitle,
      }))
    );
  };

  // 📥 Form Getters
  get sequentialTurnId(): FormControl {
    return this.sequentialTurnForm.get('sequentialTurnId') as FormControl;
  }

  get sequentialTurnTitle(): FormControl {
    return this.sequentialTurnForm.get('sequentialTurnTitle') as FormControl;
  }

  get announcementGroupId(): FormControl {
    return this.sequentialTurnForm.get('announcementGroupId') as FormControl;
  }

  get announcementGroupTitle(): FormControl {
    return this.sequentialTurnForm.get('announcementGroupTitle') as FormControl;
  }

  get announcementSubGroupId(): FormControl {
    return this.sequentialTurnForm.get('announcementSubGroupId') as FormControl;
  }

  get announcementSubGroupTitle(): FormControl {
    return this.sequentialTurnForm.get(
      'announcementSubGroupTitle'
    ) as FormControl;
  }

  // 🧹 Reset value when input is cleared
  onAutoCompleteChange(controller: FormControl<any>) {
    controller.setValue(-1);

    if (this.sequentialTurnId.invalid) {
      this.announcementGroupId.reset(-1);
      this.announcementGroupTitle.reset('');
    }

    if (this.announcementGroupId.invalid) {
      this.announcementSubGroupId.reset(-1);
      this.announcementSubGroupTitle.reset('');
    }
  }

  async onSelectSequentialTurn(sequentialTurn: SequentialTurn) {
    await this.loadRelationOfSequentialTurns(sequentialTurn.SeqTurnId);
    this.sequentialTurnId.setValue(sequentialTurn.SeqTurnId);
  }

  // 🔘 Group selected from autocomplete
  onSelectAnnouncement(announcement: AnnouncementGroup) {
    this.announcementGroupId.setValue(announcement.AnnouncementId);
  }

  // 🔘 Subgroup selected from autocomplete
  onSelectSubAnnouncement(subGroup: AnnouncementSubGroup) {
    this.announcementSubGroupId.setValue(subGroup.AnnouncementSGId);
  }

  // 📡 Fetch relation data from backend
  private async loadRelationOfSequentialTurns(sequentialId: number) {
    const res =
      await this.sequentialTurnService.GetRelationOfSequentialTurnToAnnouncementSubGroups(
        sequentialId
      );
    if (!checkAndToastError(res, this.toast)) return;
    this.relationsSequential = this.flattenAnnouncementRelations(res.data!);
  }

  // 🔃 Convert nested relations to flat format for display
  private flattenAnnouncementRelations(
    data: RelationOfSequentialTurnToAnnouncementSubGroup[]
  ): RowRelationOfSequential[] {
    return data.flatMap((group) =>
      group.AnnouncementSubGroups.map((sub) => ({
        SeqTurnId: group.SeqTurnId,
        SeqTurnTitle: group.SeqTurnTitle ?? '',
        AnnouncementSGId: sub.AnnouncementSGId,
        AnnouncementSGTitle: sub.AnnouncementSGTitle ?? '',
        delete: deleteCell.value,
      }))
    );
  }

  // ❌ Delete confirmation dialog
  onDelete(row: RowRelationOfSequential) {
    this.confirmService.confirmDelete(
      `${row.SeqTurnTitle} - ${row.AnnouncementSGTitle}`,
      async () => {
        try {
          this.loadingService.setLoading(true);
          await this.deleteRelationAnnouncement(row);
        } finally {
          this.loadingService.setLoading(false);
        }
      }
    );
  }

  // ❌ Delete relation from backend
  private async deleteRelationAnnouncement(row: RowRelationOfSequential) {
    const res =
      await this.sequentialTurnService.DeleteRelationOfSequentialTurnToAnnouncementSubGroup(
        row.SeqTurnId,
        row.AnnouncementSGId
      );
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
    await this.loadRelationOfSequentialTurns(row.SeqTurnId);
  }

  // ✅ Register new relation
  async registerRelationAnnouncement() {
    if (this.sequentialTurnForm.invalid || this.loading) return;
    try {
      this.loadingService.setLoading(true);
      const res =
        await this.sequentialTurnService.RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup(
          this.sequentialTurnId.value,
          this.announcementSubGroupId.value
        );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
      await this.loadRelationOfSequentialTurns(this.sequentialTurnId.value);
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}
