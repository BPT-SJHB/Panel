import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import {
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { BaseLoading } from '../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { AppTitles } from 'app/constants/Titles';

@Component({
  selector: 'app-loader-type-form',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    TextInputComponent,
    CheckboxModule,
    TableModule,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './loader-type-form.component.html',
  styleUrls: ['./loader-type-form.component.scss'],
})
export class LoaderTypeFormComponent
  extends BaseLoading
  implements OnDestroy, OnInit
{
  private fb = inject(FormBuilder);
  private loaderTypeService = inject(LoaderTypesService);

  readonly appTitle = AppTitles;
  readonly loaderTypes = signal<LoaderType[]>([]);
  readonly columns: TableColumn<LoaderType>[] = [
    {
      field: 'LoaderTypeId',
      header: 'شناسه',
    },
    {
      field: 'LoaderTypeOrganizationId',
      header: 'شناسه سازمانی',
    },
    {
      field: 'LoaderTypeTitle',
      header: 'عنوان بارگیر',
    },
    {
      field: 'LoaderTypeFixStatusTitle', // Or use LoaderTypeFixStatusId if you want the ID
      header: 'بارگیر ثابت/غیر ثابت',
    },
    {
      type: TableColumnType.CHECKBOX,
      field: 'Active',
      header: 'فعال/غیر فعال',
      onAction: (row: LoaderType) => {
        this.onChangeCheckBox(row);
      },
    },
  ];

  searchForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
  });

  async searchLoaders(query: string): Promise<void> {
    const response = await this.loaderTypeService.GetLoaderTypesInfo(query);
    if (!checkAndToastError(response, this.toast)) {
      this.loaderTypes.set([]);
      return;
    }

    console.log(response.data);

    this.loaderTypes.set(response.data);
  }

  async loadLoadersType() {
    if (this.searchForm.invalid || this.loading()) return;
    await this.withLoading(async () => {
      this.loadingService.setLoading(true);
      await this.searchLoaders(this.searchTitle.value);
    });
  }

  async onChangeCheckBox(row: LoaderType) {
    const response = await this.loaderTypeService.ChangeLoaderTypeStatus(
      row.LoaderTypeId
    );
    if (!checkAndToastError(response, this.toast)) {
      row.Active = !row.Active;
      return;
    }
    this.toast.success('موفق', response.data.Message);
  }
  get searchTitle(): FormControl {
    return this.searchForm.get('title') as FormControl;
  }
}
