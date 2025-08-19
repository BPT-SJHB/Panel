import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { LADPlace } from 'app/data/model/lad-place.model';

import { LADPlaceManagementService } from 'app/services/lad-place-management/lad-place-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { ConfirmationService } from 'primeng/api';
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
import { ErrorCodes } from 'app/constants/error-messages';
import { TableConfig } from 'app/constants/ui/table.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';

@Component({
  selector: 'app-lad-places-form',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    NgClass,
    ConfirmDialogModule,
    DialogModule,
    SearchInputComponent,
    TextInputComponent,
    ToggleSwitchInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './lad-places-form.component.html',
  styleUrl: './lad-places-form.component.scss',
  providers: [ConfirmationService],
})
export class LadPlacesFormComponent implements OnInit, OnDestroy {
  @ViewChild(SearchInputComponent) searchInput!: SearchInputComponent<LADPlace>;

  private destroy$ = new Subject<void>();
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private ladPlaceService = inject(LADPlaceManagementService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  readonly tableUi = TableConfig;
  readonly addonWidth = '7rem';
  readonly appTitle = AppTitles

  formDialogVisible = false;
  loading = false;
  ladPlaces: LADPlace[] = [];
  ladPlacesCached: LADPlace[] = [];
  headerTitle = '';
  cashedLadPlace?: LADPlace;

  readonly cols = [
    'کد',
    'ویرایش',
    'حذف',
    'عنوان',
    'محل بارگیری',
    'محل تخلیه',
    'شماره تماس',
    'آدرس',
  ];

  ladPlacesForm = this.fb.group({
    ladPlacesId: [0, ValidationSchema.id],
    ladPlacesTitle: ['', ValidationSchema.title],
    ladPlacesTel: ['', Validators.pattern(/^0\d{10}$/)],
    ladPlacesAddress: [''],
    loadingActive: [true],
    dischargingActive: [true],
  });

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchLADPlace: (query: string) => Promise<LADPlace[]> = async (
    query: string,
  ) => {
    const response = await this.ladPlaceService.GetLADPlaces(query);
    if (!this.handleResponse(response)) return [];
    return response.data!;
  };

  filterLADPlace = (ladPlace: LADPlace, query: string) => {
    return ladPlace.LADPlaceTitle.includes(query);
  };

  handelSearchLADPlaces(ladPlaces: LADPlace[]) {
    this.ladPlaces = ladPlaces;
  }

  onDelete(row: LADPlace): void {
    const title = `حذف رکورد ${row.LADPlaceId}`;
    const message = `آیا می‌خواهید رکورد با عنوان ${row.LADPlaceTitle} و کد ${row.LADPlaceId} حذف شود؟`;

    this.confirmationService.confirm({
      message,
      header: title,
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,

      rejectLabel: 'لغو',
      rejectButtonProps: {
        label: 'لغو',
        severity: 'secondary',
        outlined: true,
      },

      acceptLabel: 'تایید',
      acceptButtonProps: {
        label: 'تایید',
        severity: 'danger',
      },
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.deleteLadPlaces(row.LADPlaceId);
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  async onEdit(row: LADPlace) {
    if (this.loading) return;
    const ladPlace = await this.getLadPlace(row.LADPlaceId);
    if (!ladPlace) return;

    this.cashedLadPlace = ladPlace;
    this.populateLadPlaceForm(ladPlace);
    this.headerTitle = `ویرایش فرم کد ${ladPlace.LADPlaceId}`;
    this.formDialogVisible = true;
  }

  async onNew() {
    if (this.loading) return;
    this.cashedLadPlace = this.extractLadPlaceFromForm();
    this.headerTitle = 'افزودن';
    this.formDialogVisible = true;
  }

  onCloseDialog() {
    this.resetLadPlacesForm();
    this.headerTitle = '';
  }

  async registerOrEdit() {
    try {
      this.loadingService.setLoading(true);
      const id = this.ladPlacesId.value;
      id === 0 ? await this.registerLadPlace() : await this.editLadPlace();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private resetLadPlacesForm() {
    this.ladPlacesForm.reset();
    this.ladPlacesForm.markAsUntouched();
    this.ladPlacesId.setValue(0);
    this.loadingActive.setValue(true);
    this.dischargingActive.setValue(true);
    this.cashedLadPlace = undefined;
  }

  private async updateLoadingAndDischarging(
    id: number,
  ): Promise<ApiResponse<ShortResponse>[]> {
    const responses: ApiResponse<ShortResponse>[] = [];

    if (this.cashedLadPlace?.LoadingActive !== this.loadingActive.value) {
      responses.push(await this.ladPlaceService.ChangeLoadingPlaceStatus(id));
    }

    if (
      this.cashedLadPlace?.DischargingActive !== this.dischargingActive.value
    ) {
      responses.push(
        await this.ladPlaceService.ChangeDischargingPlaceStatus(id),
      );
    }

    return responses;
  }

  private async editLadPlace() {
    if (this.ladPlacesForm.invalid || this.ladPlacesId.value === 0) return;

    try {
      const ladPlace = this.extractLadPlaceFromForm();
      const response = await this.ladPlaceService.UpdateLADPlace(ladPlace);
      if (!this.handleResponse(response)) return;

      const changes = await this.updateLoadingAndDischarging(
        ladPlace.LADPlaceId,
      );
      const hasError = changes.some((res) => !this.handleResponse(res));

      if (hasError) return;
      this.toast.success('موفق', response.data?.Message ?? '');
    } finally {
      this.updateTable();
      this.closeDialog();
    }
  }

  private async registerLadPlace() {
    if (this.ladPlacesForm.invalid || this.ladPlacesId.value !== 0) return;
    try {
      const ladPlace = this.extractLadPlaceFromForm();
      const response = await this.ladPlaceService.RegisterNewLADPlace(ladPlace);

      if (!this.handleResponse(response)) return;

      const changes = await this.updateLoadingAndDischarging(
        response.data!.LADPlaceId,
      );
      const hasError = changes.some((res) => !this.handleResponse(res));

      if (hasError) return;

      this.populateLadPlaceForm({
        ...ladPlace,
        LADPlaceId: response.data?.LADPlaceId ?? 0,
      });
    } finally {
      this.updateTable();
      this.closeDialog();
    }
  }

  private async deleteLadPlaces(id: number) {
    const response = await this.ladPlaceService.DeleteLADPlace(id);
    if (!this.handleResponse(response)) return;
    this.toast.success('موفق', response.data?.Message ?? '');
    this.updateTable();
  }
  private closeDialog() {
    this.formDialogVisible = false;
    this.ladPlacesForm.reset();
    this.headerTitle = '';
  }

  private handleResponse(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد',
      );
      if (response.error?.code === ErrorCodes.NoRecordFound) {
        return true;
      }
      return false;
    }
    return true;
  }

  private async getLadPlace(id: number): Promise<LADPlace | undefined> {
    const response = await this.ladPlaceService.GetLADPlace(id);
    return this.handleResponse(response) ? response.data! : undefined;
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
