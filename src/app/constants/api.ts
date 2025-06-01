import { environment } from 'environments/environment';
const softwareUserAPIPort = 81;
const transportationAPIPort = 82;

export const API_ROUTES = {
  SoftwareUserAPI: {
    CAPTCHA: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetCaptcha`,
    AuthUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/AuthUser`,
    GetWebProcesses: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetWebProcesses`,
    UserManagement: {
      GetSoftwareUserInfo: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetSoftwareUser`,
      GetUserTypes: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetUserTypes`,
      RegisteringSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/RegisteringSoftwareUser`,
      EditSoftwareUser: `${environment.apiUrl}:${softwareUserAPIPort}/api/EditSoftwareUser`,
      ActivateSMSOwner: `${environment.apiUrl}:${softwareUserAPIPort}/api/ActivateSMSOwner`,
      ResetSoftwareUserPassword: `${environment.apiUrl}:${softwareUserAPIPort}/api/ResetSoftwareUserPassword`,
      SendWebsiteLink: `${environment.apiUrl}:${softwareUserAPIPort}/api/SendWebsiteLink`,
    },
  },
  TransportationAPI: {
    LoadAnnouncementPlaces: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoadAnnouncementPlaces`,
  },
};
