import { TicketType } from '../model/ticket-type.model';
export const mockTicketTypes: TicketType[] = [
  {
    id: 1,
    title: 'سوال عمومی',
    description: 'پرسش‌های عمومی کاربران در مورد سیستم یا خدمات',
  },
  {
    id: 2,
    title: 'مشکل فنی',
    description:
      'مشکلات نرم‌افزاری یا سخت‌افزاری که کاربران با آن مواجه شده‌اند',
  },
  {
    id: 3,
    title: 'درخواست تغییر',
    description: 'درخواست کاربران برای تغییر یا بهبود ویژگی‌ها',
  },
  {
    id: 4,
    title: 'گزارش خطا',
    description: 'گزارش باگ‌ها یا خطاهای مشاهده شده در سیستم',
  },
  {
    id: 5,
    title: 'پیشنهاد',
    description: 'پیشنهادات کاربران برای بهبود خدمات یا تجربه کاربری',
  },
];
