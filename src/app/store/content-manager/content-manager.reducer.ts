import { createReducer, on } from '@ngrx/store';
import { renderContent } from './content-manager.actions';

export interface ContextManagerState {
  pageGroupId?: number;
  title: string;
  context: 'subMenu' | 'tabContent';
  icon: string;
}

const initialState: ContextManagerState = {
  title: 'صفحه اصلی',
  context: 'tabContent',
  icon: 'pi pi-home',
};

export const contentManagerReducer = createReducer(
  initialState,
  on(renderContent, (_, { pageGroupId,title, context, icon }) => ({
    pageGroupId,
    title,
    context,
    icon,
  }))
);
