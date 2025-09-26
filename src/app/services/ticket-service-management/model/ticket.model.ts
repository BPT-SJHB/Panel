export interface ChatMessage {
  id: string;
  senderId: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
}

export interface CreateChatMessageRequest {
  senderId: number;
  message: string;
  attachments: string[];
}

export interface TicketCreateRequest {
  userId: number;
  departmentId: number;
  ticketTypeId: number;
  title: string;
  body: string;
  attachments: string[];
}

export interface Ticket {
  id: string;
  userId: number;
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
  page_size?: number; // items per page

  status?: number; // optional filter
  user_id?: number; // optional filter
  departmentId?: number; // optional filter

  order_by?: string; // field to order by
  order_dir?: 'asc' | 'desc'; // asc or desc
}
