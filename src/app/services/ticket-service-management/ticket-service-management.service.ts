import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';

// Models
import { TicketUser } from './model/ticket-user.model';
import { TicketType } from './model/ticket-type.model';
import {
  ChatMessage,
  CreateChatMessageRequest,
  Ticket,
  TicketCreateRequest,
  TicketQueryParams,
} from './model/ticket.model';
import { Department } from './model/department.model';
import { TicketCaptcha } from './model/ticket-captcha.model';
import { TicketStatus } from './model/ticket-status.model';
import { PagingResponse } from './model/paging-response.model';

// Mock data
import { mockTicketTypes } from './mock/ticket-type.mock';
import { mockTicketUser } from './mock/ticket-user.mock';
import { mockTickets } from './mock/ticket.mock';
import { mockDepartments } from './mock/department.mock';
import { mockTicketCaptcha } from './mock/ticket-captcha.mock';
import { mockTicketStatuses } from './mock/ticket-status.mock';
import { mockTicketPaging } from './mock/ticket-paging.mock';

@Injectable({
  providedIn: 'root',
})
export class TicketServiceManagementService {
  // Inject API communication service (for real API calls later)
  private apiCommunicator = inject(APICommunicationManagementService);

  /**
   * Get ticket user by username
   * (Currently returns mock data. Replace with API call if needed.)
   */
  public async GetTicketUserByUsername(
    username: string
  ): Promise<ApiResponse<TicketUser>> {
    return Promise.resolve({
      success: true,
      data: mockTicketUser,
    });
  }

  /**
   * Get all ticket types.
   * (Mock implementation.)
   */
  public async GetTicketTypes(): Promise<ApiResponse<TicketType[]>> {
    return Promise.resolve({
      success: true,
      data: mockTicketTypes,
    });
  }

  /**
   * Get all departments.
   * (Mock implementation.)
   */
  public async GetDepartments(): Promise<ApiResponse<Department[]>> {
    return Promise.resolve({
      success: true,
      data: mockDepartments,
    });
  }

  /**
   * Get all ticket statuses.
   * (Mock implementation.)
   */
  public async GetTicketStatuses(): Promise<ApiResponse<TicketStatus[]>> {
    return Promise.resolve({
      success: true,
      data: mockTicketStatuses,
    });
  }

  /**
   * Create a new ticket.
   * (Currently uses mockTickets to generate a fake response.)
   */
  public async CreateTicket(
    ticket: TicketCreateRequest
  ): Promise<ApiResponse<{ id: string; trackCode: string }>> {
    return Promise.resolve({
      success: true,
      data: {
        id: mockTickets[0].id ?? crypto.randomUUID(),
        trackCode:
          mockTickets[0].trackCode ??
          Math.random().toString(36).substring(2, 8),
      },
    });
  }

  /**
   * Get a ticket by its track code.
   */
  public async GetTicketByTrackCode(
    trackCode: string,
    username: string
  ): Promise<ApiResponse<Ticket>> {
    const found = mockTickets.find((t) => t.trackCode === trackCode);

    return Promise.resolve({
      success: !!found,
      data: found,
      error: found
        ? undefined
        : { code: 404, message: 'Not found', details: 'Ticket not found' },
    });
  }

  /**
   * Get a ticket by its ID.
   */
  public async GetTicketById(id: string): Promise<ApiResponse<Ticket>> {
    const found = mockTickets.find((t) => t.id === id);

    return Promise.resolve({
      success: !!found,
      data: found,
      error: found
        ? undefined
        : { code: 404, message: 'Not found', details: 'Ticket not found' },
    });
  }

  /**
   * Get CAPTCHA for ticket creation.
   */
  public async GetCaptcha(): Promise<ApiResponse<TicketCaptcha>> {
    return Promise.resolve({
      success: true,
      data: mockTicketCaptcha,
    });
  }

  /**
   * Verify CAPTCHA answer.
   */
  public async VerifyCaptcha(
    id: string,
    answer: string
  ): Promise<ApiResponse<null>> {
    return Promise.resolve({
      success: true,
      data: null,
    });
  }

  /**
   * Create a chat message on a ticket.
   */
  public async CreateChat(
    ticketId: string,
    chat: CreateChatMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    return Promise.resolve({
      success: true,
      data: {
        ...chat,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  /**
   * Get tickets with paging support.
   * (Currently returns mockTicketPaging.)
   */
  public async GetTickets(
    query: TicketQueryParams
  ): Promise<ApiResponse<PagingResponse<Ticket>>> {
    return Promise.resolve({
      success: true,
      data: mockTicketPaging,
    });
  }
}
