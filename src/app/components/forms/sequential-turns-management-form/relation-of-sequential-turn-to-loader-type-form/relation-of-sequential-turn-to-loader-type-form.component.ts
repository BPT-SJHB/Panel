// =======================
// 📦 Imports
// =======================
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { RelationOfSequentialTurnToLoaderType } from 'app/services/sequential-turn-management/model/relation-of-sequentialTurn-to-loaderType.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { ERROR_MESSAGES, ErrorCodes } from 'app/constants/error-messages';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { TableConfig } from 'app/constants/ui/table.ui';

// =======================
// 📄 Table Row Interface
// =======================
interface RowRelationOfSequentialToLoader {
  SeqTurnId: number;
  SeqTurnTitle: string;
  LoaderTypeId: number;
  LoaderTypeTitle: string;
}

// =======================
// 🧩 Component Definition
// =======================
@Component({
  selector: 'app-relation-of-announcement-group-and-sub-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    TableModule,
    SearchAutoCompleteComponent,
  ],
  providers: [ConfirmationService],
  templateUrl:
    './relation-of-sequential-turn-to-loader-type-form.component.html',
  styleUrl: './relation-of-sequential-turn-to-loader-type-form.component.scss',
})
export class RelationOfSequentialTurnToLoaderTypeFormComponent {
  // =======================
  // 💉 Dependency Injection
  // =======================
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private loaderTypeService = inject(LoaderTypesService);
  private sequentialTurnService = inject(SequentialTurnManagementService);
  readonly tableUi= TableConfig;

  // =======================
  // 📊 Component State
  // =======================
  loading = false;
  addonWidth = '8rem';
  cols = ['حذف', 'صفوف نوبت دهی', 'بارگیرها'];
  relationsAnnouncement: RowRelationOfSequentialToLoader[] = [];

  // =======================
  // 📝 Reactive Form
  // =======================
  relationSequentialToLoaderForm = this.fb.group({
    sequentialId: [-1, Validators.min(0)],
    sequentialTitle: ['', Validators.required],
    loaderTypeId: [-1, Validators.min(0)],
    loaderTypeTitle: ['', Validators.required],
  });

  // =======================
  // 📥 Form Getters
  // =======================
  get sequentialId() {
    return this.relationSequentialToLoaderForm.get(
      'sequentialId'
    ) as FormControl;
  }

  get sequentialTitle() {
    return this.relationSequentialToLoaderForm.get(
      'sequentialTitle'
    ) as FormControl;
  }

  get loaderTypeId() {
    return this.relationSequentialToLoaderForm.get(
      'loaderTypeId'
    ) as FormControl;
  }

  get loaderTypeTitle() {
    return this.relationSequentialToLoaderForm.get(
      'loaderTypeTitle'
    ) as FormControl;
  }

  // =======================
  // 🔄 Reset Autocomplete
  // =======================
  onAutoCompleteChange(control: FormControl) {
    control.setValue(-1);
    if (this.sequentialId.invalid) {
      this.loaderTypeTitle.reset('');
      this.loaderTypeId.reset(-1);
    }
  }

  // =======================
  // 🎯 Autocomplete Selections
  // =======================

  // When a sequential turn is selected
  async onSelectSequentialTurn(sequentialTurn: SequentialTurn) {
    this.sequentialId.setValue(sequentialTurn.SeqTurnId);
    this.loadingService.setLoading(true);
    try {
      await this.loadRelationOfSequentialToLoader(sequentialTurn.SeqTurnId);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // When a loader type is selected
  onSelectLoaderType(loaderType: LoaderType) {
    this.loaderTypeId.setValue(loaderType.LoaderTypeId);
  }

  // =======================
  // 🔍 Autocomplete Search
  // =======================
  searchSequentialTurn = async (query: string) => {
    const res = await this.sequentialTurnService.GetSequentialTurns(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  searchLoaderType = async (query: string) => {
    const res = await this.loaderTypeService.GetLoaderTypesInfo(query);
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  // =======================
  // 🔗 Load Relation Data
  // =======================
  private async loadRelationOfSequentialToLoader(sequentialId: number) {
    const res =
      await this.sequentialTurnService.GetRelationOfSequentialTurnToLoaderTypes(
        sequentialId
      );
    if (!checkAndToastError(res, this.toast)) {
      this.relationsAnnouncement = [];
    }
    this.relationsAnnouncement = this.flattenSequentialRelations(res.data!);
  }

  // Convert nested backend data to flat rows for table
  private flattenSequentialRelations(
    data: RelationOfSequentialTurnToLoaderType[]
  ): RowRelationOfSequentialToLoader[] {
    return data.flatMap((group) =>
      group.LoaderTypes.map((sub) => ({
        SeqTurnId: group.SeqTurnId,
        SeqTurnTitle: group.SeqTurnTitle ?? '',
        LoaderTypeId: sub.LoaderTypeId,
        LoaderTypeTitle: sub.LoaderTypeTitle ?? '',
      }))
    );
  }

  // =======================
  // ❌ Delete a Relation
  // =======================
  onDelete(row: RowRelationOfSequentialToLoader) {
    this.confirmationService.confirm({
      message: `آیا می‌خواهید رکورد <b><u>${row.SeqTurnTitle} - ${row.LoaderTypeTitle}</u></b> را حذف کنید؟`,
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
        this.loadingService.setLoading(true);
        try {
          await this.deleteRelationSequentialToLoader(row);
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  private async deleteRelationSequentialToLoader(
    row: RowRelationOfSequentialToLoader
  ) {
    const res =
      await this.sequentialTurnService.DeleteRelationOfSequentialTurnToLoaderType(
        row.SeqTurnId,
        row.LoaderTypeId
      );
    if (!checkAndToastError(res, this.toast)) return;
    this.toast.success('موفق', res.data.Message);
    await this.loadRelationOfSequentialToLoader(row.SeqTurnId);
  }

  // =======================
  // ✅ Register New Relation
  // =======================
  async registerRelationSequentialToLoader() {
    if (this.relationSequentialToLoaderForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const res =
        await this.sequentialTurnService.RegisterNewRelationOfSequentialTurnToLoaderType(
          this.sequentialId.value,
          this.loaderTypeId.value
        );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data?.Message ?? '');
      await this.loadRelationOfSequentialToLoader(this.sequentialId.value);
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}
