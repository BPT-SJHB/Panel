// sidebar.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TabsState } from './tabs.reducer';

export const selectTabsState = createFeatureSelector<TabsState>('tabs');

export const selectAllTabs = createSelector(
  selectTabsState,
  (state) => state.tabs
);

export const selectActiveTab = createSelector(
  selectTabsState,
  (state) => state.tabs.find(tab => tab.active)
);

export const selectTabById = (id: number) => createSelector(
  selectTabsState,
  (state) => state.tabs.find(tab => tab.id === id)
);
