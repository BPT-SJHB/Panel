export interface DeviceInfo {
  DeviceId: number;
  DeviceTitle: string;
  DeviceLocation: string;
  Active: boolean;
}

export type RegisterInfoOfDevice = Pick<
  DeviceInfo,
  'DeviceTitle' | 'DeviceLocation' | 'Active'
>;
export type DeleteInfoOfDevice = Pick<DeviceInfo, 'DeviceId'>;
