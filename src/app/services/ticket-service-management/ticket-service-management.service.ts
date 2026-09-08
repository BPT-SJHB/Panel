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
  TicketCreateResponse,
  TicketQueryParams,
} from './model/ticket.model';
import { Department } from './model/department.model';
import { TicketCaptcha } from './model/ticket-captcha.model';
import { TicketStatus } from './model/ticket-status.model';
import { PagingResponse } from './model/paging-response.model';
import {
  CheckedToken,
  GenerateSingleUseTokenDTO,
  LoginWithNoAuthDTO,
  LoginWithPasswordDTO,
  SignUpWithPasswordDTO,
  SingleUseTokenResponseDTO,
} from './model/ticket-auth.model';

// Mock data
import { mockTicketTypes } from './mock/ticket-type.mock';
import { mockTicketUser } from './mock/ticket-user.mock';
import { mockTickets } from './mock/ticket.mock';
import { mockDepartments } from './mock/department.mock';
import { mockTicketCaptcha } from './mock/ticket-captcha.mock';
import { mockTicketStatuses } from './mock/ticket-status.mock';
import { mockTicketPaging } from './mock/ticket-paging.mock';
import { Observable } from 'rxjs';
import { SendOTPResponse, VerifyOTPResponse } from './model/ticket-otp.model';
import { mockTicketSendOtp, mockTicketVerifyOtp } from './mock/ticket-otp.mock';
import { mockTicketTokenChecked } from './mock/ticket-auth.mock';

@Injectable({
  providedIn: 'root',
})
export class TicketServiceManagementService {
  private readonly api = inject(APICommunicationManagementService);

  //#region Auth & Single-Use Tokens
  public async LoginWithNoAuth(
    payload: LoginWithNoAuthDTO
  ): Promise<ApiResponse<TicketUser>> {
    const apiUrl = API_ROUTES.TicketAPI.Auth.LoginWithNoAuth;
    return await this.api.CommunicateWithAPI_Post<LoginWithNoAuthDTO, TicketUser>(
      apiUrl,
      payload,
      mockTicketUser,
      { withCredentials: true }
    );
  }

  public async LoginTicketWithPassword(
    username: string,
    password: string
  ): Promise<ApiResponse<null>> {
    const body: LoginWithPasswordDTO = { username, password };
    return await this.api.CommunicateWithAPI_Post<LoginWithPasswordDTO, null>(
      API_ROUTES.TicketAPI.Auth.Login,
      body,
      null,
      { withCredentials: true }
    );
  }

  public async SignUpWithPassword(
    payload: SignUpWithPasswordDTO
  ): Promise<ApiResponse<null>> {
    return await this.api.CommunicateWithAPI_Post<SignUpWithPasswordDTO, null>(
      API_ROUTES.TicketAPI.Auth.SignUp,
      payload,
      null,
      { withCredentials: true }
    );
  }

  public async GetSingleUseToken(
    username: string
  ): Promise<ApiResponse<SingleUseTokenResponseDTO>> {
    const body: GenerateSingleUseTokenDTO = { username };
    return await this.api.CommunicateWithAPI_Post<
      GenerateSingleUseTokenDTO,
      SingleUseTokenResponseDTO
    >(
      API_ROUTES.TicketAPI.Auth.GetSingleUseToken,
      body,
      { token: 'mock-single-use-token' },
      { withCredentials: true }
    );
  }

  public async CheckToken(): Promise<ApiResponse<CheckedToken>> {
    //#region consts
    const apiUrl = API_ROUTES.TicketAPI.Auth.CheckToken;
    //#endregion

    //#region request + response
    return await this.api.CommunicateWithAPI_Get<CheckedToken>(
      apiUrl,
      mockTicketTokenChecked,
      { withCredentials: true }
    );
    //#endregion
  }

  public async LoginWithSingleUseToken(token: string): Promise<ApiResponse<null>> {
    const url = `${API_ROUTES.TicketAPI.Auth.LoginWithSingleUseToken}?token=${encodeURIComponent(
      token
    )}`;
    return await this.api.CommunicateWithAPI_Get<null>(url, null, {
      withCredentials: true,
    });
  }
  //#endregion

  //#region Ticket Types / Departments / Statuses
  public async GetTicketTypes(): Promise<ApiResponse<TicketType[]>> {
    return await this.api.CommunicateWithAPI_Get<TicketType[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketTypes,
      mockTicketTypes,
      { withCredentials: true }
    );
  }

  public async GetDepartments(): Promise<ApiResponse<Department[]>> {
    return await this.api.CommunicateWithAPI_Get<Department[]>(
      API_ROUTES.TicketAPI.Departments.GetAllActiveDepartments,
      mockDepartments,
      { withCredentials: true }
    );
  }

  public async GetTicketStatuses(): Promise<ApiResponse<TicketStatus[]>> {
    return await this.api.CommunicateWithAPI_Get<TicketStatus[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketStatuses,
      mockTicketStatuses,
      { withCredentials: true }
    );
  }
  //#endregion

  //#region Ticket CRUD
  public async CreateTicket(
    ticket: TicketCreateRequest
  ): Promise<ApiResponse<TicketCreateResponse>> {
    const mockResponse: TicketCreateResponse = {
      id: mockTickets[0]?.id ?? crypto.randomUUID(),
      trackCode:
        mockTickets[0]?.trackCode ?? Math.random().toString(36).substring(2, 8),
    };

    return await this.api.CommunicateWithAPI_Post<
      TicketCreateRequest,
      TicketCreateResponse
    >(API_ROUTES.TicketAPI.Tickets.CreateTicket, ticket, mockResponse, {
      withCredentials: true,
      showSuccessToast: true,
    });
  }

