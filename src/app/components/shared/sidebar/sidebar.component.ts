import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItemData } from 'app/data/model/menu-item.model';
import { selectIsSidebarOpen } from 'app/store/sidebar/sidebar.selectors';
import { closeSidebar } from 'app/store/sidebar/sidebar.actions';
import {DrawerModule} from "primeng/drawer"
import { AsyncPipe,NgTemplateOutlet } from '@angular/common';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  imports:[AsyncPipe,NgTemplateOutlet,DrawerModule,SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() width: string = '18rem';
  @Input() menuItems: MenuItemData[] = [];

  isMobile = false;
  isOpen$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.updateIsMobile();
    this.isOpen$ = this.store.select(selectIsSidebarOpen);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIsMobile();
  }

  updateIsMobile() {
    this.isMobile = window.innerWidth < 992;
  }

  onDrawerClose() {
    this.store.dispatch(closeSidebar());
  }
}
