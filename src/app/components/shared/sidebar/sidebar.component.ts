import { Component, HostListener, input, Input, OnInit, TemplateRef } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { SidebarService } from 'app/services/side-bar-service/sidebar.service';
import { CommonModule } from '@angular/common';
import { MenuItemData } from 'app/data/model/menu-item.model';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,DrawerModule, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() width:string = '18rem';
  @Input() menuItems:MenuItemData[] = [];
  isMobile = false;
  isOpen = false;

  constructor(private sidebarService:SidebarService){

  }

  ngOnInit() {
    this.updateIsMobile();
    this.sidebarService.isOpen$.subscribe(state => {
      this.isOpen = state;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIsMobile();
  }

  updateIsMobile() {
    this.isMobile = window.innerWidth < 992;
  }
}
