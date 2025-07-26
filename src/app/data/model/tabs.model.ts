import { ComponentRef, WritableSignal } from '@angular/core';
import {
  TabComponentKey,
  TabConfig,
} from 'app/constants/tab-component-registry';

export interface TabItem {
  id: number;
  title: string;
  closable: boolean;
  component: TabComponentKey;
  active: boolean;
}

/** ================================
 *  Interfaces
 *  ================================ */
export interface DynamicTab {
  id: string;
  title: string;
  icon: string;
  closeable: boolean;
  sharedSignal?: WritableSignal<any>;
  cachedComponent: Map<number, ComponentRef<any>>;
  selectedSubTab: number;
  config: TabConfig;
}
