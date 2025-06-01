import { Component, Input } from '@angular/core';
import { MenuItemData } from 'app/data/model/menu-item.model';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar-menu',
  imports: [PanelMenuModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {
  @Input() items:MenuItemData[] = [];

}
