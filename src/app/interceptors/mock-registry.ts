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
import { mockCarouselForViewPic } from 'app/services/carousel-management/mock/carousel-pic-forView.mock';
import { mockCarouselPic } from 'app/services/carousel-management/mock/carousel-pic.mock';
import { mockDeviceConfig } from 'app/services/config-management/mock/device-config.mock';
import { mockDevicesInfo } from 'app/services/config-management/mock/device-info.mock';
import { mockGeneralConfigs } from 'app/services/config-management/mock/general-config.mock';
import { mockLoadAllocationConditionsInfo } from 'app/services/config-management/mock/load-allocation-condition.mock';
import { mockLoadAnnouncementConfigs } from 'app/services/config-management/mock/load-announcement-config.mock';
import { mockLoadViewConditionsInfo } from 'app/services/config-management/mock/load-view-condition-info.mock';
import { mockRequestersInfo } from 'app/services/config-management/mock/requester-info.mock';
import { mockSignUpInfo } from 'app/services/driver-truck-management/mock/sign-up-info.mock';
import { mockTruckDriverInfo } from 'app/services/driver-truck-management/mock/truck-driver-info.mock';
import { mockTruckComposedInfo, mockTruckInfo } from 'app/services/driver-truck-management/mock/truck-info.mock';
import { mockTruckNativenessInfo, mockTruckNativenessTypesInfo } from 'app/services/driver-truck-management/mock/truck-nativeness-info.mock';
import { mockLoadAllocatedToNextTurn } from 'app/services/load-management/mock/load-allocated-to-next-turn.mock';
import { mockLoadAllocationInfos } from 'app/services/load-management/mock/load-allocation-info.mock';
import { mockLoadAllocationRecords } from 'app/services/load-management/mock/load-allocation-records';
import { mockLoadInfo } from 'app/services/load-management/mock/load-info.mock';
import { mockLoadsForTransportCompanies_Factories_Admins_Drivers } from 'app/services/load-management/mock/load-info-for-transport-companies-factories-admins-drivers.mock';
import { mockLoadStatuses } from 'app/services/load-management/mock/load-status.mock';
import { mockTransportTariffParamInString, mockTransportTariffParams } from 'app/services/load-management/mock/transport-tariff-param.mock';
import { mockLoaderTypes } from 'app/services/loader-types/mock/loader-type.mock';
import { mockLoaderTypeToAnnouncementSubGroupRelation } from 'app/services/loader-types/mock/loader-type-announcement-sub-groups-relation.mock';
import { mockProvinceAndCities, mockProvinces } from 'app/services/province-city-management/mock/province-city.mock';
import { mockLoadAccounting } from 'app/services/report-management/mock/load-accounting/load-accounting.mock';
import { mockLoadPermissions } from 'app/services/report-management/mock/load-permissions/load-permission.mock';
import { mockLoadPermissionsForCompany } from 'app/services/report-management/mock/load-permissions/load-permission-for-company.mock';
import { mockLoadPermissionsForDriver } from 'app/services/report-management/mock/load-permissions/load-permission-for-driver.mock';
import { mockSequentialTurns } from 'app/services/sequential-turn-management/mock/sequential-turn.mock';
import { mockRelationOfSequentialTurnToAnnouncementSubGroups } from 'app/services/sequential-turn-management/mock/relation-of-sequentialTurn-to-announcementSubGroup.mock';
import { mockRelationOfSequentialTurnToLoaderTypes } from 'app/services/sequential-turn-management/mock/relation-of-sequentialTurn-to-loaderType.mock';
import { mockTicketTokenChecked } from 'app/services/ticket-service-management/mock/ticket-auth.mock';
import { mockDepartments } from 'app/services/ticket-service-management/mock/department.mock';
import { mockTicketCaptcha } from 'app/services/ticket-service-management/mock/ticket-captcha.mock';
import { mockTicketSendOtp, mockTicketVerifyOtp } from 'app/services/ticket-service-management/mock/ticket-otp.mock';
import { mockTicketPaging } from 'app/services/ticket-service-management/mock/ticket-paging.mock';
import { mockTicketStatuses } from 'app/services/ticket-service-management/mock/ticket-status.mock';
import { mockTicketTypes } from 'app/services/ticket-service-management/mock/ticket-type.mock';
import { mockTicketUser } from 'app/services/ticket-service-management/mock/ticket-user.mock';
import { mockTickets } from 'app/services/ticket-service-management/mock/ticket.mock';
import { mockTPTParamsInfo, mockTPTParamsRelationToAnnouncementGroupAndSubGroupInfo } from 'app/services/tpt-params-management/mock/tptparam-info.mock';
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
  // Section 11: TicketAPI (evaluated first to prevent endpoint collisions e.g. GetCaptcha)
  if (url.includes('/ticket') || url.includes('/api/v1/') || url.includes(':8080')) {
    // Auth
    if (url.includes('auth/CheckToken')) return mockTicketTokenChecked;
    if (url.includes('auth/LoginWithNoAuth')) return mockTicketUser;
    if (url.includes('auth/GetSingleUseToken')) return { token: 'mock-single-use-token-12345' };
    if (
      url.includes('auth/SignUp') ||
      url.includes('auth/Login') ||
      url.includes('auth/LoginWithSingleUseToken')
    ) {
      return null;
    }

    // Captcha & OTP
    if (url.includes('captcha/GetCaptcha')) return mockTicketCaptcha;
    if (url.includes('captcha/VerifyCaptcha')) return null;
    if (url.includes('otp/send')) return mockTicketSendOtp;
    if (url.includes('otp/verify')) return mockTicketVerifyOtp;

    // Departments, Types, Statuses
    if (url.includes('departments') || url.includes('GetAllActiveDepartments')) return mockDepartments;
    if (url.includes('GetAllActiveTicketTypes') || url.includes('types')) return mockTicketTypes;
    if (url.includes('GetAllActiveTicketStatuses') || url.includes('statuses')) return mockTicketStatuses;

    // Tickets CRUD & Chat
    if (url.includes('CreateChat')) return mockTickets[0].chat?.[0] ?? null;
    if (url.includes('CreateTicket')) return { id: mockTickets[0].id, trackCode: mockTickets[0].trackCode };
    if (url.includes('CloseTicket')) return null;
    if (url.includes('GetTicketByTrackCode') || url.includes('GetTicketByID')) return mockTickets[0];
    if (url.includes('GetTicketsList') || url.includes('tickets')) return mockTicketPaging;

    // Users
    if (url.includes('GetUsersByIDs')) return [mockTicketUser];
    if (url.includes('GetUserByID') || url.includes('GetUserByUsername')) return mockTicketUser;

    // Files
    if (url.includes('UploadTicketFile')) return { id: 'uploaded-file-uuid-1234' };
    if (url.includes('GetDownloadLinkTicketFile')) return { url: 'http://localhost:8080/files/sample.pdf' };

    return mockTickets;
  }

  // Authentication & Session
  if (url.includes('AuthUser')) return { SessionId: mockUserSession.sessionId };
  if (url.includes('IsSessionLive')) return { ISSessionLive: true };
  if (url.includes('GetCaptcha')) return mockCaptcha;
  if (url.includes('GetSessionSoftwareUser')) return mockSoftwareUserInfo;
  if (url.includes('GetVirtualMoneyWallet')) return mockWallet;
  if (
    url.includes('GetWebProcesses') ||
    url.includes('GetTaskBarWebProcesses') ||
    url.includes('GetVeyUsefulWebProcesses') ||
    url.includes('GetAllOfWebprocessGroupsWebprocesses')
  ) {
    return mockApiGroupProcesses;
  }

  // User Management
  if (url.includes('GetSoftwareUserProfile')) return mockSoftwareUserProfile;
  if (url.includes('GetSoftwareUser') || url.includes('RegisteringSoftwareUser')) return mockSoftwareUserInfo;
  if (url.includes('GetUserTypes')) return mockUserTypes;
  if (
    url.includes('ResetSoftwareUserPassword') ||
    url.includes('ResetSoftwareUserPasswordForMe')
  ) {
    return mockAPIUsernamePassword;
  }
  if (
    url.includes('EditSoftwareUser') ||
    url.includes('ActivateSMSOwner') ||
    url.includes('CustomizationSoftwareUserPassword') ||
    url.includes('SoftwareUserForgetPassword') ||
    url.includes('VerifySoftwareUserOTPCode') ||
    url.includes('SendWebsiteLink') ||
    url.includes('ChangeSoftwareUserWebProcessGroupAccess') ||
    url.includes('ChangeSoftwareUserWebProcessAccess')
  ) {
    return mockShortResponse;
  }

  // Section 4: Province & Cities, Loader Types, Product Types, LAD Places, Travel Times, Tariffs
  if (url.includes('GetProvinces')) return mockProvinces;
  if (url.includes('GetCities')) return mockProvinceAndCities;
  if (
    url.includes('ChangeActivateStatusOfProvince') ||
    url.includes('ChangeActivateStatusOfCity')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetLoaderTypeBySoftwareUser')) return mockLoaderTypes[0];
  if (url.includes('GetLoaderTypes')) return mockLoaderTypes;
  if (url.includes('GetLoaderTypeRelationAnnouncementSubGroups')) return mockLoaderTypeToAnnouncementSubGroupRelation;
  if (
    url.includes('ChangeActivateStatusOfLoaderType') ||
    url.includes('LoaderTypeRelationAnnouncementSubGroupRegistering') ||
    url.includes('LoaderTypeRelationAnnouncementSubGroupDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetProducts') || url.includes('GetProductTypes')) return mockProductTypes;
  if (
    url.includes('ChangeActivateStatusOfProductType') ||
    url.includes('ChangeActivateStatusOfProduct')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetLADPlaces')) return mockLADPlaces;
  if (url.includes('GetLADPlace') || url.includes('LADPlaceRegister')) return mockLADPlaces[0];
  if (
    url.includes('LADPlaceUpdate') ||
    url.includes('LADPlaceDelete') ||
    url.includes('LoadingPlaceChangeActiveStatus') ||
    url.includes('DischargingPlaceChangeActiveStatus')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetTravelTimes')) return mockTravelTimes;
  if (url.includes('GetTravelTimeforLoadAllocationForMe')) return { TravelTime: 73 };
  if (url.includes('GetTravelTime')) return mockTravelTimes[0];
  if (
    url.includes('TravelTimeRegistering') ||
    url.includes('TravelTimeEditing') ||
    url.includes('TravelTimeDeleting') ||
    url.includes('TravelTimeChangeActivateStatus')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetTariffs')) return mockTariffs;
  if (
    url.includes('TariffsRegisteringWithAddPercentage') ||
    url.includes('TariffsDeactivate') ||
    url.includes('TariffDeleting') ||
    url.includes('TariffEditing') ||
    url.includes('TariffsUploading') ||
    url.includes('TransportTariffsRegistering') ||
    url.includes('TariffRegistering')
  ) {
    return mockShortResponse;
  }

  // Announcements & Sequential Turns
  if (url.includes('GetAnnouncements')) return mockAnnouncementGroups;
  if (
    url.includes('AnnouncementRegistering') ||
    url.includes('AnnouncementEditing') ||
    url.includes('AnnouncementDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAnnouncementSubGroups')) return mockAnnouncementSubGroups;
  if (
    url.includes('AnnouncementSubGroupRegistering') ||
    url.includes('AnnouncementSubGroupEditing') ||
    url.includes('AnnouncementSubGroupDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAnnouncementRelationAnnouncementSubGroups')) return mockRelationOfAnnouncementGroupAndSubGroups;
  if (
    url.includes('AnnouncementRelationAnnouncementSubGroupRegistering') ||
    url.includes('AnnouncementRelationAnnouncementSubGroupDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllAnnouncementRelationProvinces')) return mockRelationOfAnnouncementSubGroupAndProvinces;
  if (
    url.includes('AnnouncementSubGroupRelationProvinceRegistering') ||
    url.includes('AnnouncementSubGroupRelationProvinceDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetSequentialTurnsRelationLoaderTypes')) return mockRelationOfSequentialTurnToLoaderTypes;
  if (
    url.includes('SequentialTurnRelationLoaderTypeRegistering') ||
    url.includes('SequentialTurnRelationLoaderTypeDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetSequentialTurnRelationAnnouncementSubGroups')) return mockRelationOfSequentialTurnToAnnouncementSubGroups;
  if (
    url.includes('SequentialTurnRelationAnnouncementSubGroupRegistering') ||
    url.includes('SequentialTurnRelationAnnouncementSubGroupDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetSequentialTurnsByLoaderType') || url.includes('GetSequentialTurns')) return mockSequentialTurns;
  if (
    url.includes('SequentialTurnRegistering') ||
    url.includes('SequentialTurnEditing') ||
    url.includes('SequentialTurnDeleting')
  ) {
    return mockShortResponse;
  }

  // Driver & Truck
  if (
    url.includes('GetTruckDriverFromRMTO') ||
    url.includes('GetTruckDriverFromWebsite') ||
    url.includes('GetTruckDriverBySoftwareUser') ||
    url.includes('GetTruckDriver')
  ) {
    return mockTruckDriverInfo;
  }
  if (url.includes('ResetTruckDriverUserPassword')) return mockAPIUsernamePassword;
  if (url.includes('SendOTPCode')) return mockSignUpInfo;
  if (
    url.includes('TruckDriverRegisteringMobileNumber') ||
    url.includes('ActivateTruckDriverSMSOwner') ||
    url.includes('TruckDriverRegistering') ||
    url.includes('SendWebsiteLink')
  ) {
    return mockShortResponse;
  }

  if (
    url.includes('GetComposedTruckInfForTurnIssue') ||
    url.includes('GetComposedTruckInf')
  ) {
    return mockTruckComposedInfo;
  }
  if (url.includes('SetComposedTruckInf')) return mockShortResponse;

  if (
    url.includes('GetTruckFromRMTO') ||
    url.includes('GetTruckFromWebsite') ||
    url.includes('GetTruckBySoftwareUser') ||
    url.includes('GetTruckInfo')
  ) {
    return mockTruckInfo;
  }
  if (url.includes('GetTruckNativenessTypes')) return mockTruckNativenessTypesInfo;
  if (url.includes('GetTruckNativeness') || url.includes('ChangeTruckNativeness')) return mockTruckNativenessInfo;

  // Factories and Production Centers (FPC)
  if (url.includes('GetFPCs')) return mockFPCsInfo;
  if (url.includes('GetFPC')) return mockFPCsInfo[0];
  if (url.includes('ResetFPCUserPassword')) return mockAPIUsernamePassword;
  if (
    url.includes('FPCRegistering') ||
    url.includes('EditFPC') ||
    url.includes('ActivateFPCSmsOwner') ||
    url.includes('FPCChangeActiveStatus')
  ) {
    return mockShortResponse;
  }

  // Transport Companies
  if (url.includes('GetTransportCompanies')) return mockTransportCompaniesInfo;
  if (
    url.includes('GetTransportCompanyfromSoftwareUser') ||
    (url.includes('GetTransportCompany') && !url.includes('GetTransportCompanies'))
  ) {
    return mockTransportCompaniesInfo[0];
  }
  if (url.includes('ResetTransportCompanyUserPassword')) return mockAPIUsernamePassword;
  if (
    url.includes('EditTransportCompany') ||
    url.includes('RegisteringTransportCompanies') ||
    url.includes('RegisteringTransportCompany') ||
    url.includes('ActivateTransportCompanySMSOwner') ||
    url.includes('TransportCompanyChangeActiveStatus')
  ) {
    return mockShortResponse;
  }

  // Loads & Load Allocations
  if (
    url.includes('GetLoadStatusesForSoftwareUserType') ||
    url.includes('GetLoadStatuses')
  ) {
    return mockLoadStatuses;
  }
  if (url.includes('GetLoadsfor')) return mockLoadsForTransportCompanies_Factories_Admins_Drivers;
  if (url.includes('GetTransportCompany100LastLoadPermissions')) return mockLoadPermissionsForCompany;
  if (url.includes('GetLoadPermissionsforTruckDriver')) return mockLoadPermissionsForDriver;
  if (url.includes('GetLoadPermissions')) return mockLoadPermissions;
  if (url.includes('GetTurnCostReport') || url.includes('GetLoadAccounting') || url.includes('GetLoadAccountingRecords')) return mockLoadAccounting;
  if (url.includes('GetLoad') && !url.includes('GetLoads')) return mockLoadInfo;
  if (
    url.includes('LoadRegisteringForTransportCompany') ||
    url.includes('LoadRegisteringForAdministrator') ||
    url.includes('LoadRegisteringForFPC')
  ) {
    return { newLoadId: 15 };
  }
  if (
    url.includes('LoadEditingForMe') ||
    url.includes('LoadEditing') ||
    url.includes('LoadDeletingForMe') ||
    url.includes('LoadDeleting') ||
    url.includes('LoadCancelling') ||
    url.includes('LoadFreeLining') ||
    url.includes('LoadSedimenting')
  ) {
    return mockShortResponse;
  }
  if (url.includes('GetTruckDriverLoadAllocationsRecords')) return mockLoadAllocationRecords;
  if (url.includes('GetTruckDriverLoadAllocations')) return mockLoadAllocationInfos;
  if (url.includes('LoadAllocateToOther')) return mockLoadAllocatedToNextTurn;
  if (url.includes('GetTravelTimeforLoadAllocationForMe')) return { TravelTime: 73 };
  if (
    url.includes('LoadAllocationRegisteringforTruckDriver') ||
    url.includes('LoadAllocationRegisteringforTransportCompany') ||
    url.includes('LoadAllocationRegisteringforAdministrator') ||
    url.includes('LoadAllocationCancelling') ||
    url.includes('LoadAllocationsChangePriority')
  ) {
    return mockShortResponse;
  }

  // Transport Tariff Params & TPT Params
  if (
    url.includes('GetListofTransportTariffsParamsByAnnouncementSGId') ||
    url.includes('GetListofTransportTariffsParams')
  ) {
    return mockTransportTariffParams;
  }
  if (
    url.includes('GetTPTParams') &&
    !url.includes('GetAllTPTParams') &&
    !url.includes('GetAllTPTParamsDetails')
  ) {
    return mockTransportTariffParamInString;
  }
  if (url.includes('GetAllTPTParamsDetails')) return mockTPTParamsRelationToAnnouncementGroupAndSubGroupInfo;
  if (url.includes('GetAllTPTParameters')) return mockTPTParamsInfo[0];
  if (url.includes('GetAllTPTParams')) return mockTPTParamsInfo;
  if (
    url.includes('TransportPriceTarrifParameterRegistering') ||
    url.includes('TransportPriceTarrifParameterEditing') ||
    url.includes('TransportPriceTarrifParameterDeleting') ||
    url.includes('TransportPriceTarrifParameterDetailRegistering') ||
    url.includes('TransportPriceTarrifParameterDetailEditing')
  ) {
    return mockShortResponse;
  }

  // Turns & Turn Costs
  if (url.includes('GetTop10TruckTurns')) return mockTurns;
  if (url.includes('GetTop5TruckTurns')) return mockTurnsForSoftwareUser;
  if (url.includes('GetTurnAccounting')) return mockTurnAccounting;
  if (url.includes('GetAllTurnStatuses')) return mockTurnStatus;
  if (
    url.includes('TurnCancellation') ||
    url.includes('TurnCancellationForMe') ||
    url.includes('TurnResuscitation') ||
    url.includes('RealTimeTurnRegisterRequest') ||
    url.includes('RealTimeTurnRegisterRequestForMe') ||
    url.includes('EmergencyTurnRegisterRequest') ||
    url.includes('ResuscitationReserveTurn') ||
    url.includes('ReserveTurnRegisterRequest')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllTurnCosts')) return mockTurnCosts;
  if (
    url.includes('TurnCostRegistering') ||
    url.includes('TurnCostDeleting')
  ) {
    return mockShortResponse;
  }

  // Load Permissions
  if (url.includes('LoadPermissionCancelling')) return mockShortResponse;

  // Traffic
  if (url.includes('TrafficCardTempTypes') || url.includes('GetTrafficCardTempTypes')) return mockTrafficCardTempTypes;
  if (url.includes('TrafficCardTypeCosts') || url.includes('GetTrafficCardTypeCosts') || url.includes('GetTrafficCosts')) return mockTrafficCardTypeCosts;
  if (url.includes('TrafficCardTypes') || url.includes('GetTrafficCardTypes')) return mockTrafficCardTypes;
  if (url.includes('TrafficReport') || url.includes('GetTrafficRecords')) return mockTrafficReportInfos;
  if (
    url.includes('RegisteringTrafficCardType') ||
    url.includes('RegisteringTrafficCard') ||
    url.includes('RegisteringTrafficCost') ||
    url.includes('EditingTrafficCardType')
  ) {
    return mockShortResponse;
  }
  if (url.includes('Traffic') || url.includes('GetTraffic')) return mockTrafficInfo;

  // Reports
  if (url.includes('GetTransportCompany100LastLoadPermissions')) return mockLoadPermissionsForCompany;
  if (url.includes('GetLoadPermissionsforTruckDriver')) return mockLoadPermissionsForDriver;
  if (url.includes('GetLoadPermissions')) return mockLoadPermissions;
  if (url.includes('GetTurnCostReport') || url.includes('GetLoadAccounting') || url.includes('GetLoadAccountingRecords')) return mockLoadAccounting;

  // Section 10: KernelTasksAPI & CarouselAPI
  if (url.includes('GetAllConfigurationOfLoadAnnouncement')) return mockLoadAnnouncementConfigs;
  if (
    url.includes('ConfigurationOfLoadAnnouncementDeleting') ||
    url.includes('ConfigurationOfLoadAnnouncementRegistering') ||
    url.includes('ConfigurationOfLoadAnnouncementEditing')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllOfConfigurations')) return mockGeneralConfigs;
  if (url.includes('GeneralConfigurationEditing')) return mockShortResponse;

  if (url.includes('GetAllDevices')) return mockDevicesInfo;
  if (
    url.includes('DeviceRegistering') ||
    url.includes('DeviceEditing') ||
    url.includes('DeviceDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllConfigurationOfDevices')) return mockDeviceConfig;
  if (
    url.includes('ConfigurationOfDeviceEditing') ||
    url.includes('ConfigurationOfDeviceRegistering') ||
    url.includes('ConfigurationOfDeviceDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllLoadAllocationConditions')) return mockLoadAllocationConditionsInfo;
  if (
    url.includes('LoadAllocationConditionRegistering') ||
    url.includes('LoadAllocationConditionEditing') ||
    url.includes('LoadAllocationConditionDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllLoadViewConditions')) return mockLoadViewConditionsInfo;
  if (
    url.includes('LoadViewConditionRegistering') ||
    url.includes('LoadViewConditionEditing') ||
    url.includes('LoadViewConditionDeleting')
  ) {
    return mockShortResponse;
  }

  if (url.includes('GetAllRequesters')) return mockRequestersInfo;

  if (url.includes('GetCarouselPicture')) return mockCarouselPic;
  if (url.includes('GetCarouselsForViewing')) return mockCarouselForViewPic;
  if (url.includes('GetCarousels')) return mockAllCarouselInfos;
  if (
    url.includes('CarouselRegistering') ||
    url.includes('CarouselEditing') ||
    url.includes('CarouselDeleting') ||
    url.includes('CarouselChangeActiveStatus')
  ) {
    return mockShortResponse;
  }

  // Wallet
  if (url.includes('GetMoneyWalletTransactions') || url.includes('GetWalletTransactions') || url.includes('GetMoneyWalletTransactionsForMe')) {
    return mockWalletTransactions;
  }
  if (url.includes('GetMoneyWalletChargeRecords') || url.includes('GetWalletPaymentRecords') || url.includes('GetMoneyWalletChargeRecordsForMe')) {
    return mockWalletPaymentHistories;
  }
  if (url.includes('GetDefaultAmounts')) {
    return mockWalletDefaultAmounts;
  }
  if (url.includes('GetTotalAmountOfUserFunction')) {
    return { Total: 236200 };
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
