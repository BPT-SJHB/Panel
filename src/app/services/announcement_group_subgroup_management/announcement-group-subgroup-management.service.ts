import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { AnnouncementGroup } from 'app/services/announcement_group_subgroup_management/model/announcement-group.model';
import { API_ROUTES } from 'app/constants/api';
import { mockAnnouncementGroups } from 'app/services/announcement_group_subgroup_management/mock/announcement-group.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { AnnouncementSubGroup } from 'app/services/announcement_group_subgroup_management/model/announcement-subgroup.model';
import { mockAnnouncementSubGroups } from 'app/services/announcement_group_subgroup_management/mock/announcement-subgroup.mock';
import { RelationOfAnnouncementGroupAndSubGroup } from './model/relation-of-announcement-group-subgroup.model';
import { mockRelationOfAnnouncementGroupAndSubGroups } from './mock/relation-of-announcement-group-subgroup.mock';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementGroupSubgroupManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
  public async GetAnnouncementGroups(
    title: string
  ): Promise<ApiResponse<AnnouncementGroup[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.Groups.GetAnnouncementGroups;
    const announcementGroupInfo: AnnouncementGroup = {
      AnnouncementId: 0,
      AnnouncementTitle: title,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: announcementGroupInfo.AnnouncementTitle,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      AnnouncementGroup[]
    >(apiUrl, bodyValue, mockAnnouncementGroups);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        AnnouncementId: data.AnnouncementId,
        AnnouncementTitle: data.AnnouncementTitle?.trim(),
        Active: data.Active,
      })),
      error: response.error,
    };
    //#endregion
  }

  public async RegisterNewAnnouncementGroup(
    title: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.Groups
        .RegisterAnnouncementGroup;
    const announcementGroupInfo: AnnouncementGroup = {
      AnnouncementId: 0,
      AnnouncementTitle: title,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawAnnouncement: announcementGroupInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditAnnouncementGroup(
    id: number,
    title: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.Groups.EditAnnouncementGroup;
    const announcementGroupInfo: AnnouncementGroup = {
      AnnouncementId: id,
      AnnouncementTitle: title,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawAnnouncement: announcementGroupInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteAnnouncementGroup(
    id: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.Groups.DeleteAnnouncementGroup;
    const announcementGroupInfo: AnnouncementGroup = {
      AnnouncementId: id,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementId: announcementGroupInfo.AnnouncementId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
  public async GetAnnouncementSupGroups(
    title: string
  ): Promise<ApiResponse<AnnouncementSubGroup[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.SubGroups
        .GetAnnouncementSubGroups;
    const announcementSubGroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: 0,
      AnnouncementSGTitle: title,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: announcementSubGroupInfo.AnnouncementSGTitle,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      AnnouncementSubGroup[]
    >(apiUrl, bodyValue, mockAnnouncementSubGroups);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        AnnouncementSGId: data.AnnouncementSGId,
        AnnouncementSGTitle: data.AnnouncementSGTitle?.trim(),
        Active: data.Active,
      })),
      error: response.error,
    };
    //#endregion
  }

  public async RegisterNewAnnouncementSubGroup(
    title: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.SubGroups
        .RegisterAnnouncementSubGroup;
    const announcementSubGroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: 0,
      AnnouncementSGTitle: title,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawAnnouncementSubGroup: announcementSubGroupInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditAnnouncementSubGroup(
    id: number,
    title: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.SubGroups
        .EditAnnouncementSubGroup;
    const announcementSubGroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: id,
      AnnouncementSGTitle: title,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawAnnouncementSubGroup: announcementSubGroupInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
