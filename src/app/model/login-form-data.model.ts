export interface LoginFormData {
  username: string;
  password: string;
  rememberMe:boolean,
  captcha: {
    sessionId:string,
    value:string,
  };
}
