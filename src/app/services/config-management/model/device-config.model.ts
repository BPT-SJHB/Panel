import { z } from 'zod';

export interface DeviceConfig {
  CODId: number;
  CODName: string;
  CODTitle: string;
  CODIndex: number;
  CODIndexTitle: string;
  DeviceId: number;
  DeviceTitle: string;
  Description: string;
  CODValue: string;
}

export const zodDeviceConfig = z.object({
  CODId: z.number(),
  CODName: z.string(),
  CODTitle: z.string(),
  CODIndex: z.number(),
  CODIndexTitle: z.string(),
  DeviceId: z.number(),
  DeviceTitle: z.string(),
  Description: z.string(),
  CODValue: z.string(),
});

export type EditInfoOfDeviceConfig = Pick<
  DeviceConfig,
  'CODId' | 'CODIndex' | 'DeviceId' | 'CODValue'
>;

export type DeleteInfoOfDeviceConfig = Pick<
  DeviceConfig,
  'CODId' | 'CODIndex' | 'DeviceId'
>;
