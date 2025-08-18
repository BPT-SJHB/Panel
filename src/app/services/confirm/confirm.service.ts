import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppConfirmService {
  private confirmationService = inject(ConfirmationService);

  // حذف
  confirmDelete(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید حذف',
      message: `آیا مطمئن هستید که می‌خواهید آیتم <b><u>${itemName}</u></b> را حذف کنید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'حذف',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // ویرایش
  confirmEdit(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید ویرایش',
      message: `آیا از ویرایش <b><u>${itemName}</u></b> اطمینان دارید؟`,
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
      header: 'تأیید آزاد کردن خط',
      message: `آیا از آزاد کردن خط <b><u>${itemName}</u></b> اطمینان دارید؟`,
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
      header: 'تأیید رسوب کردن بار',
      message: `آیا از رسوب کردن <b><u>${itemName}</u></b> اطمینان دارید؟`,
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
      message: `آیا از کنسلی <b><u>${itemName}</u></b> اطمینان دارید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'کنسل',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }

  // کنسل کردن تخصیص بار
  confirmCancelAllocationLoad(itemName: string, accept: () => void) {
    this.confirmationService.confirm({
      header: 'تأیید کنسل کردن تخصیص بار',
      message: `آیا از کسنل کردن تخصیص <b><u>${itemName}</u></b> اطمینان دارید؟`,
      icon: 'pi pi-times',
      acceptLabel: 'تایید',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept,
    });
  }
}
