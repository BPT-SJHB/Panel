import z from 'zod';

export interface TransportCompany {
  TCId: number;
  TCTitle?: string;
  TCOrganizationCode?: string;
  TCCityTitle?: string;
  TCTel?: string;
  TCManagerMobileNumber?: string;
  TCManagerNameFamily?: string;
  EmailAddress?: string;
  Active?: boolean;
}

export const zodTransportCompany = z.object({
  TCId: z.number(),
  TCTitle: z.string().optional(),
  TCOrganizationCode: z.string().optional(),
  TCCityTitle: z.string().optional(),
  TCTel: z.string().optional(),
  TCManagerMobileNumber: z.string().optional(),
  TCManagerNameFamily: z.string().optional(),
  EmailAddress: z.string().optional(),
  Active: z.boolean().optional(),
});
