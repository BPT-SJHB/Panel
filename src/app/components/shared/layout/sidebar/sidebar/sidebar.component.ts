// Angular core
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

// RxJS
import { Observable } from 'rxjs';

// NgRx store
import { Store } from '@ngrx/store';
import { selectIsSidebarOpen } from 'app/store/sidebar/sidebar.selectors';
import { closeSidebar } from 'app/store/sidebar/sidebar.actions';

// PrimeNG
import { DrawerModule } from 'primeng/drawer';

// Components
import { SidebarPageGroupComponent } from '../sidebar-page-group/sidebar-page-group.component';

// Models
import { PageGroupItem } from 'app/data/model/menu-item.model';
import { LogoComponent } from '../logo/logo.component';
import { SearchProcessesComponent } from '../search-processes/search-processes.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    DrawerModule,
    SidebarPageGroupComponent,
    LogoComponent,
    SearchProcessesComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  // Sidebar drawer width (default: 18rem)
  @Input() width: string = '18rem';

  // List of page groups to display inside the sidebar
  @Input() pageGroupItems: PageGroupItem[] = [];

  // Whether the device is considered mobile
  isMobile = false;

  // Observable for sidebar open/close state
  isOpen$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.updateIsMobile();
    this.isOpen$ = this.store.select(selectIsSidebarOpen);
  }

  // Update `isMobile` when window resizes
  @HostListener('window:resize')
  onResize(): void {
    this.updateIsMobile();
  }

  // Check current window width to determine mobile state
  updateIsMobile(): void {
    this.isMobile = window.innerWidth < 992;
  }

  // Handle drawer close event
  onDrawerClose(): void {
    this.store.dispatch(closeSidebar());
  }
}
