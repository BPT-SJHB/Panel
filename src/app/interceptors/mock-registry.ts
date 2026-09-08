import { API_ROUTES } from 'app/constants/api';

// Core mock imports
import { mockCaptcha } from 'app/data/mock/captcha-challenge.mock';
import { mockUserSession } from 'app/data/mock/user-session.mock';
import { mockApiGroupProcesses } from 'app/data/mock/page-group.mock';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { mockFPCsInfo } from 'app/data/mock/fpc-info.mock';
import { mockLADPlaces } from 'app/data/mock/lad-place.mock';
import { mockProductTypes } from 'app/data/mock/product-type.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { mockTariffs } from 'app/data/mock/tariff.mock';
import { mockTravelTimes } from 'app/data/mock/travel-time.mock';
import { mockUserTypes } from 'app/data/mock/user-types.mock';
import { mockAPIUsernamePassword } from 'app/data/mock/username-password.mock';

// Service mocks
import { mockAnnouncementGroups } from 'app/services/announcement-group-subgroup-management/mock/announcement-group.mock';
import { mockAnnouncementSubGroups } from 'app/services/announcement-group-subgroup-management/mock/announcement-subgroup.mock';
import { mockRelationOfAnnouncementGroupAndSubGroups } from 'app/services/announcement-group-subgroup-management/mock/relation-of-announcement-group-subgroup.mock';
import { mockRelationOfAnnouncementSubGroupAndProvinces } from 'app/services/announcement-group-subgroup-management/mock/relation-of-announcement-subgroup-province.mock';
import { mockAllCarouselInfos } from 'app/services/carousel-management/mock/carousel-info.mock';
import { mockDeviceConfig } from 'app/services/config-management/mock/device-config.mock';
import { mockDevicesInfo } from 'app/services/config-management/mock/device-info.mock';
import { mockGeneralConfigs } from 'app/services/config-management/mock/general-config.mock';
import { mockLoadAllocationConditionsInfo } from 'app/services/config-management/mock/load-allocation-condition.mock';
import { mockLoadAnnouncementConfigs } from 'app/services/config-management/mock/load-announcement-config.mock';
import { mockLoadViewConditionsInfo } from 'app/services/config-management/mock/load-view-condition-info.mock';
import { mockRequestersInfo } from 'app/services/config-management/mock/requester-info.mock';
import { mockSignUpInfo } from 'app/services/driver-truck-management/mock/sign-up-info.mock';
import { mockTruckDriverInfo } from 'app/services/driver-truck-management/mock/truck-driver-info.mock';
import { mockTruckInfo } from 'app/services/driver-truck-management/mock/truck-info.mock';
import { mockTruckNativenessInfo, mockTruckNativenessTypesInfo } from 'app/services/driver-truck-management/mock/truck-nativeness-info.mock';
import { mockLoadAllocatedToNextTurn } from 'app/services/load-management/mock/load-allocated-to-next-turn.mock';
import { mockLoadAllocationInfos } from 'app/services/load-management/mock/load-allocation-info.mock';
import { mockLoadAllocationRecords } from 'app/services/load-management/mock/load-allocation-records';
import { mockLoadInfo } from 'app/services/load-management/mock/load-info.mock';
import { mockLoadsForTransportCompanies_Factories_Admins_Drivers } from 'app/services/load-management/mock/load-info-for-transport-companies-factories-admins-drivers.mock';
import { mockLoadStatuses } from 'app/services/load-management/mock/load-status.mock';
import { mockLoaderTypes } from 'app/services/loader-types/mock/loader-type.mock';
import { mockLoaderTypeToAnnouncementSubGroupRelation } from 'app/services/loader-types/mock/loader-type-announcement-sub-groups-relation.mock';
import { mockProvinceAndCities } from 'app/services/province-city-management/mock/province-city.mock';
import { mockLoadAccounting } from 'app/services/report-management/mock/load-accounting/load-accounting.mock';
import { mockLoadPermissions } from 'app/services/report-management/mock/load-permissions/load-permission.mock';
import { mockLoadPermissionsForCompany } from 'app/services/report-management/mock/load-permissions/load-permission-for-company.mock';
import { mockLoadPermissionsForDriver } from 'app/services/report-management/mock/load-permissions/load-permission-for-driver.mock';
import { mockSequentialTurns } from 'app/services/sequential-turn-management/mock/sequential-turn.mock';
import { mockRelationOfSequentialTurnToAnnouncementSubGroups } from 'app/services/sequential-turn-management/mock/relation-of-sequentialTurn-to-announcementSubGroup.mock';
import { mockRelationOfSequentialTurnToLoaderTypes } from 'app/services/sequential-turn-management/mock/relation-of-sequentialTurn-to-loaderType.mock';
import { mockDepartments } from 'app/services/ticket-service-management/mock/department.mock';
import { mockTicketCaptcha } from 'app/services/ticket-service-management/mock/ticket-captcha.mock';
import { mockTicketSendOtp, mockTicketVerifyOtp } from 'app/services/ticket-service-management/mock/ticket-otp.mock';
import { mockTicketPaging } from 'app/services/ticket-service-management/mock/ticket-paging.mock';
import { mockTicketStatuses } from 'app/services/ticket-service-management/mock/ticket-status.mock';
import { mockTicketTypes } from 'app/services/ticket-service-management/mock/ticket-type.mock';
import { mockTicketUser } from 'app/services/ticket-service-management/mock/ticket-user.mock';
import { mockTickets } from 'app/services/ticket-service-management/mock/ticket.mock';
import { mockTPTParamsInfo } from 'app/services/tpt-params-management/mock/tptparam-info.mock';
import { mockTrafficCardTempTypes } from 'app/services/traffic-management/mock/traffic-card-temp-type.mock';
import { mockTrafficCardTypeCosts } from 'app/services/traffic-management/mock/traffic-card-type-cost.mock';
import { mockTrafficCardTypes } from 'app/services/traffic-management/mock/traffic-card-type.mock';
import { mockTrafficInfo } from 'app/services/traffic-management/mock/traffic-info.mock';
import { mockTrafficReportInfos } from 'app/services/traffic-management/mock/traffic-report-info.mock';
import { mockTransportCompaniesInfo } from 'app/services/transport-company-management/mock/transport-company-info.mock';
import { mockTurnAccounting } from 'app/services/turn-management/mock/turn-accounting.mock';
import { mockTurnCosts } from 'app/services/turn-management/mock/turn-cost.mock';
import { mockTurnsForSoftwareUser } from 'app/services/turn-management/mock/turn-for-software-user.mock';
import { mockTurnStatus } from 'app/services/turn-management/mock/turn-status.mock';
import { mockTurns } from 'app/services/turn-management/mock/turn.mock';
import { mockSoftwareUserInfo } from 'app/services/user-management/mock/software-user-info.mock';
import { mockSoftwareUserProfile } from 'app/services/user-management/mock/software-user-profile.mock';
import { mockWalletDefaultAmounts } from 'app/services/wallet-management/mock/wallet-default-amount.mock';
import { mockWalletPaymentHistories } from 'app/services/wallet-management/mock/wallet-payment-history.mock';
import { mockWalletPaymentRequest } from 'app/services/wallet-management/mock/wallet-payment-request.mock';
import { mockWalletTransactions } from 'app/services/wallet-management/mock/wallet-transaction.mock';
import { mockWalletUserChargingFunctions } from 'app/services/wallet-management/mock/wallet-user-charging-function.mock';
import { mockWallet } from 'app/services/wallet-management/mock/wallet.mock';

