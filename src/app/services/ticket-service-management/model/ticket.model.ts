export interface ChatMessage {
  id: string;
  senderId: number;
  message: string;
  createdAt: string;
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
