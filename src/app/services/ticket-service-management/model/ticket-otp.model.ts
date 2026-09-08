export interface SendOTPResponse {
  message: string;
}

export interface VerifyOTPResponse {
  message: string;
  valid: boolean;
}
