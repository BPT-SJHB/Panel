import { environment } from "../../environments/environment";

export const API_ROUTES = {
  CAPTCHA: `${environment.apiUrl}/api/GetCaptcha`,
  Auth:`${environment.apiUrl}/api/AuthUser`,
};