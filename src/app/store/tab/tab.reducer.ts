// tab.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  TabComponentKey,
  TabComponentRegistry,
} from 'app/constants/tab-component-registry';
import { createTab } from './tab.actions';

export interface TabData {
  title: string;
  icon: string;
  component: TabComponentKey;
  closeable: boolean;
}

const initialState: TabData = {
  title: 'صفحه اصلی',
  icon: 'pi pi-class',
  component: TabComponentKey.Main,
  closeable: false,
};

export const tabReducer = createReducer(
  initialState,
  on(createTab, (state, { title, icon, component, closeable }) => {
    return { ...state, title, icon, component, closeable };
  })
);
