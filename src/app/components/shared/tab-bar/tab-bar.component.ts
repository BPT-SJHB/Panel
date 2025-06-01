import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabItem } from 'app/data/model/tabs.model';
import { activeTab, closeTab } from 'app/store/tabs/tabs.actions';
import { selectActiveTab, selectAllTabs } from 'app/store/tabs/tabs.selectors';
import { TabsModule } from 'primeng/tabs'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab-bar',
  imports: [AsyncPipe, TabsModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss'
})

export class TabBarComponent implements OnInit {

  private store = inject(Store);
  render = true;
  tabs: TabItem[] = [];
  tabActive$!: Observable<TabItem | undefined>;

  ngOnInit(): void {
    this.store.select(selectAllTabs).subscribe((tabs) => {
      this.tabs = tabs;
    });
    this.tabActive$ = this.store.select(selectActiveTab);
  }

  onCloseTab(id: number) {
    this.store.dispatch(closeTab({ id }));
  }

  onTabClick(id: number) {
    this.store.dispatch(activeTab({ id }))
  }
}
