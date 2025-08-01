import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { Card } from 'primeng/card';
import { WebProcess } from 'app/data/model/web-process.model';
import { Store } from '@ngrx/store';
import { delay, from, Subscription } from 'rxjs';
import { selectWebProcessesGroups } from 'app/store/sidebar/sidebar.selectors';
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { createTab } from 'app/store/tab/tab.actions';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-main-tab',
  imports: [CarouselComponent, Card, SkeletonModule],
  templateUrl: './main-view.component.html',
  standalone: true,
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements AfterViewInit, OnDestroy {
  private store = inject(Store);
  private sub?: Subscription;

  images = signal<{ title: string; imgLink: string }[]>([]);
  processes = signal<WebProcess[]>([]);

  ngAfterViewInit(): void {
    this.setImages();
    this.sub = this.store
      .select(selectWebProcessesGroups)
      .pipe(delay(3000))
      .subscribe((processes) => {
        this.processes.set(processes.slice(0, 15));
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  OpenProcess(process: WebProcess) {
    const componentToLoad: TabComponentKey = Object.values(
      TabComponentKey
    ).includes(process.id)
      ? (process.id as TabComponentKey)
      : TabComponentKey.Main;

    if (componentToLoad === TabComponentKey.Main) {
      return;
    }

    const tabPayload = {
      title: process.title,
      icon: process.icon,
      closeable: true,
      component: componentToLoad,
    };

    this.store.dispatch(createTab(tabPayload));
  }

  get skeletonArray() {
    return Array.from({ length: 15 }, (_, i) => i);
  }

  setImages() {
    const imageArray = [
      {
        title: 'one',
        imgLink: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
      },
      {
        title: 'two',
        imgLink: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
      },
      {
        title: 'three',
        imgLink: 'https://api.slingacademy.com/public/sample-photos/3.jpeg',
      },
      {
        title: 'four',
        imgLink: 'https://api.slingacademy.com/public/sample-photos/4.jpeg',
      },
      {
        title: 'five',
        imgLink: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
      },
    ];

    from([imageArray])
      .pipe(delay(3000))
      .subscribe((images) => {
        this.images.set(images);
      });
  }
}
