// sidebar.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SidebarActions from 'app/store/sidebar/sidebar.actions';
import { PageGroup } from 'app/data/model/page-group.model';

export interface SidebarState {
  isOpen: boolean;
  pageGroups: PageGroup[];
  selectedPageGroupId: number;
}

const initialState: SidebarState = {
  isOpen: false,
  pageGroups: [],
  selectedPageGroupId: 0,
};

export const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.openSidebar, (state) => ({ ...state, isOpen: true })),
  on(SidebarActions.closeSidebar, (state) => ({ ...state, isOpen: false })),
  on(SidebarActions.toggleSidebar, (state) => ({
    ...state,
    isOpen: !state.isOpen,
  })),
  on(SidebarActions.setPageGroups, (state, { groups }) => {
    const validId =
      groups.find((g) => g.id === state.selectedPageGroupId)?.id ||
      groups[0]?.id ||
      0;
    return { ...state, pageGroups: groups, selectedPageGroupId: validId };
  }),
  on(SidebarActions.selectPageGroup, (state, { id }) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });    
    const exists = state.pageGroups.some((g) => g.id === id);
    return exists ? { ...state, selectedPageGroupId: id } : state;
  })
);
