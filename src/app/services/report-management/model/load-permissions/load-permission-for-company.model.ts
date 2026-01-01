import z from 'zod';

export interface LoadPermissionForCompany {
  LoadAllocationId: number;
  Pelak: string;
  Serial: string;
  TruckSmartCardNo: string;
  Driver: string;
  TruckDriverNationalCode: string;
  TruckDriverDrivingLicenseNo: string;
  TruckDriverTel: string;
  LoadAllocationDateTime: string;
  LoadId: number;
  SourceCityTitle: string;
  TargetCityTitle: string;
  ProductTitle: string;
  LoadDescription: string;
  SoftwareUserAllocater: string;
}

export const zodLoadPermissionForCompany = z.object({
  LoadAllocationId: z.number(),
  Pelak: z.string(),
  Serial: z.string(),
  TruckSmartCardNo: z.string(),
  Driver: z.string(),
  TruckDriverNationalCode: z.string(),
  TruckDriverDrivingLicenseNo: z.string(),
  TruckDriverTel: z.string(),
  LoadAllocationDateTime: z.string(),
  LoadId: z.number(),
  SourceCityTitle: z.string(),
  TargetCityTitle: z.string(),
  ProductTitle: z.string(),
  LoadDescription: z.string(),
  SoftwareUserAllocater: z.string(),
});
