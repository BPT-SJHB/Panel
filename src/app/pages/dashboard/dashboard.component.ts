// Angular core imports
import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

// NgRx store
import { Store } from '@ngrx/store';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';

// App shared layout components
import { HeaderComponent } from 'app/components/shared/layout/header/header.component';
import { SidebarComponent } from 'app/components/shared/layout/sidebar/sidebar/sidebar.component';
import { FooterComponent } from 'app/components/shared/layout/footer/footer.component';
import { TabManagerComponent } from 'app/components/shared/layout/tab-manager/tab-manager.component';
import { DashboardContentManagerComponent } from 'app/components/shared/layout/dashboard-content-manager/dashboard-content-manager.component';

// Services
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { ToastService } from 'app/services/toast-service/toast.service';

// Constants and utilities
import { APP_ROUTES } from 'app/constants/routes';
import { LayoutConfig } from 'app/constants/ui/layout.ui';
import { checkAndToastError } from 'app/utils/api-utils';

// NgRx actions and selectors
import { setPageGroups } from 'app/store/sidebar/sidebar.actions';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';

// Models
import { WebProcess } from 'app/data/model/web-process.model';
import { PageGroupItem } from 'app/data/model/menu-item.model';

// RxJS
import { Subscription } from 'rxjs';
import { SupportButtonComponent } from "app/components/shared/support-button/support-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TabManagerComponent,
    DashboardContentManagerComponent,
    SupportButtonComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  // ViewChild references to content manager and tab manager
  @ViewChild(DashboardContentManagerComponent)
  contentManagerComponent!: DashboardContentManagerComponent;

  @ViewChild(TabManagerComponent)
  tabManagerComponent!: TabManagerComponent;

  // Layout configuration reference
  readonly layoutUi = LayoutConfig;

  // Services
  private userAuth = inject(UserAuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private store = inject(Store);
  private apiProcessesService = inject(ApiProcessesService);

  // Subscription to selected page group
  private pageGroupSub?: Subscription;

  // Component state
  webProcesses: WebProcess[] = [];
  pageGroups: PageGroupItem[] = [];

  /**
   * OnInit lifecycle hook
   */
  async ngOnInit(): Promise<void> {
    await this.setupDashboard();
  }

  /**
   * AfterViewInit lifecycle hook
   */
  ngAfterViewInit(): void {
    // Link tab manager to content manager
    this.tabManagerComponent.contentManager.set(this.contentManagerComponent);

    // Subscribe to selected page group and update web processes
    this.pageGroupSub = this.store
      .select(selectSelectedPageGroup)
      .subscribe((page) => {
        if (!page) return;
        this.webProcesses = page.processes;
      });
  }

  /**
   * OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    this.pageGroupSub?.unsubscribe();
  }

  /**
   * Setup the dashboard: check auth, load processes, update store and menu items
   */
  private async setupDashboard(): Promise<void> {
    const auth = await this.userAuth.isLoggedIn();

    // If not logged in or session expired, redirect to login
    if (!auth.success && !auth.data?.ISSessionLive) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }

    // Load API processes
    const res = await this.apiProcessesService.getApiProcesses();

    // Show error toast if needed
    if (!checkAndToastError(res, this.toast)) return;

    // Update NgRx store with loaded page groups
    this.store.dispatch(setPageGroups({ groups: res.data }));

    // Build menu items from page groups
    this.pageGroups = res.data.map((pg) => ({
      id: pg.id,
      label: pg.title,
      icon: pg.icon,
      command: () => {}, // Command can be customized later
    }));
  }
}
