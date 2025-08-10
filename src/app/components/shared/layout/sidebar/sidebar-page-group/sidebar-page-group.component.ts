import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PanelMenuModule } from 'primeng/panelmenu';

import { PageGroupItem } from 'app/data/model/menu-item.model';
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { DEFAULT_MAIN_TAB_ID } from 'app/store/tab/tab.reducer';

import { createTab } from 'app/store/tab/tab.actions';
import { renderContent } from 'app/store/content-manager/content-manager.actions';
import { selectContent } from 'app/store/content-manager/content-manager.selectors';
import {
  closeSidebar,
  selectPageGroup,
} from 'app/store/sidebar/sidebar.actions';

@Component({
  selector: 'app-sidebar-page-group',
  standalone: true,
  imports: [PanelMenuModule, NgClass],
  templateUrl: './sidebar-page-group.component.html',
  styleUrl: './sidebar-page-group.component.scss',
})
export class SidebarPageGroupComponent implements AfterViewInit, OnDestroy {
  // Sidebar menu items
  @Input() pageGroupItems: PageGroupItem[] = [];

  private readonly store = inject(Store);
  private subscription?: Subscription;

  // Currently active page group ID (used for UI state)
  readonly activePageGroupId = signal<number | null>(-1);

  ngAfterViewInit(): void {
    this.subscription = this.store
      .select(selectContent)
      .subscribe((content) => {
        const isTabContent = content.context === 'tabContent';
        const isMainTab = isTabContent && content.pageGroupId === -1;

        if (isTabContent) this.activePageGroupId.set(isMainTab ? -1 : null);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Handles menu item clicks:
   * - Opens main tab if id === -1
   * - Otherwise selects page group and closes sidebar
   * - Always updates content context
   */
  onClickMenuItem({ id, label, icon }: PageGroupItem): void {
    const isMainTab = id === -1;
    const context = isMainTab ? 'tabContent' : 'subMenu';

    this.activePageGroupId.set(id);

    if (isMainTab) {
      this.store.dispatch(
        createTab({
          id: DEFAULT_MAIN_TAB_ID,
          title: label,
          closeable: false,
          icon,
          component: TabComponentKey.Main,
        })
      );
    } else {
      this.store.dispatch(selectPageGroup({ id }));
    }
    
    this.store.dispatch(closeSidebar());
    this.store.dispatch(
      renderContent({
        title: label,
        icon,
        context,
        pageGroupId: isMainTab ? -1 : undefined,
      })
    );
  }
}
