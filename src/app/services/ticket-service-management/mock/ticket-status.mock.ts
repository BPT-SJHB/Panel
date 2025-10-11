import { TicketStatus } from '../model/ticket-status.model';

export const mockTicketStatuses: TicketStatus[] = [
  {
    id: 1,
    title: 'باز',
    descriptions: 'تیکت ایجاد شده و در انتظار بررسی است.',
  },
  {
    id: 2,
    title: 'در حال انجام',
    descriptions: 'تیکت توسط تیم پشتیبانی در حال بررسی یا پیگیری است.',
  },
  {
    id: 3,
    title: 'در انتظار',
    descriptions: 'تیکت منتظر اطلاعات اضافی از سوی درخواست‌دهنده است.',
  },
  {
    id: 4,
    title: 'حل شده',
    descriptions: 'تیکت با موفقیت بررسی و حل شده است.',
  },
  {
    id: 5,
    title: 'بسته شده',
    descriptions: 'تیکت بسته شده و نیازی به اقدام بیشتر نیست.',
  },
];
