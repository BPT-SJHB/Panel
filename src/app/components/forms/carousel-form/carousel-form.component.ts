import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Dialog } from 'primeng/dialog';

import { BaseLoading } from '../shared/component-base/base-loading';
import { CarouselManagementService } from 'app/services/carousel-management/carousel-management.service';
import { AppConfirmService } from 'app/services/confirm/confirm.service';

import { CarouselInfo } from 'app/services/carousel-management/model/carousel-info.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';

import {
  TableComponent,
  TableColumn,
  TableColumnType,
  editCell,
  deleteCell,
} from 'app/components/shared/table/table.component';

import {
  FilesUploadInputComponent,
  UploadFile,
  UploadFileStatus,
} from 'app/components/shared/inputs/files-upload-input/files-upload-input.component';

import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';

import {
  base64ToFile,
  detectImageMime,
  fileToBase64Raw,
} from 'app/utils/image.utils';
import { uuidV4 } from 'app/utils/uuid';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CheckIcon } from 'primeng/icons';

// ---------------------
// Types
// ---------------------
type CarouselInfoRow = CarouselInfo & {
  edit: string;
  delete: string;
  picIcon: string;
};

enum DialogFormType {
  REGISTER,
  EDIT,
}

interface SelectedImage {
  src: string;
  alt: string;
  loaded: boolean;
  hasError: boolean;
}
// ---------------------
// Component
// ---------------------
@Component({
  selector: 'app-carousel-form',
  standalone: true,
  imports: [
    Dialog,
    TableComponent,
    TextInputComponent,
    BinaryRadioInputComponent,
    FilesUploadInputComponent,
    ButtonComponent,
    ProgressSpinner,
  ],
  templateUrl: './carousel-form.component.html',
  styleUrls: ['./carousel-form.component.scss'],
})
export class CarouselFormComponent extends BaseLoading {
  @ViewChild(FilesUploadInputComponent)
  fileUploadInput?: FilesUploadInputComponent;

