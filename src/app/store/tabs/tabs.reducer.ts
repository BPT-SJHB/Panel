// tab.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { TabItem } from 'app/data/model/tabs.model';
import * as TabsActions from './tabs.actions';
import { TabComponentKey } from 'app/constants/tab-component-registry';

export interface TabsState {
  tabs: TabItem[];
  lastClosedTabId: number | null;
}

const initialState: TabsState = {
  tabs: [
    {
      id: 0,
      title: 'صفحه اصلی',
      closable: false,
      component: TabComponentKey.Main,
      active: true,
    },
  ],
  lastClosedTabId: null,
};

let idCounter = 1;

export const tabReducer = createReducer(
  initialState,

  on(TabsActions.addTab, (state, { title, closable, component }) => {
    const newTab: TabItem = {
      id: idCounter++,
      title,
      closable,
      component,
      active: true,
    };

    // deactivate all other tabs and add new one
    return {
      ...state,
      tabs: [...state.tabs.map((tab) => ({ ...tab, active: false })), newTab],
    };
  }),

  on(TabsActions.closeTab, (state, { id }) => {
    const filtered = state.tabs.filter((tab) => tab.id !== id);
    if (filtered.length === 0) {
      return state; // prevent empty tab list
    }

    // در صورت بدستن تب کناری انتخاب شود
    const wasActive = state.tabs.find((tab) => tab.id === id)?.active;
    if (wasActive) {
      filtered[filtered.length - 1] = {
        ...filtered[filtered.length - 1],
        active: true,
      };
    }

    return {
      ...state,
      tabs: filtered,
      lastClosedTabId: id,
    };
  }),

  on(TabsActions.closeAllTab, (state) => {
    return {
      ...state,
      tabs: [{ ...state.tabs[0] }],
    };
  }),

  on(TabsActions.activeTab, (state, { id }) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    return {
      ...state,
      tabs: state.tabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      })),
    };
  })
);
