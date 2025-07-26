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
import { renderContent } from 'app/store/content-manager/content-manager.actions';

@Component({
  selector: 'app-sidebar-web-processes',
  standalone: true,
  imports: [CardModule],
  templateUrl: './sidebar-web-processes.component.html',
  styleUrl: './sidebar-web-processes.component.scss',
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
    // Default component to load
    let componentToLoad: TabComponentKey = TabComponentKey.Main;

    // If process ID matches a registered component key, use it
    if (Object.values(TabComponentKey).includes(process.id)) {
      componentToLoad = process.id as TabComponentKey;
    }

    // Dispatch action to create a new tab
    this.store.dispatch(
      createTab({
        title: process.title,
        icon: process.icon,
        closeable: true,
        component: componentToLoad,
      })
    );

    // Dispatch action to render content in the tab area
    this.store.dispatch(
      renderContent({
        title: process.title,
        context: 'tabContent',
        icon: process.icon,
      })
    );
  }
}
