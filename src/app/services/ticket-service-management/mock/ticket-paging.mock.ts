import { PagingResponse } from '../model/paging-response.model';
import { Ticket } from '../model/ticket.model';

// داده‌ی ماک
export const mockTicketPaging: PagingResponse<Ticket> = {
  items: [
    {
      id: '1',
      userId: 101,
      departmentId: 5,
      ticketTypeId: 2,
      ticketStatusId: 1,
      title: 'مشکل در ورود به سیستم',
      trackCode: 'TRK-0001',
      createdAt: '2025-09-26T12:00:00Z',
      updatedAt: '2025-09-26T12:30:00Z',
      chat: [],
    },
    {
      id: '2',
      userId: 102,
      departmentId: 3,
      ticketTypeId: 1,
      ticketStatusId: 2,
      title: 'پرداخت انجام نشد',
      trackCode: 'TRK-0002',
      createdAt: '2025-09-25T09:15:00Z',
      updatedAt: '2025-09-25T09:45:00Z',
      chat: [],
    },
    {
      id: '3',
      userId: 103,
      departmentId: 2,
      ticketTypeId: 1,
      ticketStatusId: 1,
      title: 'مشکل در ارسال ایمیل',
      trackCode: 'TRK-0003',
      createdAt: '2025-09-24T11:00:00Z',
      updatedAt: '2025-09-24T11:30:00Z',
      chat: [],
    },
    {
      id: '4',
      userId: 104,
      departmentId: 4,
      ticketTypeId: 3,
      ticketStatusId: 1,
      title: 'کندی در بارگذاری صفحه',
      trackCode: 'TRK-0004',
      createdAt: '2025-09-23T08:15:00Z',
      updatedAt: '2025-09-23T08:45:00Z',
      chat: [],
    },
    {
      id: '5',
      userId: 105,
      departmentId: 1,
      ticketTypeId: 2,
      ticketStatusId: 3,
      title: 'پشتیبانی برای محصول جدید',
      trackCode: 'TRK-0005',
      createdAt: '2025-09-22T07:10:00Z',
      updatedAt: '2025-09-22T07:30:00Z',
      chat: [],
    },
  ],
  total: 10, // کل رکوردها
  page: 1, // صفحه فعلی
  page_size: 5, // تعداد آیتم در هر صفحه
  total_pages: 2, // تعداد کل صفحات
};
