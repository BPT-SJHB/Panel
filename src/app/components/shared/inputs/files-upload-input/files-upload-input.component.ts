import { Component, inject, input, output, signal } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { uuidV4 } from 'app/utils/uuid';
import { ToastService } from 'app/services/toast-service/toast.service';

export enum UploadFileStatus {
  Success,
  Uploading,
  Failed,
}

export interface UploadFile {
  id: string;
  status: UploadFileStatus;
  raw: File;
  progress: number;
}

@Component({
  selector: 'app-files-upload-input',
  imports: [
    FileUploadModule,
    ProgressBarModule,
    ButtonModule,
    CardModule,
    BadgeModule,
  ],
  templateUrl: './files-upload-input.component.html',
  styleUrls: ['./files-upload-input.component.scss'],
})
export class FilesUploadInputComponent {
  private readonly config = inject(PrimeNG);
  private toast = inject(ToastService);
  readonly files = signal<UploadFile[]>([]);

  readonly cancelLabel = input('انصراف');
  readonly uploadLabel = input('آپلود فایل');
  readonly chooseLabel = input('انتخاب فایل');
  readonly maxFileSize = input(1024 * 1024);
  readonly accept = input('image/*');
  readonly fileLimit = input(3);

  readonly uploadFn =
    input<
      (
        file: UploadFile,
        onProgress: (p: number) => void,
        abort?: AbortController
      ) => Promise<void>
    >();

  UploadFileStatus = UploadFileStatus;
  removeUploadFile = output<UploadFile>();

  onSelectedFiles(event: FileSelectEvent): void {
    const selectedFiles = event.files ?? [];
    const validFiles: UploadFile[] = [];

    for (const file of selectedFiles) {
      // 🔸 Check file size
      if (file.size > this.maxFileSize()) {
        this.toast.error('خطا', `حجم فایل "${file.name}" بیش از حد مجاز است.`);
        continue;
      }

      // 🔸 Check file type
      if (!this.verifyAccept(file)) {
        this.toast.error('خطا', `نوع فایل "${file.name}" مجاز نیست.`);
        continue;
      }

      // 🔸 Create upload file object
      validFiles.push({
        id: uuidV4(),
        raw: file,
        status: UploadFileStatus.Uploading,
        progress: 0,
      });
    }

    // 🔸 Check total file count limit
    const totalFiles = this.files().length + validFiles.length;

    if (totalFiles > this.fileLimit()) {
      this.toast.error(
        'خطا',
        `حداکثر مجاز به انتخاب ${this.fileLimit()} فایل هستید.`
      );
      return;
    }

    // 🔸 Add valid files and start uploading
    this.files.update((existing) => [...existing, ...validFiles]);

    for (const file of validFiles) {
      this.startUpload(file);
    }
  }
  private async startUpload(file: UploadFile) {
    const fn = this.uploadFn();
    if (!fn) {
      this.toast.error('خطا', 'تابع آپلود تنظیم نشده است.');
      return;
    }

    try {
      await fn(file, (p) => this.updateProgress(file.id, p));
      this.updateProgress(file.id, 100);
      setTimeout(() => {
        this.updateStatus(file.id, UploadFileStatus.Success);
      }, 1000);
    } catch (err) {
      this.updateStatus(file.id, UploadFileStatus.Failed);
    }
  }

  private updateProgress(id: string, progress: number) {
    this.files.update((list) =>
      list.map((f) => (f.id === id ? { ...f, progress } : f))
    );
  }

  private updateStatus(id: string, status: UploadFileStatus) {
    this.files.update((list) =>
      list.map((f) => (f.id === id ? { ...f, status } : f))
    );
  }

  onRemoveTemplatingFile(
    event: Event,
    fileToRemove: UploadFile,
    removeFileCallback: (event: Event, index: number) => void,
    index: number
  ): void {
    removeFileCallback(event, index);

    // Remove file from list
    this.files.update((files) =>
      files.filter((file) => {
        if (file.id === fileToRemove.id) {
          this.removeUploadFile.emit(file);
          return false;
        }
        return true;
      })
    );
  }

  onClearTemplatingUpload(clear: () => void): void {
    clear();

    // Cancel all uploads
    this.files().forEach((file) => this.removeUploadFile.emit(file));
    this.files.set([]);
  }

  verifyAccept(file: File): boolean {
    const allowed = this.accept()
      .split(',')
      .map((x) => x.trim());
    return (
      allowed.includes(file.type) ||
      allowed.includes(file.type.split('/')[0] + '/*')
    );
  }

  formatSize(bytes: number): string {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes ?? [];
    if (bytes === 0) return `0 ${sizes[0] ?? 'B'}`;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formatted} ${sizes[i] ?? 'B'}`;
  }

  choose(_: Event, callback: () => void): void {
    callback();
  }

  clearAll() {
    this.onClearTemplatingUpload(() => {
      // empty function
    });
  }

  // can call by parent
  SetUploadFiles(uploadFiles: UploadFile[]) {
    this.files.set(uploadFiles);
  }
}
