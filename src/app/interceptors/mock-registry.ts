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
  if (url.includes('GetProductTypes') || url.includes('GetProducts')) return mockProductTypes;
  if (url.includes('GetTariffs')) return mockTariffs;
  if (url.includes('GetTravelTimes') || url.includes('GetTravelTime')) return mockTravelTimes;
  if (url.includes('GetUserTypes')) return mockUserTypes;
  if (url.includes('GetSoftwareUser')) return mockSoftwareUserInfo;
  if (url.includes('GetSoftwareUserProfile')) return mockSoftwareUserProfile;
  if (url.includes('GetAllOfWebprocessGroupsWebprocesses') || url.includes('GetWebProcesses')) return mockApiGroupProcesses;
  if (url.includes('GetAllTurnStatuses') || url.includes('TurnStatus')) return mockTurnStatus;

  // Announcements & Sequential Turns
  if (url.includes('GetAnnouncements')) return mockAnnouncementGroups;
  if (url.includes('GetAnnouncementSubGroups')) return mockAnnouncementSubGroups;
  if (url.includes('GetAnnouncementRelationAnnouncementSubGroups')) return mockRelationOfAnnouncementGroupAndSubGroups;
  if (url.includes('GetAllAnnouncementRelationProvinces')) return mockRelationOfAnnouncementSubGroupAndProvinces;
  if (url.includes('GetSequentialTurnsByLoaderType') || url.includes('GetSequentialTurns')) return mockSequentialTurns;
  if (url.includes('GetSequentialTurnRelationAnnouncementSubGroups')) return mockRelationOfSequentialTurnToAnnouncementSubGroups;
  if (url.includes('GetSequentialTurnsRelationLoaderTypes')) return mockRelationOfSequentialTurnToLoaderTypes;

  // Driver & Truck
  if (url.includes('GetTruckDriver')) return mockTruckDriverInfo;
  if (url.includes('GetTruckBySoftwareUser') || url.includes('GetTruckFrom') || url.includes('GetComposedTruckInf')) return mockTruckInfo;
  if (url.includes('GetTruckNativenessTypes')) return mockTruckNativenessTypesInfo;
  if (url.includes('GetTruckNativeness')) return mockTruckNativenessInfo;

  // Loads & Load Allocations
  if (url.includes('GetLoadsfor') || url.includes('GetLoadStatusesForSoftwareUserType')) return mockLoadsForTransportCompanies_Factories_Admins_Drivers;
  if (url.includes('GetLoadStatuses')) return mockLoadStatuses;
  if (url.includes('GetLoad') && !url.includes('GetLoads')) return mockLoadInfo;
  if (url.includes('GetTruckDriverLoadAllocationsRecords')) return mockLoadAllocationRecords;
  if (url.includes('GetTruckDriverLoadAllocations')) return mockLoadAllocationInfos;
  if (url.includes('LoadAllocateToOther')) return mockLoadAllocatedToNextTurn;

  // Loader types & Province / Cities
  if (url.includes('GetLoaderTypes') || url.includes('GetLoaderTypeBySoftwareUser')) return mockLoaderTypes;
  if (url.includes('GetLoaderTypeRelationAnnouncementSubGroups')) return mockLoaderTypeToAnnouncementSubGroupRelation;
  if (url.includes('GetProvinces') || url.includes('GetCities')) return mockProvinceAndCities;

  // Turns
  if (url.includes('GetTop10TruckTurns') || url.includes('GetTop5TruckTurns')) return mockTurnsForSoftwareUser;
  if (url.includes('GetTurnAccounting')) return mockTurnAccounting;
  if (url.includes('GetAllTurnCosts')) return mockTurnCosts;

  // Traffic
  if (url.includes('TrafficCardTempTypes') || url.includes('GetTrafficCardTempTypes')) return mockTrafficCardTempTypes;
  if (url.includes('TrafficCardTypeCosts') || url.includes('GetTrafficCardTypeCosts')) return mockTrafficCardTypeCosts;
  if (url.includes('TrafficCardTypes') || url.includes('GetTrafficCardTypes')) return mockTrafficCardTypes;
  if (url.includes('TrafficReport') || url.includes('GetTrafficReport')) return mockTrafficReportInfos;
  if (url.includes('Traffic') || url.includes('GetTraffic')) return mockTrafficInfo;

  // TPT Params & Transport Companies
  if (url.includes('GetAllTPTParams') || url.includes('GetTPTParams') || url.includes('GetListofTransportTariffsParams')) return mockTPTParamsInfo;
  if (url.includes('GetTransportCompanies') || url.includes('GetTransportCompany')) return mockTransportCompaniesInfo;

  // Reports
  if (url.includes('GetLoadPermissions')) return mockLoadPermissions;
  if (url.includes('GetTurnCostReport') || url.includes('GetLoadAccounting')) return mockLoadAccounting;

  // Config & Carousels
  if (url.includes('GetCarousel')) return mockAllCarouselInfos;
  if (url.includes('GetGeneralConfig')) return mockGeneralConfigs;
  if (url.includes('GetDeviceConfig')) return mockDeviceConfig;
  if (url.includes('GetDevicesInfo')) return mockDevicesInfo;
  if (url.includes('GetRequestersInfo')) return mockRequestersInfo;
  if (url.includes('GetLoadAllocationConditions')) return mockLoadAllocationConditionsInfo;
  if (url.includes('GetLoadAnnouncementConfigs')) return mockLoadAnnouncementConfigs;
  if (url.includes('GetLoadViewConditions')) return mockLoadViewConditionsInfo;

  // Wallet
  if (url.includes('GetMoneyWalletBalance') || url.includes('GetWalletBalance')) {
    return { Balance: mockWallet.Balance };
  }
  if (url.includes('GetMoneyWalletTransactions') || url.includes('GetWalletTransactions')) {
    return mockWalletTransactions;
  }
  if (url.includes('GetMoneyWalletChargeRecords') || url.includes('GetWalletPaymentRecords')) {
    return mockWalletPaymentHistories;
  }
  if (url.includes('GetDefaultAmounts')) {
    return mockWalletDefaultAmounts;
  }
  if (url.includes('GetTotalAmountOfUserFunction')) {
    return { Total: 10000000 };
  }
  if (url.includes('GetUserChargingFunction')) {
    return mockWalletUserChargingFunctions;
  }
  if (url.includes('PaymentRequest')) {
    return mockWalletPaymentRequest;
  }
  if (url.includes('MoneyWallet') || url.includes('Wallet')) {
    return mockWallet;
  }

  // Default fallback for action responses
  return mockShortResponse;
}
