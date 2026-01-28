import { z } from 'zod';

export interface TruckDriverInfo {
  DriverId: number;
  NationalCode?: string;
  NameFamily?: string;
  MobileNumber?: string;
  FatherName?: string;
  DrivingLicenseNo?: string;
  Address?: string;
  SmartCardNo?: string;
}

export const zodTruckDriverInfo = z.object({
  DriverId: z.number(),
  NationalCode: z.string().optional(),
  NameFamily: z.string().optional(),
  MobileNumber: z.string().optional(),
  FatherName: z.string().optional(),
  DrivingLicenseNo: z.string().optional(),
  Address: z.string().optional(),
  SmartCardNo: z.string().optional(),
});
