
import { PagingResponse } from '../model/paging-response.model';
import { Ticket } from '../model/ticket.model';

// Generate 30 mock tickets
const generateMockTickets = (): Ticket[] => {
  const titles = [
    'مشکل در ورود به سیستم',
    'پرداخت انجام نشد',
    'مشکل در ارسال ایمیل',
    'کندی در بارگذاری صفحه',
    'پشتیبانی برای محصول جدید',
    'خطا در ثبت سفارش',
    'عدم دریافت اعلان‌ها',
    'مشکل در ویرایش پروفایل',
    'خطای اتصال به سرور',
    'درخواست تغییر رمز عبور',
  ];

  const tickets: Ticket[] = [];
  for (let i = 1; i <= 30; i++) {
    tickets.push({
      id: i.toString(),
      userId: 100 + i,
      departmentId: (i % 5) + 1,
      ticketTypeId: (i % 3) + 1,
      ticketStatusId: (i % 3) + 1,
      title: titles[i % titles.length],
      trackCode: `TRK-${i.toString().padStart(4, '0')}`,
      createdAt: new Date(2025, 8, 30 - i, 8 + (i % 5), i % 60).toISOString(),
      updatedAt: new Date(2025, 8, 30 - i, 8 + (i % 5), (i + 30) % 60).toISOString(),
      chat: [],
    });
  }
  return tickets;
};

export const mockTicketPaging: PagingResponse<Ticket> = {
  items: generateMockTickets(), // first page items
  total: 30, // total records
  page: 1, // current page
  pageSize: 5, // items per page
  totalPages: 6, // total pages
};

