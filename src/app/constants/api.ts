import { environment } from 'environments/environment';
const softwareUserAPIPort = 81;
const transportationAPIPort = 82;
const walletAndTrafficPort = 83;

export const API_ROUTES = {
  SoftwareUserAPI: {
    CAPTCHA: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetCaptcha`,
    AuthUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/AuthUser`,
    SessionChecker: `${environment.apiUrl}:${softwareUserAPIPort}/api/IsSessionLive`,
    GetWebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetWebProcesses`,
    GetUserOfSession: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSessionSoftwareUser`,
    GetVirtualWallet: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetVirtualMoneyWallet`,
    UserManagement: {
      GetSoftwareUserInfo: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSoftwareUser`,
      GetSoftwareUserProfile: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSoftwareUserProfile`,
      GetUserTypes: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetUserTypes`,
      RegisteringSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/RegisteringSoftwareUser`,
      EditSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/EditSoftwareUser`,
      ActivateSMSOwner: `${environment.apiUrl}:${softwareUserAPIPort}/api/ActivateSMSOwner`,
      ResetSoftwareUserPassword: `${environment.apiUrl}:${softwareUserAPIPort}/api/ResetSoftwareUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${softwareUserAPIPort}/api/SendWebsiteLink`,
      GetWebProcessGroups_WebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetAllOfWebprocessGroupsWebprocesses`,
      ChangeSoftwareUserWebProcessGroupAccess: `${environment.apiUrl}:${softwareUserAPIPort}/api/ChangeSoftwareUserWebProcessGroupAccess`,
      ChangeSoftwareUserWebProcessAccess: `${environment.apiUrl}:${softwareUserAPIPort}/api/ChangeSoftwareUserWebProcessAccess`,
    },
  },
  TransportationAPI: {
    Driver: {
      LoadAnnouncementPlaces: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoadAnnouncementPlaces`,
      GetTruckDriverInfoFromOutdoorAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckDriverFromRMTO`,
      GetTruckDriverInfoFromLocalAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckDriverFromWebsite`,
      GetTruckDriverInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckDriverBySoftwareUser`,
      TruckDriverRegisteringMobileNumber: `${environment.apiUrl}:${transportationAPIPort}/api/TruckDriverRegisteringMobileNumber`,
      ActivateTruckDriverSMSOwner: `${environment.apiUrl}:${transportationAPIPort}/api/ActivateTruckDriverSMSOwner`,
      ResetTruckDriverUserPassword: `${environment.apiUrl}:${transportationAPIPort}/api/ResetTruckDriverUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${transportationAPIPort}/api/SendWebsiteLink`,
    },
    Truck: {
      GetTruckInfoFromOutdoorAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckFromRMTO`,
      GetTruckInfoFromLocalAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckFromWebsite`,
      GetTruckInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckBySoftwareUser`,
      GetTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckNativeness`,
      ChangeTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeTruckNativeness`,
      ComposedInfos: {
        GetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}/api/GetComposedTruckInf`,
        SetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}/api/SetComposedTruckInf`,
        GetComposedTruckInfoForTurnIssues: `${environment.apiUrl}:${transportationAPIPort}/api/GetComposedTruckInfForTurnIssue`,
      },
    },
    FPC: {
      GetFPCs: `${environment.apiUrl}:${transportationAPIPort}/api/GetFPCs`,
      GetFPC: `${environment.apiUrl}:${transportationAPIPort}/api/GetFPC`,
      FPCRegistering: `${environment.apiUrl}:${transportationAPIPort}/api/FPCRegistering`,
      EditFPC: `${environment.apiUrl}:${transportationAPIPort}/api/EditFPC`,
      ActivateFPCSmsOwner: `${environment.apiUrl}:${transportationAPIPort}/api/ActivateFPCSmsOwner`,
      ResetFPCUserPassword: `${environment.apiUrl}:${transportationAPIPort}/api/ResetFPCUserPassword`,
      FPCChangeActiveStatus: `${environment.apiUrl}:${transportationAPIPort}/api/FPCChangeActiveStatus`,
    },
    LoadCapacitor: {
      GetLoad: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoad`,
    },
    ProvinceAndCities: {
      GetCities: `${environment.apiUrl}:${transportationAPIPort}/api/GetCities`,
      ChangeProvinceStatus: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeActivateStatusOfProvince`,
      ChangeCityStatus: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeActivateStatusOfCity`,
    },
    LoaderTypes: {
      GetLoaderTypes: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoaderTypes`,
      GetLoaderTypeInfoForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoaderTypeBySoftwareUser`,
      ChangeLoaderTypeStatus: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeActivateStatusOfLoaderType`,
    },
    ProductTypes: {
      GetProducts: `${environment.apiUrl}:${transportationAPIPort}/api/GetProducts`,
      ChangeProductTypeStatus: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeActivateStatusOfProductType`,
      ChangeProductStatus: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeActivateStatusOfProduct`,
    },
    LADPlaces: {
      GetLADPlaces: `${environment.apiUrl}:${transportationAPIPort}/api/GetLADPlaces`,
      GetLADPlace: `${environment.apiUrl}:${transportationAPIPort}/api/GetLADPlace`,
      RegisterLADPlace: `${environment.apiUrl}:${transportationAPIPort}/api/LADPlaceRegister`,
      UpdateLADPlace: `${environment.apiUrl}:${transportationAPIPort}/api/LADPlaceUpdate`,
      DeleteLADPlace: `${environment.apiUrl}:${transportationAPIPort}/api/LADPlaceDelete`,
      ChangeLoadingPlaceStatus: `${environment.apiUrl}:${transportationAPIPort}/api/LoadingPlaceChangeActiveStatus`,
      ChangeDischargingPlaceStatus: `${environment.apiUrl}:${transportationAPIPort}/api/DischargingPlaceChangeActiveStatus`,
    },
    TravelTime: {
      GetTravelTimes: `${environment.apiUrl}:${transportationAPIPort}/api/GetTravelTimes`,
      GetTravelTime: `${environment.apiUrl}:${transportationAPIPort}/api/GetTravelTime`,
      RegisterTravelTime: `${environment.apiUrl}:${transportationAPIPort}/api/TravelTimeRegistering`,
      EditTravelTime: `${environment.apiUrl}:${transportationAPIPort}/api/TravelTimeEditing`,
      DeleteTravelTime: `${environment.apiUrl}:${transportationAPIPort}/api/TravelTimeDeleting`,
      ChangeTravelTimeStatus: `${environment.apiUrl}:${transportationAPIPort}/api/TravelTimeChangeActivateStatus`,
    },
    Tariffs: {
      GetTariffs: `${environment.apiUrl}:${transportationAPIPort}/api/GetTariffs`,
      ChangeTariffsPercentage: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsRegisteringWithAddPercentage`,
      ChangeTariffsStatus: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsDeactivate`,
      DeleteTariffs: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsDeleting`,
      EditTariffs: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsEditing`,
      UploadTariffsFile: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsUploading`,
      RegisterTariff: `${environment.apiUrl}:${transportationAPIPort}/api/TariffsRegistering`,
    },
    Announcements: {
      Groups: {
        GetAnnouncementGroups: `${environment.apiUrl}:${transportationAPIPort}/api/GetAnnouncements`,
        RegisterAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementRegistering`,
        EditAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementEditing`,
        DeleteAnnouncementGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementDeleting`,
      },
      SubGroups: {
        GetAnnouncementSubGroups: `${environment.apiUrl}:${transportationAPIPort}/api/GetAnnouncementSubGroups`,
        RegisterAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementSubGroupRegistering`,
        EditAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementSubGroupEditing`,
        DeleteAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementSubGroupDeleting`,
      },
      RelationOfAnnouncementGroupAndSubGroup: {
        GetRelations: `${environment.apiUrl}:${transportationAPIPort}/api/GetAnnouncementRelationAnnouncementSubGroups`,
        DeleteRelation: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementRelationAnnouncementSubGroupDeleting`,
        RegisterRelation: `${environment.apiUrl}:${transportationAPIPort}/api/AnnouncementRelationAnnouncementSubGroupRegistering`,
      },
    },
    SequentialTurns: {
      GetSequentialTurns: `${environment.apiUrl}:${transportationAPIPort}/api/GetSequentialTurns`,
      RegisterSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnRegistering`,
      EditSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnEditing`,
      DeleteSequentialTurn: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnDeleting`,
      RelationToLoaderTypes: {
        GetSequentialTurnWithLoaderType: `${environment.apiUrl}:${transportationAPIPort}/api/GetSequentialTurnsByLoaderType`,
        GetRelationToLoaderTypes: `${environment.apiUrl}:${transportationAPIPort}/api/GetSequentialTurnsRelationLoaderTypes`,
        RegisterRelationToLoaderType: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnRelationLoaderTypeRegistering`,
        DeleteRelationToLoaderType: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnRelationLoaderTypeDeleting`,
      },
      RelationToAnnouncementSubGroups: {
        GetRelationToAnnouncementSubGroups: `${environment.apiUrl}:${transportationAPIPort}/api/GetSequentialTurnRelationAnnouncementSubGroups`,
        RegisterRelationToAnnouncementSubGroup: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnRelationAnnouncementSubGroupRegistering`,
        DeleteRelationToAnnouncementSubGroupDeleting: `${environment.apiUrl}:${transportationAPIPort}/api/SequentialTurnRelationAnnouncementSubGroupDeleting`,
      },
    },
    Turns: {
      GetLatestTurns: `${environment.apiUrl}:${transportationAPIPort}/api/GetTop10TruckTurns`,
      GetLatestTurnsForSoftwareUser: `${environment.apiUrl}:${transportationAPIPort}/api/GetTop5TruckTurns`,
      GetAccounting: `${environment.apiUrl}:${transportationAPIPort}/api/GetTurnAccounting`,
      CancelTurn: `${environment.apiUrl}:${transportationAPIPort}/api/TurnCancellation`,
      ResuscitateTurn: `${environment.apiUrl}:${transportationAPIPort}/api/TurnResuscitation`,
      TurnRegisterRequests: {
        RealTimeTurnRegister: `${environment.apiUrl}:${transportationAPIPort}/api/RealTimeTurnRegisterRequest`,
        EmergencyTurnRegister: `${environment.apiUrl}:${transportationAPIPort}/api/EmergencyTurnRegisterRequest`,
      },
      ReserveTurnRequests: {
        ResuscitateReserveTurn: `${environment.apiUrl}:${transportationAPIPort}/api/ResuscitationReserveTurn`,
        RegisterReserveTurn: `${environment.apiUrl}:${transportationAPIPort}/api/ReserveTurnRegisterRequest`,
      },
    },
  },
  WalletAndTrafficApi: {
    WalletInfo: {
      GetUserWallet: `${environment.apiUrl}:${walletAndTrafficPort}/api/GetUserMoneyWallet`,
      GetWalletBalance: `${environment.apiUrl}:${walletAndTrafficPort}/api/GetMoneyWalletBalance`,
      GetDefaultAmounts: `${environment.apiUrl}:${walletAndTrafficPort}/api/GetDefaultAmounts`,
      GetWalletTransactions: `${environment.apiUrl}:${walletAndTrafficPort}/api/GetMoneyWalletTransactions`,
      GetWalletPaymentRecords: `${environment.apiUrl}:${walletAndTrafficPort}/api/GetMoneyWalletChargeRecords`,
    },
    WalletRequests: {
      PaymentRequest: `${environment.apiUrl}:${walletAndTrafficPort}/api/PaymentRequest`,
    },
  },
};
