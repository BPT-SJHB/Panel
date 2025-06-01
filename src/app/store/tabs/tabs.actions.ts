import { createAction, props } from "@ngrx/store";
import { TabComponentKey } from "app/constants/tab-component-registry";

export const addTab = createAction("[Tabs] Create", props<{
    title: string,
    closable: boolean,
    component: TabComponentKey, 
}>());

export const closeTab = createAction("[Tabs] Close", props<{ id: number }>());
export const closeAllTab = createAction("[Tabs] CloseAll");
export const activeTab = createAction("[Tabs] Active", props<{ id: number }>());
