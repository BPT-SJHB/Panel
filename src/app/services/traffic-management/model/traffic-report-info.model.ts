import { z } from 'zod';

export interface TrafficReportInfo {
  EntryExitId: number;
  EntryShamsiDate: string;
  EntryTime: string;
  EntryTrafficCardNo: string;
  EntrySoftwareUser: string;
  EntryCost: number;
  EntryGateTitle: string;
  ExitShamsiDate: string;
  ExitTime: string;
  ExitTrafficCardNo: string;
  ExitSoftwareUser: string;
  ExitCost: number;
  ExitGateTitle: string;
  FlagA: boolean;
}

export const zodTrafficReportInfo = z.object({
  EntryExitId: z.number(),
  EntryShamsiDate: z.string(),
  EntryTime: z.string(),
  EntryTrafficCardNo: z.string(),
  EntrySoftwareUser: z.string(),
  EntryCost: z.number(),
  EntryGateTitle: z.string(),
  ExitShamsiDate: z.string(),
  ExitTime: z.string(),
  ExitTrafficCardNo: z.string(),
  ExitSoftwareUser: z.string(),
  ExitCost: z.number(),
  ExitGateTitle: z.string(),
  FlagA: z.boolean(),
});
