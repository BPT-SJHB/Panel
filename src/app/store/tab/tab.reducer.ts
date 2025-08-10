// tab.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { createTab } from './tab.actions';

export interface TabData {
  id?: string;
  title: string;
  icon: string;
  component: TabComponentKey;
  closeable: boolean;
}

export const DEFAULT_MAIN_TAB_ID = '00000000-0000-0000-0000-000000000000';
const initialState: TabData = {
  id: DEFAULT_MAIN_TAB_ID,
  title: 'صفحه اصلی',
  icon: 'pi pi-class',
  component: TabComponentKey.Main,
  closeable: false,
};

export const tabReducer = createReducer(
  initialState,
  on(createTab, (state, { id, title, icon, component, closeable }) => {
    return { ...state, id, title, icon, component, closeable };
  })
);
