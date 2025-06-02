import { WebProcess } from './web-process.model';

export interface PageGroup {
  id: number;
  title: string;
  icon: string;
  processes: WebProcess[];
}
