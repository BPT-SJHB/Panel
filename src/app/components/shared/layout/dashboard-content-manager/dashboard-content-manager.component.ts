import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DynamicTab } from 'app/data/model/tabs.model';
import { WebProcess } from 'app/data/model/web-process.model';
import { renderContent } from 'app/store/content-manager/content-manager.actions';
import { selectContentState } from 'app/store/content-manager/content-manager.selectors';
import { selectSelectedPageGroup } from 'app/store/sidebar/sidebar.selectors';
import { DEFAULT_MAIN_TAB_ID } from 'app/store/tab/tab.reducer';
import { SidebarWebProcesses } from '../sidebar/sidebar-web-processes/sidebar-web-processes.component';
import { TabConfig } from 'app/constants/tab-component-registry';

@Component({
  selector: 'app-dashboard-content-manager',
  imports: [SidebarWebProcesses],
  templateUrl: './dashboard-content-manager.component.html',
  styleUrl: './dashboard-content-manager.component.scss',
})
export class DashboardContentManagerComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('tabContent', { read: ViewContainerRef })
  tabContent?: ViewContainerRef;

  private readonly store = inject(Store);
  private pageGroupSub$?: Subscription;
  private contentSub$?: Subscription;
  private currentTabId = '';

  webProcesses: WebProcess[] = [];
  subMenuVisible = false;

  ngAfterViewInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  loadTabContent(tab: DynamicTab): void {
    if (!this.tabContent) return;

    const id = `${tab.id}-${tab.selectedSubTab}`;
    if (this.currentTabId === id && !this.subMenuVisible) return;
    this.currentTabId = id;

    this.clearPreviousContent();

    const { selectedSubTab, cachedComponent, config } = tab;
    const cachedComponentRef = cachedComponent.get(selectedSubTab);

    if (cachedComponentRef) {
      this.loadCachedComponent(cachedComponentRef, tab);
    } else {
      this.createNewComponent(tab);
    }
  }

  private setupSubscriptions(): void {
    this.pageGroupSub$ = this.store
      .select(selectSelectedPageGroup)
      .subscribe((page) => {
        if (page) {
          this.webProcesses = page.processes;
        }
      });

    this.contentSub$ = this.store
      .select(selectContentState)
      .subscribe((state) => {
        this.subMenuVisible = state.context === 'subMenu';
      });
  }

  private cleanupSubscriptions(): void {
    this.pageGroupSub$?.unsubscribe();
    this.contentSub$?.unsubscribe();
  }

  private clearPreviousContent(): void {
    if (this.tabContent && this.tabContent.length > 0) {
      this.tabContent.detach(0);
    }
  }

  private loadCachedComponent(componentRef: any, tab: DynamicTab): void {
    this.tabContent?.insert(componentRef.hostView);
    this.activateComponent(componentRef.instance);
    this.sendRenderContent(tab);
  }

  private createNewComponent(tab: DynamicTab): void {
    if (!this.tabContent) return;

    const { selectedSubTab, cachedComponent, config } = tab;
    const subTab = config.subTab[selectedSubTab];
    const componentType = subTab?.component;

    if (!componentType) return;

    const componentRef = this.tabContent.createComponent(componentType);

    this.assignStaticData(componentRef, subTab.data);
    this.setupSharedSignal(componentRef, tab, config);
    this.activateComponent(componentRef.instance);

    cachedComponent.set(selectedSubTab, componentRef);
    this.sendRenderContent(tab);
  }

  private assignStaticData(componentRef: any, data?: any): void {
    if (data) {
      Object.assign(componentRef.instance, data);
    }
  }

  private setupSharedSignal(
    componentRef: any,
    tab: DynamicTab,
    config: TabConfig
  ): void {
    if (config.sharedSignal) {
      if (!tab.sharedSignal) {
        tab.sharedSignal = signal(null);
      }
      Object.assign(componentRef.instance, { sharedSignal: tab.sharedSignal });
    }
  }

  private activateComponent(instance: any): void {
    instance.onViewActivated?.();
  }

  private sendRenderContent(tab: DynamicTab): void {
    this.store.dispatch(
      renderContent({
        pageGroupId: DEFAULT_MAIN_TAB_ID === tab.id ? -1 : undefined,
        context: 'tabContent',
        icon: tab.icon,
        title: tab.title,
      })
    );
  }
}
