import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabComponentKey, TabComponentRegistry } from 'app/constants/tab-component-registry';
import { WebProcess } from 'app/data/model/web-process.model';
import { addTab } from 'app/store/tabs/tabs.actions';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sub-menu',
  imports: [CardModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent {
  private store = inject(Store);

  @Input() processes: WebProcess[] = [];


  onClickSubMenu(process: WebProcess) {
  // console.log(process.title);

  let componentToLoad:TabComponentKey = TabComponentKey.Main; 
  if (Object.values(TabComponentKey).includes(process.id)) {
    componentToLoad = process.id as TabComponentKey;
  }
  
  this.store.dispatch(addTab({
    title: process.title,
    closable: true,
    component: componentToLoad,
  }));
}
}
