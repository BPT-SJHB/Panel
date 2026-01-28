import z from 'zod';

export interface LoadAllocationInfo {
  LAId: number;
  LoadId: number;
  Priority?: number;
  LoadAllocationStatusColor?: string;
  GoodTitle?: string;
  SourceCityTitle?: string;
  TargetCityTitle?: string;
  Tonaj?: number;
  TransportCompanyTitle?: string;
  LoadingPlaceTitle?: string;
  DischargingPlaceTitle?: string;
  Description?: string;
  Address?: string;
  Recipient?: string;
  TPTParamsJoint?: string;
}

export const zodLoadAllocationInfo = z.object({
  LAId: z.number(),
  LoadId: z.number(),
  Priority: z.number(),
  LoadAllocationStatusColor: z.string(),
  GoodTitle: z.string(),
  SourceCityTitle: z.string(),
  TargetCityTitle: z.string(),
  Tonaj: z.number(),
  TransportCompanyTitle: z.string(),
  LoadingPlaceTitle: z.string(),
  DischargingPlaceTitle: z.string(),
  Description: z.string(),
  Address: z.string(),
  Recipient: z.string(),
  TPTParamsJoint: z.string(),
});
