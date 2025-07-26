import { createAction, props } from "@ngrx/store";
import { TabComponentKey } from "app/constants/tab-component-registry";
import { TabData } from "./tab.reducer";

export const addTab = createAction("[Tabs] Create", props<{
    title: string,
    closable: boolean,
    component: TabComponentKey, 
}>());

export const createTab = createAction("[Tab] Create", props<TabData>());