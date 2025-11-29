import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';

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
import { Observable } from 'rxjs';
import { uuidV4 } from 'app/utils/uuid';

@Injectable({
  providedIn: 'root',
})
export class TicketServiceManagementService {
  private api = inject(APICommunicationManagementService);

  //#region Ticket User
  LoginWithNoAuth(username: string): Promise<ApiResponse<TicketUser>> {
    const apiUrl = API_ROUTES.TicketAPI.Auth.LoginWithNoAuth;
    const body = { username, departmentId: 1 };
    return this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      apiUrl,
      body,
      mockTicketUser,
      true
    );
  }
  //#endregion

  //#region Ticket Types / Departments / Statuses
  GetTicketTypes(): Promise<ApiResponse<TicketType[]>> {
    return this.api.CommunicateWithAPI_Get<TicketType[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketTypes,
      mockTicketTypes,
      true
    );
  }

  GetDepartments(): Promise<ApiResponse<Department[]>> {
    return this.api.CommunicateWithAPI_Get<Department[]>(
      API_ROUTES.TicketAPI.Departments.GetAllActiveDepartments,
      mockDepartments,
      true
    );
  }

  GetTicketStatuses(): Promise<ApiResponse<TicketStatus[]>> {
    return this.api.CommunicateWithAPI_Get<TicketStatus[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketStatuses,
      mockTicketStatuses,
      true
    );
  }
  //#endregion

  //#region Ticket CRUD
  CreateTicket(
    ticket: TicketCreateRequest
  ): Promise<ApiResponse<{ id: string; trackCode: string }>> {
    const mockResponse = {
      id: mockTickets[0]?.id ?? crypto.randomUUID(),
      trackCode:
        mockTickets[0]?.trackCode ?? Math.random().toString(36).substring(2, 8),
    };

    return this.api.CommunicateWithAPI_Post<
      TicketCreateRequest,
      { id: string; trackCode: string }
    >(API_ROUTES.TicketAPI.Tickets.CreateTicket, ticket, mockResponse, true);
  }

  GetTicketByTrackCode(
    trackCode: string,
    username: string
  ): Promise<ApiResponse<Ticket>> {
    const body = { trackCode, username };
    return this.api.CommunicateWithAPI_Post<typeof body, Ticket>(
      API_ROUTES.TicketAPI.Tickets.GetTicketByTrackCode,
      body,
      mockTickets[0],
      true
    );
  }

  GetTicketById(id: string): Promise<ApiResponse<Ticket>> {
    const body = { id };
    return this.api.CommunicateWithAPI_Post<typeof body, Ticket>(
      API_ROUTES.TicketAPI.Tickets.GetTicketByID,
      body,
      mockTickets[Math.floor(Math.random() * mockTickets.length)],
      true
    );
  }
  //#endregion

  //#region Captcha
  GetCaptcha(): Promise<ApiResponse<TicketCaptcha>> {
    return this.api.CommunicateWithAPI_Get<TicketCaptcha>(
      API_ROUTES.TicketAPI.Captcha.GetCaptcha,
      mockTicketCaptcha,
      true
    );
  }

  VerifyCaptcha(id: string, answer: string): Promise<ApiResponse<null>> {
    const body = { id, captcha: answer };
    return this.api.CommunicateWithAPI_Post<typeof body, null>(
      API_ROUTES.TicketAPI.Captcha.VerifyCaptcha,
      body,
      null,
      true
    );
  }
  //#endregion

  //#region Chat
  CreateChat(
    ticketId: string,
    chat: CreateChatMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    const mockResponse: ChatMessage = {
      ...chat,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return this.api.CommunicateWithAPI_Post<
      CreateChatMessageRequest,
      ChatMessage
    >(
      API_ROUTES.TicketAPI.Tickets.CreateChat(ticketId),
      chat,
      mockResponse,
      true
    );
  }
  //#endregion

  //#region Paging
  GetTickets(
    query: TicketQueryParams
  ): Promise<ApiResponse<PagingResponse<Ticket>>> {
    return this.api.CommunicateWithAPI_Post<
      TicketQueryParams,
      PagingResponse<Ticket>
    >(
      API_ROUTES.TicketAPI.Tickets.GetTicketsList,
      query,
      mockTicketPaging,
      true
    );
  }
  //#endregion

  //#region Users
  GetUserById(id: number): Promise<ApiResponse<TicketUser>> {
    const body = { id };
    return this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      API_ROUTES.TicketAPI.Users.GetUserByID,
      body,
      mockTicketUser,
      true
    );
  }

  GetUserByUsername(username: string): Promise<ApiResponse<TicketUser>> {
    const body = { username };
    return this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      API_ROUTES.TicketAPI.Users.GetUserByUsername,
      body,
      mockTicketUser,
      true
    );
  }

  GetUsersByIds(ids: number[]): Promise<ApiResponse<TicketUser[]>> {
    const body = { ids };
    return this.api.CommunicateWithAPI_Post<typeof body, TicketUser[]>(
      API_ROUTES.TicketAPI.Users.GetUsersIDs,
      body,
      [mockTicketUser],
      true
    );
  }
  //#endregion

  async DownloadTicketFile(
    ticketId: string,
    fileId: string
  ): Promise<ApiResponse<null>> {
    const response = await this.api.CommunicateWithAPI_Post<
      { id: string },
      { url: string }
    >(
      API_ROUTES.TicketAPI.File.DownloadTicketFile(fileId),
      { id: ticketId },
      { url: '' },
      true
    );
    if (!response.success || !response.data?.url) {
      // Safely return the same structure (cast to correct type)
      return response as unknown as ApiResponse<null>;
    }
    // Second request to actually download file using the presigned URL
    window.open(response.data.url, '_blank');
    return response as unknown as ApiResponse<null>;
  }

  UploadTicketFile(
    file: File
  ): Observable<ApiResponse<{ id: string }> | number> {
    const body = new FormData();
    body.append('file', file);
    const mock = { id: `uuidV4().${file.type}` };
    return this.api.CommunicateWithAPI_Post_FromData_With_Progress<{
      id: string;
    }>(API_ROUTES.TicketAPI.File.UploadTicketFile, body, mock, true);
  }

  LoginTicketWithPassword(
    username: string,
    password: string
  ): Promise<ApiResponse<null>> {
    return this.api.CommunicateWithAPI_Post(
      API_ROUTES.TicketAPI.Auth.Login,
      { username, password },
      null,
      true
    );
  }
}
