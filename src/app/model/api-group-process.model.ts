import { ApiProcess } from './api-process.model';

export interface ApiGroupProcess {
  PGTitle: string;
  PGIconName: string;
  WebProcesses: [ApiProcess];
}
