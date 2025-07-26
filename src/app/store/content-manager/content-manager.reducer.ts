import { createReducer, on } from '@ngrx/store';
import { renderContent } from './content-manager.actions';

export interface ContextManagerState {
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
  on(renderContent, (_, { title, context, icon }) => ({
    title,
    context,
    icon,
  }))
);
