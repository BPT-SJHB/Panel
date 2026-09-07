export interface ChatMessage {
  id: string;
  senderId?: number;
  senderType?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface CreateChatMessageRequest {
  message: string;
  attachments?: string[];
}

export interface TicketCreateRequest {
  title: string;
  body: string;
  departmentId: number;
  ticketTypeId: number;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  userId?: number;
  phoneNumber?: string;
  departmentId: number;
  ticketTypeId: number;
  ticketStatusId: number;
  title: string;
  trackCode: string;
  createdAt: string;
  updatedAt: string;
  chat: ChatMessage[];
}

export interface TicketQueryParams {
  page?: number; // page number
  pageSize?: number; // items per page
  ticketStatusId?: number; // optional filter
  ticketTypeId?: number; // optional filter
  userId?: number; // optional filter
  departmentId?: number; // optional filter
  orderBy?: string; // field to order by
  orderDir?: 'asc' | 'desc'; // asc or desc
}
