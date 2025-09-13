import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppConfirmService {
  private confirmationService = inject(ConfirmationService);

  // حذف
  confirmDelete(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید حذف بار',
      message: `آیا از حذف بار اطمینان دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // ثبت
  confirmSubmit(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید ثبت',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را ثبت کنید؟`,
      icon: 'pi pi-check-circle',
      acceptLabel: 'ثبت',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'success' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // ویرایش
  confirmEdit(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید ویرایش بار',
      message: `آیا از ویرایش بار اطمینان دارید؟`,
      icon: 'pi pi-pencil',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'info' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // آزاد کردن خط
  confirmFreeLine(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تایید خط آزاد بار',
      message: `آیا از خط آزاد کردن بار اطمینان دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'warn' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // رسوب کردن
  confirmSediment(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تایید رسوب بار',
      message: `آیا از رسوب بار اطمینان دارید؟`,
      icon: 'pi pi-box',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'warn' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // کنسل کردن بار
  confirmLoadCancel(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید کنسلی بار',
      message: `آیا از کنسلی بار اطمینان دارید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'warn' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // کنسل کردن تخصیص بار
  confirmLoadAllocationCancel(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید کنسلی تخصیص بار',
      message: `آیا از کنسلی تخصیص <b><u>${itemName}</u></b> اطمینان دارید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // غیرفعال سازی تعرفه ها
  confirmDisableTarrifs(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید غیرفعال سازی تعرفه ها',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را غیرفعال کنید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'تأیید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // انتخاب
  confirmChoose(
    itemName: string,
    accept: () => void,
    reject?: () => void
  ): void {
    this.confirmationService.confirm({
      header: 'تأیید انتخاب',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را انتخاب کنید؟`,
      icon: 'pi pi-question-circle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonProps: { severity: 'info' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
      reject,
    });
  }
}
