import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageGroupItem } from 'app/data/model/menu-item.model';
import { renderContent } from 'app/store/content-manager/content-manager.actions';
import {
  closeSidebar,
  selectPageGroup,
} from 'app/store/sidebar/sidebar.actions';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar-page-group',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar-page-group.component.html',
  styleUrl: './sidebar-page-group.component.scss',
})
export class SidebarPageGroupComponent {
  // Input list of sidebar menu items
  @Input() pageGroupItems: PageGroupItem[] = [];

  // Inject the NgRx store
  private readonly store = inject(Store);

  /**
   * Dispatches relevant actions when a menu item is clicked:
   * - Selects the page group based on item id
   * - Closes the sidebar
   * - Updates content context with title and icon
   */
  onClickMenuItem({ id, label, icon }: PageGroupItem): void {
    this.store.dispatch(selectPageGroup({ id }));
    this.store.dispatch(closeSidebar());
    this.store.dispatch(
      renderContent({
        title: label,
        icon,
        context: 'subMenu',
      })
    );
  }
}
