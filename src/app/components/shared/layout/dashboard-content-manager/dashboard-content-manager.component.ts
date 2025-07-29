import {
  AfterViewInit,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicTab } from 'app/data/model/tabs.model';
import { SidebarWebProcesses } from '../sidebar/sidebar-web-processes/sidebar-web-processes.component';
import { WebProcess } from 'app/data/model/web-process.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';
import { selectContentState } from 'app/store/content-manager/content-manager.selectors';
import { renderContent } from 'app/store/content-manager/content-manager.actions';

@Component({
  selector: 'app-dashboard-content-manager',
  imports: [SidebarWebProcesses],
  templateUrl: './dashboard-content-manager.component.html',
  styleUrl: './dashboard-content-manager.component.scss',
})
export class DashboardContentManagerComponent implements AfterViewInit {
  @ViewChild('tabContent', { read: ViewContainerRef })
  tabContent?: ViewContainerRef;

  private store = inject(Store);
  private pageGroupSub$?: Subscription;
  private contentSub$?: Subscription;

  webProcesses: WebProcess[] = [];
  subMenuVisible: boolean = false;

  loadTabContent(tab: DynamicTab) {
    // Clear previous content
    if (!this.tabContent || this.tabContent?.length > 0) {
      this.tabContent?.detach(0);
    }

    const { selectedSubTab, cachedComponent, config } = tab;
    const cached = cachedComponent.get(selectedSubTab);

    // If component is already cached, insert its host view
    if (cached) {
      this.tabContent?.insert(cached.hostView);
      (cached.instance as any).onViewActivated?.();
      this.sendRenderContent(tab);
      return;
    }

    // If not cached, create it and store in cache
    const subTab = config.subTab[selectedSubTab];
    const componentType = subTab?.component;
    if (!componentType || !this.tabContent) return;

    const componentRef = this.tabContent.createComponent(componentType);

    // Pass static data
    if (subTab.data) {
      Object.assign(componentRef.instance, subTab.data);
    }

    // Provide shared signal if specified
    if (config.shearedSignal) {
      Object.assign(componentRef.instance, { shearedSignal: tab.sharedSignal });
    }

    // Insert component view and cache it
    (componentRef.instance as any).onViewActivated?.();
    cachedComponent.set(selectedSubTab, componentRef);
    this.sendRenderContent(tab);
  }

  private sendRenderContent(tab: DynamicTab) {
    this.store.dispatch(
      renderContent({
        context: 'tabContent',
        icon: tab.icon,
        title: tab.title,
      })
    );
  }

  ngAfterViewInit(): void {
    this.pageGroupSub$ = this.store
      .select(selectSelectedPageGroup)
      .subscribe((page) => {
        if (!page) return;
        this.webProcesses = page.processes;
      });

    this.contentSub$ = this.store
      .select(selectContentState)
      .subscribe((state) => {
        this.subMenuVisible = state.context === 'subMenu';
      });
  }

  ngOnDestroy(): void {
    this.pageGroupSub$?.unsubscribe();
    this.contentSub$?.unsubscribe();
  }
}
