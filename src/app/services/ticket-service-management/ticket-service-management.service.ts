import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TicketUser } from './model/ticket-user.model';
import { mockTicketTypes } from './mock/ticket-type.mock';
import { mockTicketUser } from './mock/ticket-user.mock';
import { TicketType } from './model/ticket-type.model';
import { ChatMessage, Ticket, TicketCreateRequest } from './model/ticket.model';
import { mockTickets } from './mock/ticket.mock';
import { mockDepartments } from './mock/department.mock';
import { Department } from './model/department.model';
import { TicketCaptcha } from './model/ticket-captcha.model';
import { mockTicketCaptcha } from './mock/ticket-captcha.mock';
import { TicketStatus } from './model/ticket-status.model';
import { mockTicketStatuses } from './mock/ticket-status.mock';

@Injectable({
  providedIn: 'root',
})
export class TicketServiceManagementService {
  private apiCommunicator = inject(APICommunicationManagementService);

  /** Get ticket user by username */
  public async GetTicketUserByUsername(
    username: string
  ): Promise<ApiResponse<TicketUser>> {
    // Replace with API call if needed
    return Promise.resolve({
      success: true,
      data: mockTicketUser,
    });
  }

  /** Get ticket types */
  public async GetTicketTypes(): Promise<ApiResponse<TicketType[]>> {
    return Promise.resolve({
      success: true,
      data: mockTicketTypes,
    });
  }

  /** Get departments*/
  public async GetDepartments(): Promise<ApiResponse<Department[]>> {
    return Promise.resolve({
      success: true,
      data: mockDepartments,
    });
  }

  /** Get ticket status*/
  public async GetTicketStatuses(): Promise<ApiResponse<TicketStatus[]>> {
    return Promise.resolve({
      success: true,
      data: mockTicketStatuses,
    });
  }

  /** Create a new ticket */
  public async CreateTicket(
    ticket: TicketCreateRequest
  ): Promise<ApiResponse<{ id: string; trackCode: string }>> {
    // Usually this would call an API endpoint
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

  /** Get ticket by track code */
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

  /** Get ticket by ID */
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

  /** Get Captcha */
  public async GetCaptcha(): Promise<ApiResponse<TicketCaptcha>> {
    return Promise.resolve({
      success: true,
      data: mockTicketCaptcha,
      error: undefined,
    });
  }

  /** Verify Captcha */
  public async VerifyCaptcha(answer: string): Promise<ApiResponse<null>> {
    return Promise.resolve({
      success: true,
      data: null,
      error: undefined,
    });
  }

  public async CreateChat(
    ticketId: string,
    chat: ChatMessage
  ): Promise<ApiResponse<ChatMessage>> {
    return Promise.resolve({
      success: true,
      data: {
        ...chat,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      error: undefined,
    });
  }
}
