export interface RawTrafficCost {
  TrafficCardTypeId: number;
  EntryBaseCost: number;
  NoCostStoppageDuration: number;
  ExcessStoppageDuration: number;
  ExcessStoppageCost: number;
  Active: boolean;
}
