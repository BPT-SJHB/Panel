export interface GeneralConfig {
  CId: number;
  CTitle: string;
  CName: string;
  CIndex: number;
  CIndexTitle: string;
  CValue: string;
  Description: string;
}

export type EditInfoOfGeneralConfig = Pick<
  GeneralConfig,
  'CId' | 'CIndex' | 'CValue'
>;
