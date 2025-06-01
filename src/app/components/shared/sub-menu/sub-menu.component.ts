import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabComponentKey } from 'app/constants/tab-component-registry';
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

  this.store.dispatch(addTab({
    title: process.title,
    closable: true,
    component: TabComponentKey.Main,
  }));
}

}
