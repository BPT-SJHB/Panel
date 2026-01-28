import z from 'zod';

export interface LoadPermission {
  LoadId: number;
  GoodTitle: string;
  LoadSourceCity: string;
  LoadTargetCity: string;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  TransportCompany: string;
  Recipient: string;
  Address: string;
  Description: string;
  LoadRegisteringUser: string;
  LoadAllocationUser: string;
  LoadAllocationId: number;
  LicensePlate: string;
  SmartCardNo: string;
  TruckDriver: string;
  NationalCode: string;
  MobileNumber: string;
  ShamsiDate: string;
  Time: string;
  SequentialTurn: string;
  Note: string;
  LoadAllocationStatusTitle: string;
  TPTParamsJoint: string;
}

export const zodLoadPermission = z.object({
  LoadId: z.number(),
  GoodTitle: z.string(),
  LoadSourceCity: z.string(),
  LoadTargetCity: z.string(),
  AnnouncementTitle: z.string(),
  AnnouncementSGTitle: z.string(),
  TransportCompany: z.string(),
  Recipient: z.string(),
  Address: z.string(),
  Description: z.string(),
  LoadRegisteringUser: z.string(),
  LoadAllocationUser: z.string(),
  LoadAllocationId: z.number(),
  LicensePlate: z.string(),
  SmartCardNo: z.string(),
  TruckDriver: z.string(),
  NationalCode: z.string(),
  MobileNumber: z.string(),
  ShamsiDate: z.string(),
  Time: z.string(),
  SequentialTurn: z.string(),
  Note: z.string(),
  LoadAllocationStatusTitle: z.string(),
  TPTParamsJoint: z.string(),
});
