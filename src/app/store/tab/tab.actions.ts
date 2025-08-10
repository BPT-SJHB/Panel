import { createAction, props } from "@ngrx/store";
import { TabData } from "./tab.reducer";


export const createTab = createAction("[Tab] Create", props<TabData>());