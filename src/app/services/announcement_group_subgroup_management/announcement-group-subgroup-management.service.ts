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
