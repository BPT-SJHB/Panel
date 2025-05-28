import { environment } from 'environments/environment';
const softwareUserAPIPort = 81;
const transportationAPIPort = 82;

export const API_ROUTES = {
  SoftwareUserAPI: {
    CAPTCHA: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetCaptcha`,
    Auth: `${environment.apiUrl}:${softwareUserAPIPort}/api/AuthUser`,
    Processes: `${environment.apiUrl}:${softwareUserAPIPort}/api/GetWebProcesses`,
  },
  TransportationAPI: {
    LoadAnnouncementPlaces: `${environment.apiUrl}:${transportationAPIPort}/api/GetLoadAnnouncementPlaces`,
  },
};
