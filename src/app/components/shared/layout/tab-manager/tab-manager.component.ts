// Angular core
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

// PrimeNG
import { TabsModule } from 'primeng/tabs';

// NgRx store
import { Store } from '@ngrx/store';
import { renderContent } from 'app/store/content-manager/content-manager.actions';
import { selectorNewTab } from 'app/store/tab/tab.selectors';
import { selectContent } from 'app/store/content-manager/content-manager.selectors';

// Constants & models
import {
  TabComponentKey,
  TabComponentRegistry,
} from 'app/constants/tab-component-registry';
import { DynamicTab } from 'app/data/model/tabs.model';

// Child component
import { DashboardContentManagerComponent } from '../dashboard-content-manager/dashboard-content-manager.component';
import { Subscription } from 'rxjs';
import { uuidV4 } from 'app/utils/uuid';
import { DEFAULT_MAIN_TAB_ID, TabData } from 'app/store/tab/tab.reducer';

@Component({
  selector: 'app-tab-manager',
  standalone: true,
  templateUrl: './tab-manager.component.html',
  styleUrl: './tab-manager.component.scss',
  imports: [NgClass, TabsModule],
})
export class TabManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  /** ================================
   *  Signals and State
   *  ================================ */

  // Holds reference to content manager
  contentManager = signal<DashboardContentManagerComponent | null>(null);

  // Controls visibility of sub-tabs
  readonly hiddenSubTab = signal<boolean>(false);

  // Tabs map: <id, DynamicTab>
  tabs = new Map<string, DynamicTab>([
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

  // Currently selected tab
  selectTab = signal<DynamicTab>(this.tabs.get(DEFAULT_MAIN_TAB_ID)!);

  // NgRx store instance
  private store = inject(Store);

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor() {
    // Auto-dispatch when selected tab changes
    effect(() => {
      const tab = this.selectTab();
      if (tab) this.dispatchChangeTab(tab);
    });

    // Auto-load content on tab change
    effect(() => {
      const tab = this.selectTab();
      const manager = this.contentManager();
      if (manager && tab) {
        manager.loadTabContent(tab);
      }
    });
  }

  /** ================================
   *  Lifecycle Hooks
   *  ================================ */

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Subscribe to new tab creation
    const sub1 = this.store
      .select(selectorNewTab)
      .subscribe(({ id, title, icon, component, closeable }) => {
        this.createTab({ id, title, icon, component, closeable });
      });

    // Subscribe to content changes
    const sub2 = this.store.select(selectContent).subscribe((content) => {
      this.hiddenSubTab.set(content.context === 'subMenu');
    });

    this.subscriptions.push(sub1, sub2);
  }

  ngOnDestroy(): void {
    // Destroy all cached component views
    for (const tab of this.tabs.values()) {
      tab.cachedComponent.forEach((comp) => comp.destroy());
      tab.cachedComponent.clear();
    }

    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /** ================================
   *  Public Methods
   *  ================================ */

  // Handle main tab click
  onClickTab(tab: DynamicTab): void {
    if (this.selectTab() === tab) {
      this.store.dispatch(
        renderContent({
          title: tab.title,
          icon: tab.icon,
          context: 'tabContent',
        })
      );
    }
    this.selectTab.set(tab);
  }

  // Handle sub-tab change
  onSubTabChange(index: string | number): void {
    this.selectTab.update((tab) => ({
      ...tab!,
      selectedSubTab: Number(index),
    }));
  }

  createTab(tabData: TabData): void {
    const { id, title, icon, component, closeable } = tabData;

    // If an ID is provided, check if the tab already exists
    if (id && this.tabs.has(id)) {
      // Switch to the existing tab
      this.selectTab.set(this.tabs.get(id)!);
      return;
    }

    // If no ID or the tab does not exist, create a new tab
    const uuid = uuidV4();
    const config = TabComponentRegistry[component];

    const tab: DynamicTab = {
      id: id || uuid, // Use the provided ID or generate a new one
      title,
      icon,
      config,
      closeable,
      cachedComponent: new Map(),
      selectedSubTab: 0,
      sharedSignal: config.shearedSignal ? signal(null) : undefined,
    };

    this.tabs.set(tab.id, tab);
    this.selectTab.set(tab);
  }

  // Close a tab by its ID
  closeTab(id: string): void {
    const tab = this.tabs.get(id);
    if (!tab || !tab.closeable) return;

    // If the closed tab is selected, switch to previous
    if (this.selectTab()?.id === id) {
      const tabsArray = Array.from(this.tabs.values());
      const index = tabsArray.findIndex((t) => t.id === id);
      const fallback = tabsArray[index - 1] ?? tabsArray[0] ?? null;
      this.selectTab.set(fallback);
    }

    // Destroy cached component views
    tab.cachedComponent.forEach((comp) => comp.destroy());
    this.tabs.delete(id);
  }

  /** ================================
   *  Private Helpers
   *  ================================ */

  // Load content for selected tab
  private dispatchChangeTab(tab: DynamicTab): void {
    this.contentManager()?.loadTabContent(tab);
  }
}
