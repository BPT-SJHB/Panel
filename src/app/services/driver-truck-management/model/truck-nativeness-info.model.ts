export interface TruckNativenessInfo {
  TruckNativenessTypeId?: number;
  TruckNativenessTypeTitle?: string;
  TruckNativenessExpireDate: string;
}

export type TruckNativenessType = Pick<
  TruckNativenessInfo,
  'TruckNativenessTypeId' | 'TruckNativenessTypeTitle'
>;
