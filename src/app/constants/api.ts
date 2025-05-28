import { environment } from 'environments/environment';

export const API_ROUTES = {
  CAPTCHA: `${environment.apiUrl}:81/api/GetCaptcha`,
  Auth: `${environment.apiUrl}:81/api/AuthUser`,
  Processes: `${environment.apiUrl}:81/api/GetWebProcesses`,
  LoadAnnouncementPlaces: `${environment.apiUrl}:82/api/GetLoadAnnouncementPlaces`,
};