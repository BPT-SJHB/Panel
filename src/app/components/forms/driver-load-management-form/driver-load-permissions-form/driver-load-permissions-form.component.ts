import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { SearchAutoCompleteFactoryComponent } from 'app/components/shared/inputs/search-auto-complete-factory/search-auto-complete-factory.component';
import {
  AutoCompleteConfigFactoryService,
  AutoCompleteType,
} from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { CardModule } from 'primeng/card';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { LoadPermissionForDriver } from 'app/services/report-management/model/load-permissions/load-permission-for-driver.model';
import { checkAndToastError } from 'app/utils/api-utils';

interface SearchLoadPermissionsForm {
  AnnouncementGroupId: number | null;
  AnnouncementGroupTitle: string;
  AnnouncementSubGroupId: number | null;
  AnnouncementSubGroupTitle: string;
}

@Component({
  selector: 'app-driver-load-permissions-form',
  templateUrl: './driver-load-permissions-form.component.html',
  imports: [CardModule, ButtonComponent, SearchAutoCompleteFactoryComponent],
  styleUrls: ['./driver-load-permissions-form.component.scss'],
})
export class DriverLoadPermissionsFormComponent extends BaseLoading {
  private readonly fb = inject(FormBuilder);
  private readonly reportService = inject(ReportsManagementService);
  private readonly autoCompleteFactory = inject(
    AutoCompleteConfigFactoryService
  );

  readonly loadsPermissions = signal<LoadPermissionForDriver[]>([]);
  readonly addonWidth = '10rem';
  readonly searchLoadPermissions = this.fb.group({
    AnnouncementGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    AnnouncementGroupTitle: this.fb.nonNullable.control(''),
    AnnouncementSubGroupId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    AnnouncementSubGroupTitle: this.fb.nonNullable.control(''),
  });

  // autocomplete configs
  readonly autoCompleteAnnouncementGroup = this.autoCompleteFactory.create(
    AutoCompleteType.AnnouncementGroup,
    this.ctrl('AnnouncementGroupId'),
    {
      control: this.ctrl('AnnouncementGroupTitle'),
      valueChange: () => {
        this.ctrl('AnnouncementGroupId').setValue(null);
        this.ctrl('AnnouncementSubGroupId').setValue(null);
        this.ctrl('AnnouncementSubGroupTitle').reset('');
      },
    }
  );

  readonly autoCompleteSubAnnouncementGroup = this.autoCompleteFactory.create(
    AutoCompleteType.RelationAnnouncementGroupAndSubGroup,
    this.ctrl('AnnouncementSubGroupId'),
    {
      control: this.ctrl('AnnouncementSubGroupTitle') as FormControl<string>,
      groupControlId: this.ctrl('AnnouncementGroupId'),
      readOnly: () => this.ctrl('AnnouncementGroupId').invalid,
    }
  );

  async loadLoadPermissions() {
    if (this.searchLoadPermissions.invalid || this.loading()) return;
    await this.withLoading(async () => {
      const response = await this.reportService.GetLoadPermissionsForDriver(
        this.ctrl('AnnouncementGroupId').value!,
        this.ctrl('AnnouncementSubGroupId').value!
      );

      if (!checkAndToastError(response, this.toast)) return;
      this.loadsPermissions.set(response.data);
    });
  }
  ctrl<K extends keyof SearchLoadPermissionsForm>(
    name: K
  ): FormControl<SearchLoadPermissionsForm[K]> {
    const control = this.searchLoadPermissions.get(name as string);
    if (!control) {
      throw new Error(`Control "${String(name)}" not found`);
    }
    return control as FormControl<SearchLoadPermissionsForm[K]>;
  }
}
