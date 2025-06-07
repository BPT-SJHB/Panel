import {
  Component,
  ComponentRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  inject
} from '@angular/core';
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

import { APP_ROUTES } from 'app/constants/routes';
import { setPageGroups, selectPageGroup, closeSidebar } from 'app/store/sidebar/sidebar.actions';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';

import { HeaderData } from 'app/data/model/header-data.model';
import { WebProcess } from 'app/data/model/web-process.model';
import { MenuItemData } from 'app/data/model/menu-item.model';
import { selectActiveTab, selectLastClosedTabId } from 'app/store/tabs/tabs.selectors';
import { TabComponentRegistry } from 'app/constants/tab-component-registry';
import { TabItem } from 'app/data/model/tabs.model';
import { Subscription } from 'rxjs';
import { TabViewComponent } from 'app/components/shared/tab-view/tab-view.component';

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
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabView', { read: ViewContainerRef }) container!: ViewContainerRef;

  private userAuth = inject(UserAuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private store = inject(Store);
  private apiProcessesService = inject(ApiProcessesService);

  private componentCache = new Map<number, ComponentRef<any>>();
  private tabSub?: Subscription;
  private closeTabSub?: Subscription;
  private pageGroupSub?: Subscription;

  headerData: HeaderData = { title: '', icon: '' };
  webProcesses: WebProcess[] = [];
  menuItems: MenuItemData[] = [];
  subMenuVisible = false;

  async ngOnInit(): Promise<void> {
    await this.setupDashboard();
  }

  ngAfterViewInit(): void {
    this.tabSub = this.store.select(selectActiveTab).subscribe(tab => {
      this.subMenuVisible = false;
      if (tab) this.renderComponent(tab);
    });

    this.closeTabSub = this.store.select(selectLastClosedTabId).subscribe(id => {
      if (id !== null) this.removeComponent(id);
    });

    this.pageGroupSub = this.store.select(selectSelectedPageGroup).subscribe(page => {
      if (!page) return;

      if (this.headerData.title.trim())
        this.subMenuVisible = true;

      this.headerData = {
        title: page.title,
        icon: page.icon,
      };
      this.webProcesses = page.processes;
    });
  }

  ngOnDestroy(): void {
    this.tabSub?.unsubscribe();
    this.closeTabSub?.unsubscribe();
    this.pageGroupSub?.unsubscribe();
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
        this.subMenuVisible = true;
        this.store.dispatch(closeSidebar());
      },
    }));
  }

  renderComponent(tab: TabItem) {
    const cached = this.componentCache.get(tab.id);

    if (this.container.length > 0) {
      this.container.detach(0);
    }

    if (cached && !cached.hostView.destroyed) {
      this.container.insert(cached.hostView);
      return;
    }

    const compRef = this.container.createComponent(TabViewComponent);
    const views = TabComponentRegistry[tab.component];
    compRef.instance.views = views;

    this.container.insert(compRef.hostView);
    this.componentCache.set(tab.id, compRef);
  }

  removeComponent(id: number) {
    const compRef = this.componentCache.get(id);
    if (!compRef) return;

    const index = this.container.indexOf(compRef.hostView);
    if (index !== -1) {
      this.container.detach(index);
    }

    compRef.destroy();
    this.componentCache.delete(id);
  }
}
