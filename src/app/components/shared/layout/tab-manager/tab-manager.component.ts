// Angular core
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
  signal,
  HostListener,
  AfterViewChecked,
} from '@angular/core';
import { NgClass } from '@angular/common';

// PrimeNG
import { TabsModule } from 'primeng/tabs';

// NgRx store
import { Store } from '@ngrx/store';
import { selectorNewTab } from 'app/store/tab/tab.selectors';
import { selectContent } from 'app/store/content-manager/content-manager.selectors';

// Constants & models
import {
  TabComponentKey,
  TabComponentRegistry,
} from 'app/constants/tab-component-registry';
import { DynamicTab } from 'app/data/model/tabs.model';
import { DEFAULT_MAIN_TAB_ID, TabData } from 'app/store/tab/tab.reducer';

// Utilities
import { uuidV4 } from 'app/utils/uuid';

// RxJS
import { Subject, takeUntil, auditTime, filter, tap } from 'rxjs';
import { DashboardContentManagerComponent } from '../dashboard-content-manager/dashboard-content-manager.component';

@Component({
  selector: 'app-tab-manager',
  standalone: true,
  templateUrl: './tab-manager.component.html',
  styleUrl: './tab-manager.component.scss',
  imports: [NgClass, TabsModule],
})
export class TabManagerComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked
{
  // ================================
  // Signals & State
  // ================================
  readonly contentManager = signal<DashboardContentManagerComponent | null>(
    null
  );
  readonly hiddenSubTab = signal<boolean>(false);
  readonly hoverTabId = signal<string>('');

  readonly tabs = new Map<string, DynamicTab>([
    [
      DEFAULT_MAIN_TAB_ID,
      {
        id: DEFAULT_MAIN_TAB_ID,
        title: 'صفحه اصلی',
        icon: 'pi pi-home',
        config: TabComponentRegistry[TabComponentKey.Main],
        closeable: false,
        selectedSubTab: 0,
        cachedComponent: new Map(),
      },
    ],
  ]);
  readonly selectTab = signal<DynamicTab>(this.tabs.get(DEFAULT_MAIN_TAB_ID)!);

  // ================================
  // Internal Subjects
  // ================================
  private readonly resize$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  // ================================
  // Dependencies
  // ================================
  private readonly store = inject(Store);

  private prvTabId = '-100';

  private tabsCached = true;
  constructor() {
    // Effect to load tab content whenever the selected tab changes
    effect(() => {
      const tab = this.selectTab();
      const manager = this.contentManager();
      if (!tab || !manager) return;

      if (this.tabsCached) {
        this.resetTabs();
        this.tabsCached = false;
        return;
      }

      manager.loadTabContent(tab);
    });
  }

  // ================================
  // Lifecycle Hooks
  // ================================
  ngOnInit(): void {
    this.resize$
      .pipe(
        auditTime(150),
        filter(() => {
          const tab = this.selectTab();
          return !!tab?.config?.subTab?.length && tab.config.subTab.length > 1;
        }),
        tap(() => {
          const tab = this.selectTab();
          const index = tab.selectedSubTab;
          const last = (tab.config.subTab?.length ?? 1) - 1;

          tab.selectedSubTab = index < last ? index + 1 : index - 1;
          requestAnimationFrame(() => (tab.selectedSubTab = index));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    // Subscribe to new tab creation
    this.store
      .select(selectorNewTab)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tabData) => this.createOrSelectTab(tabData));

    // Control sub-tab visibility based on content context
    this.store
      .select(selectContent)
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) =>
        this.hiddenSubTab.set(content.context === 'subMenu')
      );
  }

  ngAfterViewChecked(): void {
    const currentId = this.selectTab().id;
    if (this.prvTabId === currentId) return;

    this.prvTabId = currentId;
    const target = document.getElementById(currentId);
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  ngOnDestroy(): void {
    this.tabs.forEach((tab) => this.destroyTabResources(tab));
    this.destroy$.next();
    this.destroy$.complete();
    this.resize$.complete();
  }

  // ================================
  // Public Methods
  // ================================
  onClickTab(tab: DynamicTab): void {
    if (this.selectTab() === tab) {
      this.contentManager()?.loadTabContent(tab);
      return;
    }
    this.selectTab.set(tab);
  }

  onSubTabChange(index?: string | number): void {
    if (index) return;

    this.selectTab.update((tab) =>
      tab ? { ...tab, selectedSubTab: Number(index) } : tab!
    );
  }

  createOrSelectTab(tabData: TabData): void {
    const { id, title, icon, component, closeable } = tabData;

    if (id && this.tabs.has(id)) {
      this.selectTab.set(this.tabs.get(id)!);
      return;
    }

    const uuid = uuidV4();
    const config = TabComponentRegistry[component];
    const newTab: DynamicTab = {
      id: id || uuid,
      title,
      icon,
      config,
      closeable,
      cachedComponent: new Map(),
      selectedSubTab: 0,
      sharedSignal: config.sharedSignal ? signal(null) : undefined,
    };

    this.tabs.set(newTab.id, newTab);
    this.selectTab.set(newTab);
  }

  closeTab(id: string): void {
    const tab = this.tabs.get(id);
    if (!tab || !tab.closeable) return;

    if (this.selectTab()?.id === id) {
      const fallback = this.getFallbackTab(id);
      if (fallback) this.selectTab.set(fallback);
    }

    this.destroyTabResources(tab);
    this.tabs.delete(id);
  }

  @HostListener('window:resize')
  onWindowResized(): void {
    this.resize$.next();
  }

  // ================================
  // Private Helpers
  // ================================
  private getFallbackTab(closedTabId: string): DynamicTab | null {
    const tabsArray = Array.from(this.tabs.values());
    const index = tabsArray.findIndex((t) => t.id === closedTabId);
    if (index === -1) return null;
    return tabsArray[index - 1] ?? tabsArray[0] ?? null;
  }

  private destroyTabResources(tab: DynamicTab): void {
    tab.cachedComponent?.forEach((comp) => {
      try {
        comp.destroy();
      } catch {
        //
      }
    });
    tab.cachedComponent?.clear();
  }

  private resetTabs(): void {
    this.tabs.clear();
    this.tabs.set(DEFAULT_MAIN_TAB_ID, {
      id: DEFAULT_MAIN_TAB_ID,
      title: 'صفحه اصلی',
      icon: 'pi pi-home',
      config: TabComponentRegistry[TabComponentKey.Main],
      closeable: false,
      selectedSubTab: 0,
      cachedComponent: new Map(),
    });
    this.selectTab.set(this.tabs.get(DEFAULT_MAIN_TAB_ID)!);
  }

  mouseLeaveOnTabHover(tabId: string) {
    if (this.hoverTabId() === tabId) {
      this.hoverTabId.set('');
    }
  }
}
