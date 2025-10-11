import { Department } from '../model/department.model';

export const mockDepartments: Department[] = [
  {
    id: 1,
    title: 'پشتیبانی فنی',
    description: 'رفع مشکلات فنی کاربران و پاسخ به سوالات مربوط به نرم‌افزار',
  },
  {
    id: 2,
    title: 'فروش',
    description: 'پاسخگویی به سوالات مربوط به محصولات و خدمات و ثبت سفارش‌ها',
  },
  {
    id:3,
    title: 'مالی',
    description: 'مدیریت پرداخت‌ها، فاکتورها و مسائل مالی کاربران',
  },
  {
    id: 4,
    title: 'بازاریابی',
    description: 'تبلیغات، کمپین‌ها و ارتباط با مشتریان',
  },
  {
    id: 5,
    title: 'پشتیبانی مشتریان',
    description: 'پیگیری تیکت‌ها و پاسخ به سوالات عمومی کاربران',
  },
];