/**
 * Route URL prefix map to Mock data in dev offline mode
 */
export function getMockResponseForUrl(url: string, _method: string): any {
  // Authentication & Session
  if (url.includes('AuthUser')) return { SessionId: mockUserSession.sessionId };
  if (url.includes('IsSessionLive')) return true;
  if (url.includes('GetCaptcha')) return mockCaptcha;
  if (url.includes('GetSessionSoftwareUser')) return mockSoftwareUserInfo;
  if (url.includes('GetVirtualMoneyWallet')) return mockWallet;

  // Tickets
  if (url.includes('/ticket') || url.includes('/api/v1/')) {
    if (url.includes('departments')) return mockDepartments;
    if (url.includes('types')) return mockTicketTypes;
    if (url.includes('statuses')) return mockTicketStatuses;
    if (url.includes('captcha')) return mockTicketCaptcha;
    if (url.includes('otp/send')) return mockTicketSendOtp;
    if (url.includes('otp/verify')) return mockTicketVerifyOtp;
    if (url.includes('auth/me')) return mockTicketUser;
    if (url.includes('tickets')) return mockTicketPaging;
    return mockTickets;
  }

  // Common Endpoints
  if (url.includes('GetFPCs')) return mockFPCsInfo;
  if (url.includes('GetCargoTerminals') || url.includes('GetLoadAnnouncementPlaces')) return mockCargoTerminals;
  if (url.includes('GetProductTypes')) return mockProductTypes;
  if (url.includes('GetTariffs')) return mockTariffs;
  if (url.includes('GetTravelTimes')) return mockTravelTimes;
  if (url.includes('GetUserTypes')) return mockUserTypes;
  if (url.includes('GetSoftwareUser')) return mockSoftwareUserInfo;
  if (url.includes('GetSoftwareUserProfile')) return mockSoftwareUserProfile;
  if (url.includes('GetAllOfWebprocessGroupsWebprocesses') || url.includes('GetWebProcesses')) return mockApiGroupProcesses;
  if (url.includes('GetAllTurnStatuses') || url.includes('TurnStatus')) return mockTurnStatus;

  // Default fallback for action responses
  return mockShortResponse;
}
