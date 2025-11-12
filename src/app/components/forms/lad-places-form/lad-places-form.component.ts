import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { LADPlace } from 'app/data/model/lad-place.model';

import { LADPlaceManagementService } from 'app/services/lad-place-management/lad-place-management.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SearchInputComponent } from '../../shared/inputs/search-input/search-input.component';
import { TextInputComponent } from '../../shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ShortResponse } from 'app/data/model/short-response.model';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';
import { BaseLoading } from '../shared/component-base/base-loading';
import {
  deleteCell,
  editCell,
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { AppConfirmService } from 'app/services/confirm/confirm.service';

enum LADPlaceFormMode {
  EDITABLE,
  REGISTER,
}

type LADPlaceTableRow = LADPlace & { edit: string; delete: string };
@Component({
  selector: 'app-lad-places-form',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    SearchInputComponent,
    TextInputComponent,
    ToggleSwitchInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './lad-places-form.component.html',
  styleUrl: './lad-places-form.component.scss',
})
export class LadPlacesFormComponent
  extends BaseLoading
  implements OnInit, OnDestroy
{
  @ViewChild(SearchInputComponent) searchInput!: SearchInputComponent<LADPlace>;

  private readonly ladPlaceService = inject(LADPlaceManagementService);
  private readonly confirmationService = inject(AppConfirmService);
  private readonly fb = inject(FormBuilder);

  readonly tableUi = TableConfig;
  readonly addonWidth = '7rem';
  readonly appTitle = AppTitles;

  readonly cloumns: TableColumn<LADPlaceTableRow>[] = [
    { header: 'شناسه', field: 'LADPlaceId' },
    { header: 'عنوان', field: 'LADPlaceTitle' },
    {
      header: ' وضعیت محل بارگیری',
      field: 'LoadingActive',
      type: TableColumnType.BOOLEAN,
    },
    {
      header: ' وضعیت محل تخلیه',
      field: 'DischargingActive',
      type: TableColumnType.BOOLEAN,
    },
    { header: 'شماره تماس', field: 'LADPlaceTel' },
    { header: 'آدرس', field: 'LADPlaceAddress' },
    {
      ...editCell.config,
      field: 'edit',
      onAction: async (row: LADPlace) => await this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: async (row: LADPlace) => await this.onDelete(row),
    },
  ];
  readonly ladPlaces = signal<LADPlaceTableRow[]>([]);

  formMode = signal<LADPlaceFormMode>(LADPlaceFormMode.REGISTER);
  formDialogVisible = false;
  headerTitle = '';
  cashedLadPlace?: LADPlace;
  searchFiledControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  ladPlacesForm = this.fb.group({
    ladPlacesId: this.fb.control<number | null>(null, Validators.required),
    ladPlacesTitle: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.title
    ),
    ladPlacesTel: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.telephone
    ),
    ladPlacesAddress: this.fb.nonNullable.control<string>(''),
    loadingActive: this.fb.nonNullable.control(true),
    dischargingActive: this.fb.nonNullable.control(true),
  });

  searchLADPlace: (query: string) => Promise<LADPlaceTableRow[]> = async (
    query: string
  ) => {
    const response = await this.ladPlaceService.GetLADPlaces(query);
    if (!checkAndToastError(response, this.toast)) return [];
    return (
      response.data?.map((lad) => ({
        ...lad,
        edit: editCell.value,
        delete: deleteCell.value,
      })) ?? []
    );
  };

  filterLADPlace = (ladPlace: LADPlaceTableRow, query: string) => {
    return ladPlace.LADPlaceTitle.includes(query);
  };

  handelSearchLADPlaces(ladPlaces: LADPlaceTableRow[]) {
    this.ladPlaces.set(ladPlaces);
  }

  onDelete(row: LADPlace): void {
    const message = `شناسه ${row.LADPlaceId} - عنوان ${row.LADPlaceTitle}`;
    this.confirmationService.confirmDelete(message, async () => {
      await this.withLoading(async () => {
        await this.deleteLadPlaces(row.LADPlaceId);
      });
    });
  }

  async onEdit(row: LADPlace) {
    if (this.loading()) return;
    this.formMode.set(LADPlaceFormMode.EDITABLE);
    const ladPlace = await this.getLadPlace(row.LADPlaceId);
    if (!ladPlace) return;

    this.cashedLadPlace = ladPlace;
    this.populateLadPlaceForm(ladPlace);
    this.headerTitle = `ویرایش مبدا و مقصد حمل بار`;
    this.formDialogVisible = true;
  }

  async onNew() {
    if (this.loading()) return;
    this.formMode.set(LADPlaceFormMode.EDITABLE);
    this.cashedLadPlace = this.extractLadPlaceFromForm();
    this.headerTitle = 'افزودن مبدا و مقصد حمل بار';
    this.formDialogVisible = true;
  }

  onCloseDialog() {
    this.resetLadPlacesForm();
    this.headerTitle = '';
  }

  async registerOrEdit() {
    if (this.loading()) return;
    this.withLoading(async () => {
      if (this.formMode() === LADPlaceFormMode.REGISTER) {
        await this.registerLadPlace();
      } else {
        await this.editLadPlace();
      }
    });
  }

  isFormValidExcept(
    exceptControl: keyof typeof this.ladPlacesForm.controls
  ): boolean {
    const controls = this.ladPlacesForm.controls;

    // iterate over all keys
    for (const key of Object.keys(controls)) {
      if (key === exceptControl) continue;
      if (controls[key as keyof typeof controls].invalid) return false;
    }
    return true;
  }

  private resetLadPlacesForm() {
    this.ladPlacesForm.reset();
    this.ladPlacesForm.markAsUntouched();
    this.ladPlacesId.setValue(null);
    this.loadingActive.setValue(true);
    this.dischargingActive.setValue(true);
    this.cashedLadPlace = undefined;
  }

  private async updateLoadingAndDischarging(
    id: number
  ): Promise<ApiResponse<ShortResponse>[]> {
    const responses: ApiResponse<ShortResponse>[] = [];

    if (this.cashedLadPlace?.LoadingActive !== this.loadingActive.value) {
      responses.push(await this.ladPlaceService.ChangeLoadingPlaceStatus(id));
    }

    if (
      this.cashedLadPlace?.DischargingActive !== this.dischargingActive.value
    ) {
      responses.push(
        await this.ladPlaceService.ChangeDischargingPlaceStatus(id)
      );
    }

    return responses;
  }

  private async editLadPlace() {
    if (this.ladPlacesForm.invalid) return;

    const ladPlace = this.extractLadPlaceFromForm();
    const response = await this.ladPlaceService.UpdateLADPlace(ladPlace);
    if (!checkAndToastError(response, this.toast)) return;

    const changes = await this.updateLoadingAndDischarging(ladPlace.LADPlaceId);
    const hasError = changes.some(
      (res) => !checkAndToastError(res, this.toast)
    );

    if (hasError) return;
    this.toast.success('موفق', response.data.Message);
    await this.updateTable();
    this.closeDialog();
  }

  private async registerLadPlace() {
    if (!this.isFormValidExcept('ladPlacesId')) return;
    const ladPlace = this.extractLadPlaceFromForm();
    const response = await this.ladPlaceService.RegisterNewLADPlace(ladPlace);

    if (!checkAndToastError(response, this.toast)) return;

    const changes = await this.updateLoadingAndDischarging(
      response.data.LADPlaceId
    );
    const hasError = changes.some(
      (res) => !checkAndToastError(res, this.toast)
    );

    if (hasError) return;
    await this.updateTable();
    this.closeDialog();
  }

  private async deleteLadPlaces(id: number) {
    const response = await this.ladPlaceService.DeleteLADPlace(id);
    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
    this.updateTable();
  }

  private closeDialog() {
    this.formDialogVisible = false;
    this.ladPlacesForm.reset();
    this.headerTitle = '';
  }

  private async getLadPlace(id: number): Promise<LADPlace | undefined> {
    const response = await this.ladPlaceService.GetLADPlace(id);
    return checkAndToastError(response, this.toast) ? response.data : undefined;
  }

  private extractLadPlaceFromForm(): LADPlace {
    return {
      LADPlaceId: this.ladPlacesId.value,
      LADPlaceTitle: this.ladPlacesTitle.value,
      LADPlaceTel: this.ladPlacesTel.value,
      LADPlaceAddress: this.ladPlacesAddress.value,
      LoadingActive: this.loadingActive.value,
      DischargingActive: this.dischargingActive.value,
    };
  }

  private populateLadPlaceForm(ladPlace: LADPlace): void {
    this.ladPlacesForm.patchValue({
      ladPlacesId: ladPlace.LADPlaceId,
      ladPlacesTitle: ladPlace.LADPlaceTitle,
      ladPlacesTel: ladPlace.LADPlaceTel,
      ladPlacesAddress: ladPlace.LADPlaceAddress,
      loadingActive: ladPlace.LoadingActive,
      dischargingActive: ladPlace.DischargingActive,
    });
  }

  private async updateTable() {
    this.searchInput.refreshSearch();
  }
  // Form control getters
  get ladPlacesId(): FormControl {
    return this.ladPlacesForm.get('ladPlacesId') as FormControl;
  }
  get ladPlacesTitle(): FormControl {
    return this.ladPlacesForm.get('ladPlacesTitle') as FormControl;
  }
  get ladPlacesTel(): FormControl {
    return this.ladPlacesForm.get('ladPlacesTel') as FormControl;
  }
  get ladPlacesAddress(): FormControl {
    return this.ladPlacesForm.get('ladPlacesAddress') as FormControl;
  }
  get loadingActive(): FormControl {
    return this.ladPlacesForm.get('loadingActive') as FormControl;
  }
  get dischargingActive(): FormControl {
    return this.ladPlacesForm.get('dischargingActive') as FormControl;
  }
}
