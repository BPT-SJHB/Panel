import { Type } from '@angular/core';
import { MainTabComponent } from 'app/components/tabs/main-tab/main-tab.component';


export enum TabComponentKey {
  Main = 'Main',

}

export const TabComponentRegistry: Record<TabComponentKey, Type<any>> = {
  [TabComponentKey.Main]: MainTabComponent
};
