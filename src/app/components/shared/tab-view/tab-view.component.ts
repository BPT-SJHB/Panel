import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
  OnDestroy,
  WritableSignal,
  signal,
} from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { TabConfig } from 'app/constants/tab-component-registry';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [TabsModule],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss',
})
export class TabViewComponent implements AfterViewInit, OnDestroy {
  // Inputs
  @Input() tabConfig?: TabConfig;

  // View containers for dynamic components
  @ViewChild('singleContainer', { read: ViewContainerRef }) singleContainer?: ViewContainerRef;
  @ViewChild('tabContainer', { read: ViewContainerRef }) tabContainer?: ViewContainerRef;

  // Cache for instantiated components to prevent re-creation
  private componentCache = new Map<number, ComponentRef<any>>();

  // Optional shared signal memory (used between components)
  private sharedMemory = signal<any>(null);

  // Track active tab index
  activeIndex = 0;

  // Lifecycle hook: Called after view init
  ngAfterViewInit(): void {
    const views = this.tabConfig?.subTab || [];

    // Handle single-tab layout
    if (views.length === 1 && this.singleContainer) {
      const compRef = this.singleContainer.createComponent(views[0].component);
      this.componentCache.set(0, compRef);

      if (views[0].data) {
        Object.assign(compRef.instance, views[0].data);
      }
      return;
    }

    // Load default tab
    this.loadComponent(this.activeIndex);
  }

  // Handle tab change event
  onTabChange(index: number | string): void {
    if (typeof index === 'number') {
      this.loadComponent(index);
    }
  }

  // Load a tab component dynamically by index
  private loadComponent(index: number): void {
    if (!this.tabContainer || !this.tabConfig?.subTab[index]) return;

    // Clear previous content
    if (this.tabContainer.length > 0) {
      this.tabContainer.detach(0);
    }

    // Use cached component if available
    const cached = this.componentCache.get(index);
    if (cached) {
      this.tabContainer.insert(cached.hostView);
      (cached.instance as any).onViewActivated?.();
      return;
    }

    // Create new component instance
    const view = this.tabConfig.subTab[index];
    const compRef = this.tabContainer.createComponent(view.component);
    
    // Pass static data
    if (view.data) {
      Object.assign(compRef.instance, view.data);
    }

    // Provide shared signal if specified
    if (this.tabConfig.shearedSignal) {
      Object.assign(compRef.instance, { shearedSignal: this.sharedMemory });
    }
    
    // Insert component view and cache it
    (compRef.instance as any).onViewActivated?.();
    this.tabContainer.insert(compRef.hostView);
    this.componentCache.set(index, compRef);
  }

  // Cleanup on component destroy
  ngOnDestroy(): void {
    this.componentCache.forEach((comp) => comp.destroy());
    this.componentCache.clear();
  }
}
