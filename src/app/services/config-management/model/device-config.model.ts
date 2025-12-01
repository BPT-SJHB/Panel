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

export type EditInfoOfDeviceConfig = Pick<
  DeviceConfig,
  'CODId' | 'CODIndex' | 'DeviceId' | 'CODValue'
>;

export type DeleteInfoOfDeviceConfig = Pick<
  DeviceConfig,
  'CODId' | 'CODIndex' | 'DeviceId'
>;