  public async GetTicketByTrackCode(trackCode: string): Promise<ApiResponse<Ticket>> {
    const body = {
      trackCode,
    };
    return await this.api.CommunicateWithAPI_Post<typeof body, Ticket>(
      API_ROUTES.TicketAPI.Tickets.GetTicketByTrackCode,
      body,
      mockTickets[0],
      { withCredentials: true }
    );
  }

  public async GetTicketById(id: string): Promise<ApiResponse<Ticket>> {
    const body = { id };
    return await this.api.CommunicateWithAPI_Post<typeof body, Ticket>(
      API_ROUTES.TicketAPI.Tickets.GetTicketByID,
      body,
      mockTickets[Math.floor(Math.random() * mockTickets.length)],
      { withCredentials: true }
    );
  }

  public async CloseTicket(id: string): Promise<ApiResponse<null>> {
    const body = { id };
    return await this.api.CommunicateWithAPI_Post<typeof body, null>(
      API_ROUTES.TicketAPI.Tickets.CloseTicket,
      body,
      null,
      { withCredentials: true, showSuccessToast: true }
    );
  }
  //#endregion

  //#region Captcha
  public async GetCaptcha(): Promise<ApiResponse<TicketCaptcha>> {
    return await this.api.CommunicateWithAPI_Get<TicketCaptcha>(
      API_ROUTES.TicketAPI.Captcha.GetCaptcha,
      mockTicketCaptcha,
      { withCredentials: true }
    );
  }

  public async VerifyCaptcha(id: string, answer: string): Promise<ApiResponse<null>> {
    const body = { id, captcha: answer };
    return await this.api.CommunicateWithAPI_Post<typeof body, null>(
      API_ROUTES.TicketAPI.Captcha.VerifyCaptcha,
      body,
      null,
      { withCredentials: true }
    );
  }
  //#endregion

  //#region Chat
  public async CreateChat(
    ticketId: string,
    chat: CreateChatMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    const mockResponse: ChatMessage = {
      ...chat,
      id: crypto.randomUUID(),
      attachments: chat.attachments ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return await this.api.CommunicateWithAPI_Post<
      CreateChatMessageRequest,
      ChatMessage
    >(API_ROUTES.TicketAPI.Tickets.CreateChat(ticketId), chat, mockResponse, {
      withCredentials: true,
    });
  }
  //#endregion

  //#region Paging
  public async GetTickets(
    query: TicketQueryParams
  ): Promise<ApiResponse<PagingResponse<Ticket>>> {
    return await this.api.CommunicateWithAPI_Post<
      TicketQueryParams,
      PagingResponse<Ticket>
    >(API_ROUTES.TicketAPI.Tickets.GetTicketsList, query, mockTicketPaging, {
      withCredentials: true,
    });
  }
  //#endregion

  //#region Users
  public async GetUserById(id: number): Promise<ApiResponse<TicketUser>> {
    const body = { id };
    return await this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      API_ROUTES.TicketAPI.Users.GetUserByID,
      body,
      mockTicketUser,
      { withCredentials: true }
    );
  }

  public async GetUserByUsername(username: string): Promise<ApiResponse<TicketUser>> {
    const body = { username };
    return await this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      API_ROUTES.TicketAPI.Users.GetUserByUsername,
      body,
      mockTicketUser,
      { withCredentials: true }
    );
  }

  public async GetUsersByIds(ids: number[]): Promise<ApiResponse<TicketUser[]>> {
    const body = { ids };
    return await this.api.CommunicateWithAPI_Post<typeof body, TicketUser[]>(
      API_ROUTES.TicketAPI.Users.GetUsersIDs,
      body,
      [mockTicketUser],
      { withCredentials: true }
    );
  }
  //#endregion

  //#region OTP
  public async SendOTP(phoneNumber: string): Promise<ApiResponse<SendOTPResponse>> {
    const apiUrl = API_ROUTES.TicketAPI.OTP.SendOTP;
    const bodyValue = { phoneNumber };
    return await this.api.CommunicateWithAPI_Post<
      typeof bodyValue,
      SendOTPResponse
    >(apiUrl, bodyValue, mockTicketSendOtp, { withCredentials: true });
  }

  public async VerifyOTP(
    otpCode: string,
    phoneNumber: string
  ): Promise<ApiResponse<VerifyOTPResponse>> {
    const apiUrl = API_ROUTES.TicketAPI.OTP.VerifyOTP;
    const body = { code: otpCode, phoneNumber };
    return await this.api.CommunicateWithAPI_Post<
      typeof body,
      VerifyOTPResponse
    >(apiUrl, body, mockTicketVerifyOtp, { withCredentials: true });
  }
  //#endregion

  //#region Files
  public async DownloadTicketFile(
    ticketId: string,
    objectName: string
  ): Promise<ApiResponse<null>> {
    const response = await this.api.CommunicateWithAPI_Post<
      { id: string },
      { url: string }
    >(
      API_ROUTES.TicketAPI.File.DownloadTicketFile(objectName),
      { id: ticketId },
      { url: '' },
      { withCredentials: true }
    );
    if (!response.success || !response.data?.url) {
      return response as unknown as ApiResponse<null>;
    }
    window.open(response.data.url, '_blank');
    return response as unknown as ApiResponse<null>;
  }

  public UploadTicketFile(
    file: File
  ): Observable<ApiResponse<{ id: string }> | number> {
    const body = new FormData();
    body.append('file', file);
    const mock = { id: `uuidV4().${file.type}` };
    return this.api.CommunicateWithAPI_Post_FromData_With_Progress<{
      id: string;
    }>(API_ROUTES.TicketAPI.File.UploadTicketFile, body, mock, {
      withCredentials: true,
      showSuccessToast: true,
    });
  }
  //#endregion
}
