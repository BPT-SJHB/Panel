import {createAction,props} from '@ngrx/store'
import { PageGroup } from 'app/data/model/page-group.model';


export const openSidebar = createAction('[Sidebar] Open');
export const closeSidebar = createAction('[Sidebar] Close');
export const toggleSidebar = createAction('[Sidebar] Toggle');


export const setPageGroups = createAction('[Sidebar] Set Page Groups', props<{ groups: PageGroup[] }>());
export const selectPageGroup = createAction('[Sidebar] Select Page Group', props<{ id: number }>());
