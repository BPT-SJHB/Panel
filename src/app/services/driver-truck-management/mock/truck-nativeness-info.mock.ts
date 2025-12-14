import {
  TruckNativenessInfo,
  TruckNativenessType,
} from '../model/truck-nativeness-info.model';

export const mockTruckNativenessInfo: TruckNativenessInfo = {
  TruckNativenessTypeId: 2,
  TruckNativenessTypeTitle: 'بومی',
  TruckNativenessExpireDate: '1404/07/21',
};

export const mockTruckNativenessTypesInfo: TruckNativenessType[] = [
  {
    TruckNativenessTypeId: 1,
    TruckNativenessTypeTitle: 'بومی',
  },
  {
    TruckNativenessTypeId: 2,
    TruckNativenessTypeTitle: 'غیر بومی',
  },
];
