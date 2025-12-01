import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../shared/component-base/base-loading';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  deleteCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Dialog } from 'primeng/dialog';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { LoaderTypeToAnnouncementSubGroupRelation } from 'app/services/loader-types/model/loader-type-announcement-sub-groups-relation.model';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';

type LoaderTypeAnnouncementMappingRow =
  LoaderTypeToAnnouncementSubGroupRelation & {
    delete: string;
  };

// COMPONENT --------------------------------------------------------
@Component({
  selector: 'app-loader-type-announcement-relation-form',
  imports: [
    TableComponent,
    ButtonComponent,
    Dialog,
    SearchAutoCompleteFactoryComponent,
  ],
  templateUrl: './loader-type-announcement-relation-form.component.html',
  styleUrls: ['./loader-type-announcement-relation-form.component.scss'],
})
export class LoaderTypeAnnouncementRelationFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  // SERVICES --------------------------------------------------------
  private readonly loaderTypeService = inject(LoaderTypesService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  private readonly fb = inject(FormBuilder);

  // SIGNALS ---------------------------------------------------------
  readonly loaderTypeAnnouncementMappings = signal<
    LoaderTypeAnnouncementMappingRow[]
  >([]);
  readonly dialogTitle = signal<string>('بارگیر - گروه و زیرگروه اعلام بار');

  // STATE -----------------------------------------------------------
  isDialogVisible = false;
  readonly addonWidth = '6rem';

  // FORM ------------------------------------------------------------
  readonly form = this.fb.group({
    LoaderTypeId: this.fb.control<number | null>(null, ValidationSchema.id),
    LoaderTypeTitle: this.fb.nonNullable.control<string>(''),

    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: this.fb.nonNullable.control<string>(''),

    AnnouncementSGId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementSGTitle: this.fb.control<string>(''),
  });

  // HELPERS ---------------------------------------------------------
  ctrl<T extends keyof typeof this.form.controls>(control: T) {
    return this.form.get(control as string) as FormControl;
  }

  // AUTOCOMPLETE CONFIGS --------------------------------------------
  readonly loaderTypeInput = this.autoCompleteFactory.create(
    AutoCompleteType.LoaderType,
    this.ctrl('LoaderTypeId'),
    { control: this.ctrl('LoaderTypeTitle') }
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

  // TABLE COLUMNS ---------------------------------------------------
  readonly columns: TableColumn<LoaderTypeAnnouncementMappingRow>[] = [
    { header: 'بارگیر', field: 'LoaderTypeTitle' },
    { header: 'گروه اعلام بارگیر', field: 'AnnouncementTitle' },
    { header: 'بارگیر اعلام بار', field: 'AnnouncementSGTitle' },
    {
      ...deleteCell.config,
      field: 'delete',
      header: 'حذف',
      onAction: (row: LoaderTypeToAnnouncementSubGroupRelation) =>
        this.onDelete(row),
    },
  ];

  // LIFECYCLE -------------------------------------------------------
  onViewActivated(): void {
    this.loadLoaderTypeAnnouncementMappings();
  }

  // LOAD ------------------------------------------------------------
  async loadLoaderTypeAnnouncementMappings() {
    await this.withLoading(async () => {
      const res =
        await this.loaderTypeService.GetLoaderTypeRelationsToAnnouncementSubGroups();
      if (!checkAndToastError(res, this.toast)) {
        this.loaderTypeAnnouncementMappings.set([]);
        return;
      }

      const rows = res.data.map((item) => ({
        ...item,
        delete: deleteCell.value,
      }));

      this.loaderTypeAnnouncementMappings.set(rows);
    });
  }

  // DELETE ----------------------------------------------------------
  private async onDelete(row: LoaderTypeToAnnouncementSubGroupRelation) {
    this.confirmService.confirmDelete(
      `بارگیر ${row.LoaderTypeTitle} و گروه ${row.AnnouncementTitle} و زیرگروه ${row.AnnouncementSGTitle}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeLoaderTypeAnnouncementMapping(row);

        await this.withLoading(async () => {
          const res =
            await this.loaderTypeService.DeleteRelationToAnnouncementSubGroup(
              deletePayload
            );
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadLoaderTypeAnnouncementMappings();
      }
    );
  }

  // DIALOG ----------------------------------------------------------
  openDialog() {
    this.form.reset();
    this.isDialogVisible = true;
  }

  // FORM SUBMIT -----------------------------------------------------
  async submitRegister() {
    if (this.form.invalid || this.loading()) return;
    const registerPayload = this.serializeLoaderTypeAnnouncementMapping(
      this.form.getRawValue() as LoaderTypeToAnnouncementSubGroupRelation
    );

    const res =
      await this.loaderTypeService.RegisterRelationToAnnouncementSubGroup(
        registerPayload
      );
    if (!checkAndToastError(res, this.toast)) return;

    await this.loadLoaderTypeAnnouncementMappings();
    this.isDialogVisible = false;
    this.toast.success('موفق', res.data.Message);
  }

  // SERIALIZER ------------------------------------------------------
  serializeLoaderTypeAnnouncementMapping(
    raw: LoaderTypeToAnnouncementSubGroupRelation
  ): LoaderTypeToAnnouncementSubGroupRelation {
    return {
      LoaderTypeId: Number(raw.LoaderTypeId),
      LoaderTypeTitle: raw.LoaderTypeTitle?.trim() || '',
      AnnouncementSGId: Number(raw.AnnouncementSGId),
      AnnouncementSGTitle: raw.AnnouncementSGTitle?.trim() || '',
      AnnouncementId: Number(raw.AnnouncementId),
      AnnouncementTitle: raw.AnnouncementTitle?.trim() || '',
    };
  }
}
