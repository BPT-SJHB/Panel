import {
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TabView } from 'app/constants/tab-component-registry';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss',
})
export class TabViewComponent implements AfterViewInit {
  @Input() views: TabView[] = [];
  @ViewChild('singleContainer', { read: ViewContainerRef })
  singleContainer?: ViewContainerRef;
  @ViewChild('tabContainer', { read: ViewContainerRef })
  tabContainer?: ViewContainerRef;

  private componentCache = new Map<number, ComponentRef<any>>();

  activeIndex = 0;
  componentRef?: ComponentRef<any>;

  ngAfterViewInit(): void {
    if (this.views.length === 1 && this.singleContainer) {
      this.singleContainer.createComponent(this.views[0].component);
    } else {
      this.loadComponent(this.activeIndex);
    }
  }

  onTabChange(index: number | string) {
    if (typeof index == 'string') return;
    this.loadComponent(index);
  }

  private loadComponent(index: number) {
    if (!this.tabContainer || !this.views[index]) return;
    if (this.tabContainer.length > 0) this.tabContainer.detach(0);

    const cached = this.componentCache.get(index);

    if (cached) {
      this.tabContainer.insert(cached.hostView);
      return;
    }

    const view = this.views[index];
    const compRef = this.tabContainer.createComponent(view.component);

    if (view.data) {
      Object.assign(compRef.instance, view.data);
    }
    this.tabContainer.insert(compRef.hostView);
    this.componentCache.set(index, compRef);
  }
}
