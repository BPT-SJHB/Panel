import { TabComponentKey } from "app/constants/tab-component-registry";

export interface TabItem {
    id:number,
    title:string,
    closable:boolean
    component:TabComponentKey,  
    active:boolean
}