  // ---------------------
  // Services
  // ---------------------
  private readonly carouselService = inject(CarouselManagementService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly fb = inject(FormBuilder);

  DialogFormType = DialogFormType;

  // ---------------------
  // Signals & State
  // ---------------------
  readonly carousels = signal<CarouselInfoRow[]>([]);
  readonly selectedPic = signal<SelectedImage | null>(null);
  readonly carouselRadio = new FormControl(true);
  readonly dialogFormType = signal<DialogFormType>(DialogFormType.REGISTER);
  readonly dialogTitle = signal<string>('ثبت کاروسل');

  readonly addonWidth = '6rem';
  isPicVisible = false;
  isMainFormVisible = false;

  // ---------------------
  // Table
  // ---------------------
  readonly columns: TableColumn<CarouselInfoRow>[] = [
    { header: 'شناسه', field: 'CId' },
    { header: 'عنوان', field: 'CTitle' },
    { header: 'آدرس (URL)', field: 'URL' },
    { header: 'توضیحات', field: 'Description' },
    { header: 'تاریخ', field: 'ShamsiDate' },
    { header: 'زمان', field: 'Time' },
    {
      header: 'فعال',
      field: 'Active',
      type: TableColumnType.CHECKBOX,
      onAction: (row) => this.changeCarouselStatus(row),
    },
    {
      header: 'تصویر',
      field: 'picIcon',
      type: TableColumnType.BUTTON_ICON,
      class: editCell.config.class,
      onAction: (row) => this.showPicture(row),
    },
    {
      ...editCell.config,
      field: 'edit',
      onAction: (row) => this.onEdit(row),
    },
    {
      ...deleteCell.config,
      field: 'delete',
      onAction: (row) => this.deleteCarousel(row.CId),
    },
  ];

  // ---------------------
  // Form
  // ---------------------
  readonly carouselForm = this.fb.group({
    carouselId: this.fb.control<number | null>(null),
    title: this.fb.nonNullable.control('', ValidationSchema.title),
    url: this.fb.nonNullable.control('', ValidationSchema.URL.validators[1]),
    description: this.fb.nonNullable.control('', ValidationSchema.description),
    picture: this.fb.nonNullable.control(''),
  });

  // ---------------------
  // Lifecycle
  // ---------------------
  override ngOnInit(): void {
    super.ngOnInit();
    this.loadActiveCarousels();

    this.carouselRadio.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.refreshList();
      });
  }

  // ---------------------
  // Data Loading
  // ---------------------
  private async loadAllCarousels(): Promise<void> {
    if (this.loading()) return;

    await this.withLoading(async () => {
      const res = await this.carouselService.GetAllCarousels();
      if (!checkAndToastError(res, this.toast)) return;
      this.carousels.set(this.mapResponse(res.data));
    });
  }

  private async loadActiveCarousels(): Promise<void> {
    if (this.loading()) return;

    await this.withLoading(async () => {
      const res = await this.carouselService.GetAllActiveCarousels();
      if (!checkAndToastError(res, this.toast)) return;
      this.carousels.set(this.mapResponse(res.data));
    });
  }

  private mapResponse(data: CarouselInfo[]): CarouselInfoRow[] {
    return data.map((d) => ({
      ...d,
      edit: editCell.value,
      delete: deleteCell.value,
      picIcon: 'pi pi-image',
    }));
  }

  // ---------------------
  // Actions
  // ---------------------
  private async deleteCarousel(id: number): Promise<void> {
    this.confirmService.confirmDelete(`کاروسل با شناسه ${id}`, async () => {
      await this.withLoading(async () => {
        const res = await this.carouselService.DeleteCarousel(id);
        if (checkAndToastError(res, this.toast)) {
          this.toast.success('موفق', res.data.Message);
        }
      });

      await this.refreshList();
    });
  }

  async showPicture(row: CarouselInfo) {
    const selectedPic = {
      src: '',
      loaded: false,
      alt: '',
      hasError: false,
    };

    this.selectedPic.set(selectedPic);

    this.isPicVisible = true;
    const response = await this.carouselService.GetCarouselPic(row.CId);

    if (!checkAndToastError(response, this.toast)) {
      this.selectedPic.set({
        ...selectedPic,
        loaded: true,
        hasError: true,
        alt: row.CTitle,
      });
      return;
    }

    const pic = response.data.Picture;
    this.selectedPic.set({
      ...selectedPic,
      loaded: true,
      hasError: false,
      alt: row.CTitle,
      src: `data:${detectImageMime(pic)};base64,${pic}`,
    });
  }

  onNew(): void {
    this.dialogFormType.set(DialogFormType.REGISTER);
    this.carouselForm.reset();
    this.dialogTitle.set('ثبت کاروسل');
    this.isMainFormVisible = true;
    this.fileUploadInput?.clearAll();
  }

  onEdit(row: CarouselInfo): void {
    this.dialogFormType.set(DialogFormType.EDIT);
    this.dialogTitle.set('ویرایش  کاروسل');
    this.isMainFormVisible = true;

    this.carouselForm.patchValue({
      carouselId: row.CId,
      title: row.CTitle,
      url: row.URL,
      description: row.Description,
      picture: row.Picture,
    });

    if (!row.Picture) {
      this.fileUploadInput?.clearAll();
      return;
    }

    this.fileUploadInput?.SetUploadFiles([
      {
        id: uuidV4(),
        progress: 100,
        status: UploadFileStatus.Success,
        raw: base64ToFile(
          row.Picture,
          row.CTitle,
          detectImageMime(row.Picture)
        ),
      },
    ]);
  }

  async changeCarouselStatus(row: CarouselInfo) {
    if (this.loading()) {
      row.Active = !row.Active;
      return;
    }

    await this.withLoading(async () => {
      const response = await this.carouselService.ChangeCarouselStatus(
        row.CId,
        row.Active
      );
      if (!checkAndToastError(response, this.toast)) {
        row.Active = !row.Active;
        return;
      }
      this.toast.success('موفق', response.data.Message);
    });

    this.refreshList();
  }

  async registerOrEdit() {
    if (this.loading() || this.isFormInvalid()) return;

    await this.withLoading(async () => {
      if (this.dialogFormType() === DialogFormType.EDIT)
        await this.editCarousel();
      else await this.registerCarousel();
    });

    this.isMainFormVisible = false;
    await this.refreshList();
  }

  private async registerCarousel() {
    const response = await this.carouselService.RegisterCarousel(
      this.ctrl('title').value,
      this.ctrl('url').value,
      this.ctrl('description').value,
      this.ctrl('picture').value
    );

    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
  }

  private async editCarousel() {
    const response = await this.carouselService.EditCarousel(
      this.ctrl('carouselId').value,
      this.ctrl('title').value,
      this.ctrl('url').value,
      this.ctrl('description').value,
      this.ctrl('picture').value
    );

    if (!checkAndToastError(response, this.toast)) return;
    this.toast.success('موفق', response.data.Message);
  }

  // ---------------------
  // Helpers
  // ---------------------
  ctrl<T extends keyof typeof this.carouselForm.controls>(name: T) {
    return this.carouselForm.controls[name] as FormControl;
  }

  uploadImage = async (file: UploadFile) => {
    const base64 = await fileToBase64Raw(file.raw);
    this.ctrl('picture').setValue(base64);
  };

  private async refreshList() {
    if (this.carouselRadio.value) await this.loadActiveCarousels();
    else await this.loadAllCarousels();
  }

  isFormInvalid() {
    if (this.carouselForm.invalid) return true;

    const isUrlInvalid =
      this.ctrl('url').invalid || this.ctrl('url').value?.trim() === '';
    const isPictureInvalid =
      this.ctrl('picture').invalid || !this.ctrl('picture').value;

    return isUrlInvalid && isPictureInvalid;
  }

  onImageLoad() {
    const selectedPic = this.selectedPic();
    if (!selectedPic) return;

    this.selectedPic.update((_) => ({
      ...selectedPic,
      loaded: true,
    }));
  }
}
