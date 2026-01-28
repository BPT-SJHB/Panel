import z from 'zod';

export interface WalletPaymentRequest {
  Authority: string;
  PaymentURI: string;
}

export const zodWalletPaymentRequest = z.object({
  Authority: z.string(),
  PaymentURI: z.string(),
});
