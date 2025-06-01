// sidebar.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidebarState } from './sidebar.reducer';

// --- Feature Selector ---
export const selectSidebarState = createFeatureSelector<SidebarState>('sidebar');

// --- Primitive Selectors ---
export const selectIsSidebarOpen = createSelector(
  selectSidebarState,
  state => state.isOpen
);

export const selectPageGroups = createSelector(
  selectSidebarState,
  state => state.pageGroups
);

export const selectSelectedPageGroupId = createSelector(
  selectSidebarState,
  state => state.selectedPageGroupId
);

// --- Derived Selectors ---
export const selectSelectedPageGroup = createSelector(
  selectPageGroups,
  selectSelectedPageGroupId,
  (groups, selectedId) => groups.find(group => group.id === selectedId)
);

