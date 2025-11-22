// Angular core imports
import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';

// NgRx store
import { Store } from '@ngrx/store';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';

// App shared layout components
import { HeaderComponent } from 'app/components/shared/layout/header/header/header.component';
import { SidebarComponent } from 'app/components/shared/layout/sidebar/sidebar/sidebar.component';
import { FooterComponent } from 'app/components/shared/layout/footer/footer.component';
import { TabManagerComponent } from 'app/components/shared/layout/tab-manager/tab-manager.component';
import { DashboardContentManagerComponent } from 'app/components/shared/layout/dashboard-content-manager/dashboard-content-manager.component';
import { SupportButtonComponent } from 'app/components/shared/support-button/support-button.component';

// Services
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';

// Constants and utilities
import { LayoutConfig } from 'app/constants/ui/layout.ui';
import { checkAndToastError } from 'app/utils/api-utils';

// NgRx actions and selectors
import { setPageGroups } from 'app/store/sidebar/sidebar.actions';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';

// Models
import { WebProcess } from 'app/data/model/web-process.model';
import { PageGroupItem } from 'app/data/model/menu-item.model';

// RxJS
import { takeUntil } from 'rxjs';
import { MobileTabBarComponent } from 'app/components/shared/layout/mobile-tab-bar/mobile-tab-bar.component';
import { ExitConfirmationDialogComponent } from 'app/components/shared/exit-confirmation-dialog/exit-confirmation-dialog.component';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';

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
    MobileTabBarComponent,
    SupportButtonComponent,
    ExitConfirmationDialogComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends BaseLoading implements AfterViewInit {
  // ViewChild references to content manager and tab manager
  @ViewChild(DashboardContentManagerComponent)
  contentManagerComponent!: DashboardContentManagerComponent;

  @ViewChild(TabManagerComponent)
  tabManagerComponent!: TabManagerComponent;

  // Layout configuration reference
  readonly layoutUi = LayoutConfig;

  // Services
  private store = inject(Store);
  private apiProcessesService = inject(ApiProcessesService);

  // Component state
  webProcesses: WebProcess[] = [];
  pageGroups: PageGroupItem[] = [];

  /**
   * OnInit lifecycle hook
   */
  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.setupDashboard();
  }

  /**
   * AfterViewInit lifecycle hook
   */
  ngAfterViewInit(): void {
    // Link tab manager to content manager
    this.tabManagerComponent.contentManager.set(this.contentManagerComponent);

    // Subscribe to selected page group and update web processes
    this.store
      .select(selectSelectedPageGroup)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        if (!page) return;
        this.webProcesses = page.processes;
      });
  }

  /**
   * Setup the dashboard: check auth, load processes, update store and menu items
   */
  private async setupDashboard(): Promise<void> {
    await this.withLoading(async () => {
      // Load API processes
      const res = await this.apiProcessesService.getApiProcesses();

      // Show error toast if needed
      if (!checkAndToastError(res, this.toast)) return;

      // Update NgRx store with loaded page groups
      this.store.dispatch(setPageGroups({ groups: res.data }));

      // Build menu items from page groups

      this.pageGroups = [
        {
          id: -1,
          icon: 'pi-home',
          label: 'صفحه اصلی',
          command: () => {},
        },
      ];

      res.data.map((pg) =>
        this.pageGroups.push({
          id: pg.id,
          label: pg.title,
          icon: pg.icon,
          command: () => {},
        })
      );
    });
  }
}
