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
import { Observable } from 'rxjs';
import { SendOTPResponse, VerifyOTPResponse } from './model/ticket-otp.model';

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
      { withCredentials: true }
    );
  }

  public async SignUpWithPassword(
    payload: SignUpWithPasswordDTO
  ): Promise<ApiResponse<null>> {
    return await this.api.CommunicateWithAPI_Post<SignUpWithPasswordDTO, null>(
      API_ROUTES.TicketAPI.Auth.SignUp,
      payload,
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
      { withCredentials: true }
    );
  }

  public async CheckToken(): Promise<ApiResponse<CheckedToken>> {
    const apiUrl = API_ROUTES.TicketAPI.Auth.CheckToken;
    return await this.api.CommunicateWithAPI_Get<CheckedToken>(
      apiUrl,
      { withCredentials: true }
    );
  }

  public async LoginWithSingleUseToken(token: string): Promise<ApiResponse<null>> {
    const url = `${API_ROUTES.TicketAPI.Auth.LoginWithSingleUseToken}?token=${encodeURIComponent(
      token
    )}`;
    return await this.api.CommunicateWithAPI_Get<null>(url, {
      withCredentials: true,
    });
  }
  //#endregion

  //#region Ticket Types / Departments / Statuses
  public async GetTicketTypes(): Promise<ApiResponse<TicketType[]>> {
    return await this.api.CommunicateWithAPI_Get<TicketType[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketTypes,
      { withCredentials: true }
    );
  }

  public async GetDepartments(): Promise<ApiResponse<Department[]>> {
    return await this.api.CommunicateWithAPI_Get<Department[]>(
      API_ROUTES.TicketAPI.Departments.GetAllActiveDepartments,
      { withCredentials: true }
    );
  }

  public async GetTicketStatuses(): Promise<ApiResponse<TicketStatus[]>> {
    return await this.api.CommunicateWithAPI_Get<TicketStatus[]>(
      API_ROUTES.TicketAPI.Tickets.GetAllActiveTicketStatuses,
      { withCredentials: true }
    );
  }
  //#endregion

  //#region Ticket CRUD
  public async CreateTicket(
    ticket: TicketCreateRequest
  ): Promise<ApiResponse<TicketCreateResponse>> {
    return await this.api.CommunicateWithAPI_Post<
      TicketCreateRequest,
      TicketCreateResponse
    >(API_ROUTES.TicketAPI.Tickets.CreateTicket, ticket, {
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
      { withCredentials: true }
    );
  }

  public async GetTicketById(id: string): Promise<ApiResponse<Ticket>> {
    const body = { id };
    return await this.api.CommunicateWithAPI_Post<typeof body, Ticket>(
      API_ROUTES.TicketAPI.Tickets.GetTicketByID,
      body,
      { withCredentials: true }
    );
  }

  public async CloseTicket(id: string): Promise<ApiResponse<null>> {
    const body = { id };
    return await this.api.CommunicateWithAPI_Post<typeof body, null>(
      API_ROUTES.TicketAPI.Tickets.CloseTicket,
      body,
      { withCredentials: true, showSuccessToast: true }
    );
  }
  //#endregion

  //#region Captcha
  public async GetCaptcha(): Promise<ApiResponse<TicketCaptcha>> {
    return await this.api.CommunicateWithAPI_Get<TicketCaptcha>(
      API_ROUTES.TicketAPI.Captcha.GetCaptcha,
      { withCredentials: true }
    );
  }

  public async VerifyCaptcha(id: string, answer: string): Promise<ApiResponse<null>> {
    const body = { id, captcha: answer };
    return await this.api.CommunicateWithAPI_Post<typeof body, null>(
      API_ROUTES.TicketAPI.Captcha.VerifyCaptcha,
      body,
      { withCredentials: true }
    );
  }
  //#endregion

  //#region Chat
  public async CreateChat(
    ticketId: string,
    chat: CreateChatMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    return await this.api.CommunicateWithAPI_Post<
      CreateChatMessageRequest,
      ChatMessage
    >(API_ROUTES.TicketAPI.Tickets.CreateChat(ticketId), chat, {
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
    >(API_ROUTES.TicketAPI.Tickets.GetTicketsList, query, {
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
      { withCredentials: true }
    );
  }

  public async GetUserByUsername(username: string): Promise<ApiResponse<TicketUser>> {
    const body = { username };
    return await this.api.CommunicateWithAPI_Post<typeof body, TicketUser>(
      API_ROUTES.TicketAPI.Users.GetUserByUsername,
      body,
      { withCredentials: true }
    );
  }

  public async GetUsersByIds(ids: number[]): Promise<ApiResponse<TicketUser[]>> {
    const body = { ids };
    return await this.api.CommunicateWithAPI_Post<typeof body, TicketUser[]>(
      API_ROUTES.TicketAPI.Users.GetUsersIDs,
      body,
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
    >(apiUrl, bodyValue, { withCredentials: true });
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
    >(apiUrl, body, { withCredentials: true });
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
    return this.api.CommunicateWithAPI_Post_FromData_With_Progress<{
      id: string;
    }>(API_ROUTES.TicketAPI.File.UploadTicketFile, body, {
      withCredentials: true,
      showSuccessToast: true,
    });
  }
  //#endregion
}
