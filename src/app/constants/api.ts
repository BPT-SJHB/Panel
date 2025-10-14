import { environment } from 'environments/environment';
const softwareUserAPIPort = 81;
const transportationAPIPort = 82;
const walletAndTrafficPort = 83;
const LoadCapacitorPort = 84;
const LoadAllocationPort = 85;
const ReportsPort = 86;
const ticketPort = 8080;
const ticketUrl = 'http://localhost';
const apiFixURLPart = '/api/';
const ticketApiFixURLPart = '/api/v1/';

export const API_ROUTES = {
  SoftwareUserAPI: {
    CAPTCHA: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetCaptcha`,
    AuthUser: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}AuthUser`,
    SessionChecker: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}IsSessionLive`,
    GetWebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetWebProcesses`,
    GetUserOfSession: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetSessionSoftwareUser`,
    GetVirtualWallet: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetVirtualMoneyWallet`,
    UserManagement: {
      GetSoftwareUserInfo: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetSoftwareUser`,
      GetSoftwareUserProfile: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetSoftwareUserProfile`,
      GetUserTypes: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetUserTypes`,
      RegisteringSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}RegisteringSoftwareUser`,
      EditSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}EditSoftwareUser`,
      ActivateSMSOwner: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}ActivateSMSOwner`,
      ResetSoftwareUserPassword: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}ResetSoftwareUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}SendWebsiteLink`,
      GetWebProcessGroups_WebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}GetAllOfWebprocessGroupsWebprocesses`,
      ChangeSoftwareUserWebProcessGroupAccess: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}ChangeSoftwareUserWebProcessGroupAccess`,
      ChangeSoftwareUserWebProcessAccess: `${environment.apiUrl}:${softwareUserAPIPort}${apiFixURLPart}ChangeSoftwareUserWebProcessAccess`,
    },
  },
  TransportationAPI: {
    Driver: {
      LoadAnnouncementPlaces: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLoadAnnouncementPlaces`,
      GetTruckDriverInfoFromOutdoorAPI: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckDriverFromRMTO`,
      GetTruckDriverInfoFromLocalAPI: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckDriverFromWebsite`,
      GetTruckDriverInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckDriverBySoftwareUser`,
      TruckDriverRegisteringMobileNumber: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TruckDriverRegisteringMobileNumber`,
      ActivateTruckDriverSMSOwner: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ActivateTruckDriverSMSOwner`,
      ResetTruckDriverUserPassword: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ResetTruckDriverUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SendWebsiteLink`,
    },
    Truck: {
      GetTruckInfoFromOutdoorAPI: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckFromRMTO`,
      GetTruckInfoFromLocalAPI: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckFromWebsite`,
      GetTruckInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckBySoftwareUser`,
      GetTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTruckNativeness`,
      ChangeTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeTruckNativeness`,
      ComposedInfos: {
        GetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetComposedTruckInf`,
        SetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SetComposedTruckInf`,
        GetComposedTruckInfoForTurnIssues: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetComposedTruckInfForTurnIssue`,
      },
    },
    FPC: {
      GetFPCs: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetFPCs`,
      GetFPC: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetFPC`,
      FPCRegistering: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}FPCRegistering`,
      EditFPC: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}EditFPC`,
      ActivateFPCSmsOwner: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ActivateFPCSmsOwner`,
      ResetFPCUserPassword: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ResetFPCUserPassword`,
      FPCChangeActiveStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}FPCChangeActiveStatus`,
    },
    TransportCompanies: {
      GetTransportCompanies: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTransportCompanies`,
      GetTransportCompany: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTransportCompany`,
      GetTransportCompanyBySoftwareUser: `${environment.apiUrl}:${transportationAPIPort}/api/GetTransportCompanyfromSoftwareUser`,
      EditTransportCompany: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}EditTransportCompany`,
      ActivateTransportCompanySmsService: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ActivateTransportCompanySMSOwner`,
      ResetTransportCompanyPassword: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ResetTransportCompanyUserPassword`,
      TransportCompanyChangeStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TransportCompanyChangeActiveStatus`,
    },
    LoadCapacitor: {
      GetLoad: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLoad`,
    },
    ProvinceAndCities: {
      GetCities: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetCities`,
      ChangeProvinceStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeActivateStatusOfProvince`,
      ChangeCityStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeActivateStatusOfCity`,
    },
    LoaderTypes: {
      GetLoaderTypes: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLoaderTypes`,
      GetLoaderTypeInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLoaderTypeBySoftwareUser`,
      ChangeLoaderTypeStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeActivateStatusOfLoaderType`,
    },
    ProductTypes: {
      GetProducts: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetProducts`,
      ChangeProductTypeStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeActivateStatusOfProductType`,
      ChangeProductStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ChangeActivateStatusOfProduct`,
    },
    LADPlaces: {
      GetLADPlaces: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLADPlaces`,
      GetLADPlace: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetLADPlace`,
      RegisterLADPlace: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}LADPlaceRegister`,
      UpdateLADPlace: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}LADPlaceUpdate`,
      DeleteLADPlace: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}LADPlaceDelete`,
      ChangeLoadingPlaceStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}LoadingPlaceChangeActiveStatus`,
      ChangeDischargingPlaceStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}DischargingPlaceChangeActiveStatus`,
    },
    TravelTime: {
      GetTravelTimes: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTravelTimes`,
      GetTravelTime: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTravelTime`,
      RegisterTravelTime: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TravelTimeRegistering`,
      EditTravelTime: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TravelTimeEditing`,
      DeleteTravelTime: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TravelTimeDeleting`,
      ChangeTravelTimeStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TravelTimeChangeActivateStatus`,
    },
    Tariffs: {
      GetTariffs: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTariffs`,
      ChangeTariffsPercentage: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsRegisteringWithAddPercentage`,
      ChangeTariffsStatus: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsDeactivate`,
      DeleteTariffs: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsDeleting`,
      EditTariffs: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsEditing`,
      UploadTariffsFile: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsUploading`,
      RegisterTariff: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TariffsRegistering`,
    },
    Announcements: {
      Groups: {
        GetAnnouncementGroups: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetAnnouncements`,
        RegisterAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementRegistering`,
        EditAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementEditing`,
        DeleteAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementDeleting`,
      },
      SubGroups: {
        GetAnnouncementSubGroups: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetAnnouncementSubGroups`,
        RegisterAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementSubGroupRegistering`,
        EditAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementSubGroupEditing`,
        DeleteAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementSubGroupDeleting`,
      },
      RelationOfAnnouncementGroupAndSubGroup: {
        GetRelations: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetAnnouncementRelationAnnouncementSubGroups`,
        DeleteRelation: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementRelationAnnouncementSubGroupDeleting`,
        RegisterRelation: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}AnnouncementRelationAnnouncementSubGroupRegistering`,
      },
    },
    SequentialTurns: {
      GetSequentialTurns: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetSequentialTurns`,
      RegisterSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnRegistering`,
      EditSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnEditing`,
      DeleteSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnDeleting`,
      RelationToLoaderTypes: {
        GetSequentialTurnWithLoaderType: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetSequentialTurnsByLoaderType`,
        GetRelationToLoaderTypes: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetSequentialTurnsRelationLoaderTypes`,
        RegisterRelationToLoaderType: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnRelationLoaderTypeRegistering`,
        DeleteRelationToLoaderType: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnRelationLoaderTypeDeleting`,
      },
      RelationToAnnouncementSubGroups: {
        GetRelationToAnnouncementSubGroups: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetSequentialTurnRelationAnnouncementSubGroups`,
        RegisterRelationToAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnRelationAnnouncementSubGroupRegistering`,
        DeleteRelationToAnnouncementSubGroupDeleting: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}SequentialTurnRelationAnnouncementSubGroupDeleting`,
      },
    },
    Turns: {
      GetLatestTurns: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTop10TruckTurns`,
      GetLatestTurnsForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTop5TruckTurns`,
      GetAccounting: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}GetTurnAccounting`,
      CancelTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TurnCancellation`,
      ResuscitateTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}TurnResuscitation`,
      TurnRegisterRequests: {
        RealTimeTurnRegister: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}RealTimeTurnRegisterRequest`,
        EmergencyTurnRegister: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}EmergencyTurnRegisterRequest`,
      },
      ReserveTurnRequests: {
        ResuscitateReserveTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ResuscitationReserveTurn`,
        RegisterReserveTurn: `${environment.apiUrl}:${transportationAPIPort}${apiFixURLPart}ReserveTurnRegisterRequest`,
      },
    },
    LoadPermissions: {
      CancelLoadPermission: `${environment.apiUrl}:${transportationAPIPort}/api/LoadPermissionCancelling`,
    },
  },
  WalletAndTrafficApi: {
    WalletInfo: {
      GetUserWallet: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetUserMoneyWallet`,
      GetWalletBalance: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetMoneyWalletBalance`,
      GetDefaultAmounts: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetDefaultAmounts`,
      GetWalletTransactions: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetMoneyWalletTransactions`,
      GetWalletPaymentRecords: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetMoneyWalletChargeRecords`,
      GetSmsWallet: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetSmsMoneyWallet`,
      GetTruckerAssociationWallet: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetTruckersAssociationMoneyWallet`,
      GetTransportCompanyWallet: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetTransportCompanyMoneyWallet`,
      GetTruckWallet: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetTruckMoneyWallet`,
      GetWalletWithCardNumber: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetMoneyWalletByCardNo`,
      GetTotalOfUserFunctions: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetTotalAmountOfUserFunction`,
      GetUserChargingFunctions: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}GetUserChargingFunction`,
    },
    WalletRequests: {
      PaymentRequest: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}PaymentRequest`,
      TransferWalletBalance: `${environment.apiUrl}:${walletAndTrafficPort}${apiFixURLPart}TransferMoneyWalletBalance`,
    },
  },
  LoadCapacitorAPI: {
    GetLoadStatus: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoadStatusesForSoftwareUserType`,
    GetLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoad`,
    GetLoadsForDriver: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoadsforTruckDriver`,
    GetLoadsForTransportCompanies: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoadsforTransportCompanies`,
    GetLoadsForFactoriesAndProductionCenters: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoadsforFactoriesAndProductionCenters`,
    GetLoadsForAdmin: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetLoadsforAdministrator`,
    GetTransportTariffParamsInJson: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetListofTransportTariffsParams`,
    GetTransportTariffParamsInString: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetTPTParams`,
    GetTransportTariffParamsByAnnouncementSGId: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}GetListofTransportTariffsParamsByAnnouncementSGId`,
    RegisterLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadRegistering`,
    EditLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadEditing`,
    DeleteLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadDeleting`,
    CancelLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadCancelling`,
    FreeLineLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadFreeLining`,
    SedimentLoad: `${environment.apiUrl}:${LoadCapacitorPort}${apiFixURLPart}LoadSedimenting`,
  },
  LoadAllocationAPI: {
    RegistrationForDrivers: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}LoadAllocationRegisteringforTruckDriver`,
    RegistrationForTransportCompanies: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}LoadAllocationRegisteringforTransportCompany`,
    RegistrationForAdmins: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}LoadAllocationRegisteringforAdministrator`,
    AllocateLoadToNextTurn: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}LoadAllocateToOther`,
    GetLoadAllocationOfDriver: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}GetTruckDriverLoadAllocations`,
    CancelLoadAllocation: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}LoadAllocationCancelling`,
    GetTravelTimeOfLoadAllocation: `${environment.apiUrl}:${LoadAllocationPort}${apiFixURLPart}GetTravelTimeforLoadAllocation`,
  },
  Reports: {
    Load: {
      GetLoadPermissions: `${environment.apiUrl}:${ReportsPort}${apiFixURLPart}GetLoadPermissions`,
      GetLoadPermissionsForDriver: `${environment.apiUrl}:${ReportsPort}${apiFixURLPart}GetLoadPermissionsforTruckDriver`,
      GetLoadAccounting: `${environment.apiUrl}:${ReportsPort}${apiFixURLPart}GetLoadAccountingRecords`,
    },
  },

  TicketAPI: {
    Auth: {
      SignUp: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}auth/SignUp/`,
      Login: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}auth/Login/`,
      LoginWithNoAuth: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}auth/LoginWithNoAuth/`,
      LoginWithSingleUseToken: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}auth/LoginWithSingleUseToken/`,
      GetSingleUseToken: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}auth/GetSingleUseToken/`,
    },
    Captcha: {
      GetCaptcha: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}captcha/GetCaptcha/`,
      VerifyCaptcha: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}captcha/VerifyCaptcha/`,
    },
    Version: {
      GetCurrentVersion: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}`,
    },
    Tickets: {
      CreateTicket: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/CreateTicket/`,
      GetTicketByTrackCode: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/GetTicketByTrackCode/`,
      GetTicketByID: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/GetTicketByID/`,
      CreateChat: (id: string) =>
        `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/${id}/CreateChat/`,
      GetTicketsList: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/GetTicketsList/`,
      GetAllActiveTicketTypes: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/GetAllActiveTicketTypes/`,
      GetAllActiveTicketStatuses: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}tickets/GetAllActiveTicketStatuses/`,
    },
    Departments: {
      GetAllActiveDepartments: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}departments/GetAllActiveDepartments/`,
    },
    Users: {
      GetUserByID: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}users/GetUserByID/`,
      GetUserByUsername: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}users/GetUserByUsername/`,
      GetUsersIDs: `${ticketUrl}:${ticketPort}${ticketApiFixURLPart}users/GetUsersByIDs/`,
    },
  },
};
