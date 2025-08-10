import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContextManagerState } from './content-manager.reducer';

// --- Feature Selector ---
export const selectContentState = createFeatureSelector<ContextManagerState>('content');

// --- Select Full State (optional, usually not needed unless debugging) ---
export const selectContent = createSelector(
  selectContentState,
  (state): ContextManagerState => state
);
