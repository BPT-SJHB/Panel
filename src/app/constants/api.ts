import { environment } from 'environments/environment';
const softwareUserAPIPort = 81;
const transportationAPIPort = 82;

export const API_ROUTES = {
  SoftwareUserAPI: {
    CAPTCHA: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetCaptcha`,
    AuthUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/AuthUser`,
    GetWebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetWebProcesses`,
    GetUserOfSession: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSessionSoftwareUser`,
    GetVirtualWallet: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetVirtualMoneyWallet`,
    UserManagement: {
      GetSoftwareUserInfo: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSoftwareUser`,
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
      TruckDriverRegisteringMobileNumber: `${environment.apiUrl}:${transportationAPIPort}/api/TruckDriverRegisteringMobileNumber`,
      ActivateTruckDriverSMSOwner: `${environment.apiUrl}:${transportationAPIPort}/api/ActivateTruckDriverSMSOwner`,
      ResetTruckDriverUserPassword: `${environment.apiUrl}:${transportationAPIPort}/api/ResetTruckDriverUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${transportationAPIPort}/api/SendWebsiteLink`,
    },
    Truck: {
      GetTruckInfoFromOutdoorAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckFromRMTO`,
      GetTruckInfoFromLocalAPI: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckFromWebsite`,
      GetTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}/api/GetTruckNativeness`,
      ChangeTruckNativeness: `${environment.apiUrl}:${transportationAPIPort}/api/ChangeTruckNativeness`,
    },
    Driver_Truck_Wallet: {
      GetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}/api/GetComposedTruckInf`,
      SetComposedTruckInfo: `${environment.apiUrl}:${transportationAPIPort}/api/SetComposedTruckInf`,
      GetVirtualWallet: `${environment.apiUrl}:${transportationAPIPort}/api/GetVirtualMoneyWallet`,
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
  },
};
