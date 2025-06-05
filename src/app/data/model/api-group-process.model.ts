import { ApiProcess } from './api-process.model';

export interface ApiGroupProcess {
  PGId: number;
  PGTitle?: string;
  PGIconName?: string;
  WebProcesses: ApiProcess[];
  PGAccess?: boolean;
}
