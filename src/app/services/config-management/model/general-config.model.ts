import { z } from 'zod';

export interface GeneralConfig {
  CId: number;
  CTitle: string;
  CName: string;
  CIndex: number;
  CIndexTitle: string;
  CValue: string;
  Description: string;
}

export const zodGeneralConfig = z.object({
  CId: z.number(),
  CTitle: z.string(),
  CName: z.string(),
  CIndex: z.number(),
  CIndexTitle: z.string(),
  CValue: z.string(),
  Description: z.string(),
});

export type EditInfoOfGeneralConfig = Pick<
  GeneralConfig,
  'CId' | 'CIndex' | 'CValue'
>;
