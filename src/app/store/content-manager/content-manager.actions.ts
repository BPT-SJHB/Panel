import { createAction, props } from "@ngrx/store";
import { ContextManagerState } from "./content-manager.reducer";

export const renderContent = createAction('[ContentManager] Render Content',props<ContextManagerState>());
