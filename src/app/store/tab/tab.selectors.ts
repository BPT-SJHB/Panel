// sidebar.selectors.ts
import { createFeatureSelector } from '@ngrx/store';
import { TabData } from './tab.reducer';

export const selectorNewTab = createFeatureSelector<TabData>('tab');