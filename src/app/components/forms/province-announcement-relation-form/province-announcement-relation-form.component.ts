import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  deleteCell,
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { BaseLoading } from '../shared/component-base/base-loading';
import { AnnouncementGroupSubgroupManagementService } from 'app/services/announcement-group-subgroup-management/announcement-group-subgroup-management.service';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Dialog } from 'primeng/dialog';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { RelationOfAnnouncementSubGroupAndProvince } from 'app/services/announcement-group-subgroup-management/model/relation-of-announcement-subgroup-province.model';
import { checkAndToastError } from 'app/utils/api-utils';

type AnnouncementProvinceRow = RelationOfAnnouncementSubGroupAndProvince & {
  delete: string;
};
@Component({
  selector: 'app-province-announcement-relation-form',
  imports: [
    TableComponent,
    SearchAutoCompleteFactoryComponent,
    ButtonComponent,
    Dialog,
  ],
  templateUrl: './province-announcement-relation-form.component.html',
  styleUrl: './province-announcement-relation-form.component.scss',
})
export class ProvinceAnnouncementRelationFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly announcementService = inject(
    AnnouncementGroupSubgroupManagementService
  );

  private readonly fb = inject(FormBuilder);
  private readonly confirmService = inject(AppConfirmService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );
  readonly AnnouncementsProvinces = signal<AnnouncementProvinceRow[]>([]);
  readonly dialogTitle = signal<string>(
    'گروه‌های اعلام بار، زیرگروه‌های اعلام بار - استان‌های مقصد'
  );

  readonly form = this.fb.group({
    ProvinceId: this.fb.control<number | null>(null, ValidationSchema.id),
    ProvinceName: this.fb.nonNullable.control('', ValidationSchema.title),

    AnnouncementId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementTitle: this.fb.nonNullable.control('', ValidationSchema.title),

    AnnouncementSGId: this.fb.control<number | null>(null, ValidationSchema.id),
    AnnouncementSGTitle: this.fb.nonNullable.control(
      '',
      ValidationSchema.title
    ),
  });

  readonly columns: TableColumn<AnnouncementProvinceRow>[] = [
    { header: 'شناسه استان', field: 'ProvinceId' },
    { header: 'استان', field: 'ProvinceName' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    {
      field: 'delete',
      ...deleteCell.config,
      onAction: (row) => this.onDelete(row),
    },
  ];

  // AUTOCOMPLETE CONFIGS --------------------------------------------
  readonly ProvinceInput = this.autoCompleteFactory.create(
    AutoCompleteType.Province,
    this.ctrl('ProvinceId'),
    {
      control: this.ctrl('ProvinceName'),
    }
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
  isDialogVisible = false;
  addonWidth = '7rem';

  onViewActivated(): void {
    this.loadAnnouncementsProvinces();
  }

  // ------------------ LOAD DATA ------------------
  private async loadAnnouncementsProvinces() {
    await this.withLoading(async () => {
      const response =
        await this.announcementService.GetRelationOfAnnouncementSubGroupsAndProvinces();
      if (!checkAndToastError(response, this.toast)) return;

      const rows = response.data.map((d) => ({
        ...d,
        delete: deleteCell.value,
      }));
      this.AnnouncementsProvinces.set(rows);
    });
  }

  // ------------------ DELETE ------------------
  private async onDelete(row: RelationOfAnnouncementSubGroupAndProvince) {
    this.confirmService.confirmDelete(
      `استان ${row.ProvinceName} گروه ${row.AnnouncementSGTitle} زیرگروه ${row.AnnouncementSGTitle}`,
      async () => {
        if (this.loading()) return;

        const deletePayload = this.serializeAnnouncementProvince(row);

        await this.withLoading(async () => {
          const res =
            await this.announcementService.DeleteRelationOfAnnouncementSubGroupAndProvince(
              deletePayload
            );
          if (!checkAndToastError(res, this.toast)) return;
          this.toast.success('موفق', res.data.Message);
        });

        await this.loadAnnouncementsProvinces();
      }
    );
  }

  // ------------------ SUBMIT ------------------
  async submitRegister() {
    if (this.loading() || this.form.invalid) return;

    this.withLoading(async () => {
      const registerPayload = this.serializeAnnouncementProvince({
        ...this.form.getRawValue(),
      } as RelationOfAnnouncementSubGroupAndProvince);

      const res =
        await this.announcementService.RegisterRelationOfAnnouncementSubGroupAndProvince(
          registerPayload
        );
      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
    });

    this.isDialogVisible = false;
    await this.loadAnnouncementsProvinces();
  }

  // ------------------ UTILITIES ------------------
  serializeAnnouncementProvince(
    obj: RelationOfAnnouncementSubGroupAndProvince
  ): RelationOfAnnouncementSubGroupAndProvince {
    return {
      ProvinceId: Number(obj.ProvinceId),
      ProvinceName: obj.ProvinceName,

      AnnouncementId: obj.AnnouncementId,
      AnnouncementTitle: obj.AnnouncementTitle,

      AnnouncementSGId: obj.AnnouncementSGId,
      AnnouncementSGTitle: obj.AnnouncementSGTitle,
    };
  }

  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  onNew() {
    this.form.reset();
    this.isDialogVisible = true;
  }
}
