import { SendOTPResponse, VerifyOTPResponse } from '../model/ticket-otp.model';

export const mockTicketSendOtp: SendOTPResponse = {
  message: 'پیامک ارسال شد',
};

export const mockTicketVerifyOtp: VerifyOTPResponse = {
  message: 'تایید شد',
  valid: true,
};
