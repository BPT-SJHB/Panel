import { TrafficCardTypeCost } from '../model/traffic-card-type-cost.model';

export const mockTrafficCardTypeCosts: TrafficCardTypeCost[] = [
  {
    TrafficCardTypeId: 1,
    EntryBaseCost: 100000,
    NoCostStoppageDuration: 24,
    ExcessStoppageDuration: 24,
    ExcessStoppageCost: 50000,
  },
  {
    TrafficCardTypeId: 2,
    EntryBaseCost: 400000,
    NoCostStoppageDuration: 48,
    ExcessStoppageDuration: 24,
    ExcessStoppageCost: 110000,
  },
];
