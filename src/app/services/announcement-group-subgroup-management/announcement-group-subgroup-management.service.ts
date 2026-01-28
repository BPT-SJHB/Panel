import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { AnnouncementGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-group.model';
import { API_ROUTES } from 'app/constants/api';
import { mockAnnouncementGroups } from 'app/services/announcement-group-subgroup-management/mock/announcement-group.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { AnnouncementSubGroup } from 'app/services/announcement-group-subgroup-management/model/announcement-subgroup.model';
import { mockAnnouncementSubGroups } from 'app/services/announcement-group-subgroup-management/mock/announcement-subgroup.mock';
import { RelationOfAnnouncementGroupAndSubGroup } from './model/relation-of-announcement-group-subgroup.model';
import { mockRelationOfAnnouncementGroupAndSubGroups } from './mock/relation-of-announcement-group-subgroup.mock';
import {
  RegisterAndDeleteRelationOfAnnouncementSubGroupAndProvinceInfo,
  RelationOfAnnouncementSubGroupAndProvince,
} from './model/relation-of-announcement-subgroup-province.model';
import { mockRelationOfAnnouncementSubGroupAndProvinces } from './mock/relation-of-announcement-subgroup-province.mock';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementGroupSubgroupManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Announcement Groups

  public async GetAnnouncementGroups(
    title: string
  ): Promise<ApiResponse<AnnouncementGroup[]>> {
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

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      AnnouncementGroup[]
    >(apiUrl, bodyValue, mockAnnouncementGroups);
    //#endregion
  }

  public async RegisterNewAnnouncementGroup(
    title: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.Groups
        .RegisterAnnouncementGroup;
    const announcementGroupInfo: AnnouncementGroup = {
      AnnouncementId: 0,
      AnnouncementTitle: title,
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

  //#endregion

  //#region Announcement SubGroups

  public async GetAnnouncementSubGroups(
    title: string
  ): Promise<ApiResponse<AnnouncementSubGroup[]>> {
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

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      AnnouncementSubGroup[]
    >(apiUrl, bodyValue, mockAnnouncementSubGroups);
    //#endregion
  }

  public async RegisterNewAnnouncementSubGroup(
    title: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.SubGroups
        .RegisterAnnouncementSubGroup;
    const announcementSubGroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: 0,
      AnnouncementSGTitle: title,
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

  public async DeleteAnnouncementSubGroup(
    id: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements.SubGroups
        .DeleteAnnouncementSubGroup;
    const announcementSubGroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: id,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementSGId: announcementSubGroupInfo.AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  //#endregion

  //#region Announcement Group/SubGroup

  public async GetRelationOfAnnouncementGroupAndSubGroup(
    announcementGroupId: number
  ): Promise<ApiResponse<RelationOfAnnouncementGroupAndSubGroup[]>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementGroupAndSubGroup.GetRelations;
    const relationOfAnnouncementGroupAndSubGroupInfo: RelationOfAnnouncementGroupAndSubGroup =
      {
        AnnouncementId: announcementGroupId,
        AnnouncementSubGroups: [],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementId: relationOfAnnouncementGroupAndSubGroupInfo.AnnouncementId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfAnnouncementGroupAndSubGroup[]
    >(apiUrl, bodyValue, mockRelationOfAnnouncementGroupAndSubGroups);
    //#endregion
  }

  public async RegisterNewRelationOfAnnouncementGroupAndSubGroup(
    announcementGroupId: number,
    announcementSubGroupId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementGroupAndSubGroup.RegisterRelation;
    const relationOfAnnouncementGroupAndSubGroupInfo: RelationOfAnnouncementGroupAndSubGroup =
      {
        AnnouncementId: announcementGroupId,
        AnnouncementSubGroups: [{ AnnouncementSGId: announcementSubGroupId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementId: relationOfAnnouncementGroupAndSubGroupInfo.AnnouncementId,
      AnnouncementSubGroupId:
        relationOfAnnouncementGroupAndSubGroupInfo.AnnouncementSubGroups[0]
          .AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteRelationOfAnnouncementGroupAndSubGroup(
    announcementGroupId: number,
    announcementSubGroupId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementGroupAndSubGroup.DeleteRelation;
    const relationOfAnnouncementGroupAndSubGroupInfo: RelationOfAnnouncementGroupAndSubGroup =
      {
        AnnouncementId: announcementGroupId,
        AnnouncementSubGroups: [{ AnnouncementSGId: announcementSubGroupId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementId: relationOfAnnouncementGroupAndSubGroupInfo.AnnouncementId,
      AnnouncementSubGroupId:
        relationOfAnnouncementGroupAndSubGroupInfo.AnnouncementSubGroups[0]
          .AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
  //#endregion

  //#region Announcement SubGroup/Province

  public async GetRelationOfAnnouncementSubGroupsAndProvinces(): Promise<
    ApiResponse<RelationOfAnnouncementSubGroupAndProvince[]>
  > {
    //#region Const
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementSubGroupsAndProvinces.GetRelations;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfAnnouncementSubGroupAndProvince[]
    >(apiUrl, bodyValue, mockRelationOfAnnouncementSubGroupAndProvinces);
    //#endregion
  }

  public async RegisterRelationOfAnnouncementSubGroupAndProvince(
    relationInfo: RegisterAndDeleteRelationOfAnnouncementSubGroupAndProvinceInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Const
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementSubGroupsAndProvinces.RegisterRelation;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      ProvinceId: relationInfo.ProvinceId,
      AnnouncementSubGroupId: relationInfo.AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteRelationOfAnnouncementSubGroupAndProvince(
    relationInfo: RegisterAndDeleteRelationOfAnnouncementSubGroupAndProvinceInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Const
    const apiUrl =
      API_ROUTES.TransportationAPI.Announcements
        .RelationOfAnnouncementSubGroupsAndProvinces.DeleteRelation;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      ProvinceId: relationInfo.ProvinceId,
      AnnouncementSubGroupId: relationInfo.AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  //#endregion
}
