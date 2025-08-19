// Angular core imports
import { Component, Input, inject } from '@angular/core';

// NgRx store
import { Store } from '@ngrx/store';

// PrimeNG
import { CardModule } from 'primeng/card';

// Models and constants
import { WebProcess } from 'app/data/model/web-process.model';
import { TabComponentKey } from 'app/constants/tab-component-registry';

// Store actions
import { createTab } from 'app/store/tab/tab.actions';
import { DEFAULT_MAIN_TAB_ID } from 'app/store/tab/tab.reducer';

@Component({
  selector: 'app-sidebar-web-processes',
  standalone: true,
  imports: [CardModule],
  templateUrl: './sidebar-web-processes.component.html',
  styleUrls: ['./sidebar-web-processes.component.scss'],
})
export class SidebarWebProcesses {
  // Inject NgRx store
  private store = inject(Store);

  // Input: list of processes to render as sub-menu items
  @Input() processes: WebProcess[] = [];

  /**
   * Called when a submenu item is clicked
   * Dispatches actions to open a new tab and render content
   */
  onClickSubMenu(process: WebProcess): void {
    const componentToLoad: TabComponentKey = 
      Object.values(TabComponentKey).includes(process.id) 
        ? (process.id as TabComponentKey) 
        : TabComponentKey.Main;

    const isMainPage = componentToLoad === TabComponentKey.Main;

    const tabPayload = {
      id: isMainPage ? DEFAULT_MAIN_TAB_ID : undefined,
      title: isMainPage ? 'صفحه اصلی' : process.title,
      icon: isMainPage ? 'pi pi-home' : process.icon,
      closeable: true,
      component: componentToLoad,
    };

    // Dispatch action to create a new tab
    this.store.dispatch(createTab(tabPayload));
  }
}
