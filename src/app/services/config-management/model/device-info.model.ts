import { z } from 'zod';

export interface DeviceInfo {
  DeviceId: number;
  DeviceTitle: string;
  DeviceLocation: string;
  Active: boolean;
}

export const zodDeviceInfo = z.object({
  DeviceId: z.number(),
  DeviceTitle: z.string(),
  DeviceLocation: z.string(),
  Active: z.boolean(),
});

export type RegisterInfoOfDevice = Pick<
  DeviceInfo,
  'DeviceTitle' | 'DeviceLocation' | 'Active'
>;

export type DeleteInfoOfDevice = Pick<DeviceInfo, 'DeviceId'>;
