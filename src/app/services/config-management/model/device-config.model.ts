export interface Device {
  DeviceId: number;
  DeviceTitle: string;
  DeviceLocation: string;
  Active: boolean;
}

export type RegisterInfoOfDevice = Pick<
  Device,
  'DeviceTitle' | 'DeviceLocation' | 'Active'
>;
export type DeleteInfoOfDevice = Pick<Device, 'DeviceId'>;
