import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from 'app/components/shared/header/header.component';
import { SidebarComponent } from 'app/components/shared/sidebar/sidebar.component';
import { SubMenuComponent } from 'app/components/shared/sub-menu/sub-menu.component';
import { FooterComponent } from 'app/components/shared/footer/footer.component';
import { SupportButtonComponent } from 'app/components/shared/support-button/support-button.component';

import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { UserManagementService } from 'app/services/user-management/user-management.service';

import { APP_ROUTES } from 'app/constants/routes';
import { setPageGroups, selectPageGroup, closeSidebar } from 'app/store/sidebar/sidebar.actions';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';

import { HeaderData } from 'app/data/model/header-data.model';
import { WebProcess } from 'app/data/model/web-process.model';
import { MenuItemData } from 'app/data/model/menu-item.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    SidebarComponent,
    SubMenuComponent,
    FooterComponent,
    SupportButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private userAuth = inject(UserAuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private store = inject(Store);
  private apiProcessesService = inject(ApiProcessesService);
  private userManagement = inject(UserManagementService);

  headerData: HeaderData = { title: '', icon: '' };
  webProcesses: WebProcess[] = [];
  menuItems: MenuItemData[] = [];

  ngOnInit(): void {
    this.setupDashboard();
  }

  private async setupDashboard(): Promise<void> {
    const auth = await this.userAuth.isLoggedIn();
    if (!auth.success && !auth.data?.ISSessionLive) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }

    const res = await this.apiProcessesService.getApiProcesses();
    if (!res.success || !res.data) {
      this.toast.error('خطا', res.error?.message ?? 'خطایی رخ داده است');
      console.error('API error details:', res.error?.details);
      return;
    }

    this.store.dispatch(setPageGroups({ groups: res.data }));

    this.menuItems = res.data.map(pg => ({
      label: pg.title,
      icon: pg.icon,
      command: () => {
        this.store.dispatch(selectPageGroup({ id: pg.id }));
        this.store.dispatch(closeSidebar());
      },
    }));

    this.store.select(selectSelectedPageGroup).subscribe(page => {
      if (!page) return;

      this.headerData = {
        title: page.title,
        icon: page.icon,
      };
      this.webProcesses = page.processes;
    });
  }
}
