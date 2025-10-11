import { Ticket } from '../model/ticket.model';

export const mockTickets: Ticket[] = [
  {
    id: '18b3479f-3060-449f-a2ce-36112bf35e35',
    userId: 101,
    departmentId: 1, // پشتیبانی فنی
    ticketTypeId: 2, // مشکل فنی
    ticketStatusId: 1, // باز
    title: 'مشکل ورود به سیستم',
    trackCode: 'ABCD1234',
    createdAt: new Date('2025-09-20T10:00:00Z').toISOString(),
    updatedAt: new Date('2025-09-20T12:00:00Z').toISOString(),
    chat: [
      {
        id: '41062d8c-a50e-4d5f-a140-e5c0e311ac89',
        senderId: 101,
        message: 'من نمی‌توانم وارد حساب کاربری خود شوم.',
        createdAt: new Date('2025-09-20T10:05:00Z').toISOString(),
        updatedAt: new Date('2025-09-20T10:05:00Z').toISOString(),
        attachments: [],
      },
      {
        id: 'f80cf70b-7816-46a8-b0fd-7ac62315a4a0',
        senderId: 201, // support staff
        message: 'لطفاً بررسی کنید که رمز عبور صحیح است و دوباره تلاش کنید.',
        createdAt: new Date('2025-09-20T10:15:00Z').toISOString(),
        updatedAt: new Date('2025-09-20T10:15:00Z').toISOString(),
        attachments: [],
      },
    ],
  },
  {
    id: '7e126e06-649a-40e6-b807-3b871322ea1d',
    userId: 102,
    departmentId: 2, // فروش
    ticketTypeId: 1, // سوال عمومی
    ticketStatusId: 2, // بسته
    title: 'استعلام موجودی محصول',
    trackCode: 'EFGH5678',
    createdAt: new Date('2025-09-18T08:30:00Z').toISOString(),
    updatedAt: new Date('2025-09-18T09:00:00Z').toISOString(),
    chat: [
      {
        id: '69f7f30e-c713-4c0c-a834-8bed9ffb4374',
        senderId: 102,
        message: 'می‌خواستم بدانم محصول X موجود است یا خیر.',
        createdAt: new Date('2025-09-18T08:32:00Z').toISOString(),
        updatedAt: new Date('2025-09-18T08:32:00Z').toISOString(),
        attachments: [],
      },
      {
        id: '68186ad5-e681-47b1-8e14-3839eaac0d90',
        senderId: 202, // support staff
        message: 'بله، محصول در انبار موجود است و می‌توانید سفارش دهید.',
        createdAt: new Date('2025-09-18T08:45:00Z').toISOString(),
        updatedAt: new Date('2025-09-18T08:45:00Z').toISOString(),
        attachments: [],
      },
    ],
  },
  {
    id: 'd2dc69f5-2138-4d57-a50a-faed5cd7001c',
    userId: 103,
    departmentId: 3, // مالی
    ticketTypeId: 4, // گزارش خطا
    ticketStatusId: 1, // باز
    title: 'خطا در پرداخت فاکتور',
    trackCode: 'IJKL9012',
    createdAt: new Date('2025-09-19T14:20:00Z').toISOString(),
    updatedAt: new Date('2025-09-19T15:00:00Z').toISOString(),
    chat: [
      {
        id: '03bc34cf-b234-4210-838f-15638d478fd6',
        senderId: 103,
        message: 'پرداخت فاکتور شماره 123 با خطا مواجه شد.',
        createdAt: new Date('2025-09-19T14:22:00Z').toISOString(),
        updatedAt: new Date('2025-09-19T14:22:00Z').toISOString(),
        attachments: [],
      },
      {
        id: 'f360edc0-0465-4b86-ab52-8599c0051493',
        senderId: 203, // support staff
        message: 'لطفاً مجدداً تلاش کنید یا روش پرداخت دیگری انتخاب کنید.',
        createdAt: new Date('2025-09-19T14:35:00Z').toISOString(),
        updatedAt: new Date('2025-09-19T14:35:00Z').toISOString(),
        attachments: [],
      },
    ],
  },
];
