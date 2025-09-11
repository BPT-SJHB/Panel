import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppConfirmService {
  private confirmationService = inject(ConfirmationService);

  // حذف
  confirmDelete(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید حذف',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را حذف کنید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'حذف',
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
      header: 'تأیید ویرایش',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را ویرایش کنید؟`,
      icon: 'pi pi-pencil',
      acceptLabel: 'ویرایش',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'warning' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // آزاد کردن خط
  confirmFreeLine(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تایید خط آزاد بار',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را آزاد کنید`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'آزاد کردن',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'warning' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // رسوب کردن
  confirmSediment(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تایید رسوب بار',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را رسوب کنید؟`,
      icon: 'pi pi-box',
      acceptLabel: 'رسوب کردن',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'info' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // لغو
  confirmCancel(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید کنسلی بار',
      message: `آیا می‌خواهید <b><u>${itemName}</u></b> را کنسل کنید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'کنسل',
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

  confirmTurnAction(
    action: 'activate' | 'deactivate',
    itemName: string,
    accept: () => void
  ) {
    const config = {
      activate: {
        header: 'تأیید احیا نوبت',
        message: `آیا از احیا نوبت <b><u>${itemName}</u></b> مطمئن هستید؟`,
        icon: 'pi pi-refresh',
        acceptLabel: 'احیا نوبت',
        acceptSeverity: 'info' as const,
      },
      deactivate: {
        header: 'تأیید ابطال نوبت',
        message: `آیا از ابطال نوبت <b><u>${itemName}</u></b> مطمئن هستید؟`,
        icon: 'pi pi-times',
        acceptLabel: 'ابطال نوبت',
        acceptSeverity: 'danger' as const,
      },
    }[action];

    this.confirmationService.confirm({
      header: config.header,
      message: config.message,
      icon: config.icon,
      acceptLabel: config.acceptLabel,
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: config.acceptSeverity },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }
}
