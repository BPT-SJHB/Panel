// Angular core
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
  signal,
  Signal,
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
      '4b8ef55e-3cf3-41e2-ab9b-65b6bfc8e60b',
      {
        id: '4b8ef55e-3cf3-41e2-ab9b-65b6bfc8e60b',
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
  selectTab = signal<DynamicTab>(
    this.tabs.get('4b8ef55e-3cf3-41e2-ab9b-65b6bfc8e60b')!
  );

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
    const sub1 = this.store.select(selectorNewTab).subscribe(({ title, icon, component, closeable }) => {
      this.createTab({ title, icon, component, closeable });
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
    this.selectTab.set(tab);
    this.store.dispatch(
      renderContent({
        title: tab.title,
        icon: tab.icon,
        context: 'tabContent',
      })
    );
  }

  // Handle sub-tab change
  onSubTabChange(index: string | number): void {
    this.selectTab.update((tab) => ({
      ...tab!,
      selectedSubTab: Number(index),
    }));
  }

  // Create a new tab dynamically
  createTab(tabData: {
    title: string;
    icon: string;
    component: TabComponentKey;
    closeable: boolean;
  }): void {
    const { title, icon, component, closeable } = tabData;
    if (component === TabComponentKey.Main) return;

    const uuid = this.uuidV4();
    const config = TabComponentRegistry[component];

    const tab: DynamicTab = {
      id: uuid,
      title,
      icon,
      config,
      closeable,
      cachedComponent: new Map(),
      selectedSubTab: 0,
      sharedSignal: config.shearedSignal ? signal(null) : undefined,
    };

    this.tabs.set(uuid, tab);
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

  // UUID generator for tab IDs
  private uuidV4(): string {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (
        +c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  // Load content for selected tab
  private dispatchChangeTab(tab: DynamicTab): void {
    this.contentManager()?.loadTabContent(tab);
  }
}
