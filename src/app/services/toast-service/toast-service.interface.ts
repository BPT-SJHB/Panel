// اینترفیس IToastService برای تعریف ساختار سرویس پیام‌های Toast استفاده می‌شود
export interface IToastService {
  /**
   * این متد یک پیام موفقیت (مثلاً برای عملیات انجام شده با موفقیت) نمایش می‌دهد
   * @param summary عنوان پیام
   * @param detail متن توضیحات پیام
   */
  success(summary: string, detail: string): void;

  /**
   * این متد یک پیام خطا نمایش می‌دهد (مثلاً زمانی که یک عملیات با خطا مواجه شده است)
   * @param summary عنوان پیام
   * @param detail متن توضیحات پیام
   */
  error(summary: string, detail: string): void;

  /**
   * این متد یک پیام اطلاع‌رسانی عمومی نمایش می‌دهد (مثلاً برای نکات یا اطلاعات جانبی)
   * @param summary عنوان پیام
   * @param detail متن توضیحات پیام
   */
  info(summary: string, detail: string): void;
}
