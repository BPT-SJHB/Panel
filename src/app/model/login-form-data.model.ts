export interface LoginFormData {
  username: string;
  password: string;
  rememberMe:boolean,
  captcha: {
    id:string,
    value:string,
  };
}
