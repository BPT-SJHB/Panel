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
        imgSrc:
          'https://esfahan.rmto.ir/data/41/sis_advService/517/1753605065481cdcjntc48h2vk6afmhoqpa0l8m.jpg',
        imgLink:
          'https://esfahan.rmto.ir/fa/sis_advService/196040-%DA%86%D8%B4%D9%85-%D8%A8%D9%87-%D8%B1%D8%A7%D9%87%DB%8C%D9%85-%D8%A7%D8%B1%D8%A8%D8%B9%DB%8C%D9%86-1404.html',
      },
      {
        title: 'two',
        imgSrc:
          'https://esfahan.rmto.ir/data/41/sis_advService/963/1718085378243c7f77qd6eccqon0osos1b3b0lg.jpg',
        imgLink:
          'https://esfahan.rmto.ir/fa/sis_advService/2181438-%DA%A9%D8%B3%D8%A8-%D8%B1%D8%AA%D8%A8%D9%87-%D8%A8%D8%B1%D8%AA%D8%B1-%D8%A7%D8%AF%D8%A7%D8%B1%D9%87-%DA%A9%D9%84-%D8%B1%D8%A7%D9%87%D8%AF%D8%A7%D8%B1%DB%8C-%D8%AD%D9%85%D9%84-%D9%86%D9%82%D9%84-%D8%AC%D8%A7%D8%AF%D9%87-%D8%A7%DB%8C-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86.html',
      },
      {
        title: 'three',
        imgSrc:
          'https://esfahan.rmto.ir/data/41/sis_advService/907/1734443397250g8qu2ai1br6ttc4mdnm5igel6f.jpg',
        imgLink:
          'https://esfahan.rmto.ir/fa/sis_advService/2023857-%D8%AC%D8%B4%D9%86%D9%88%D8%A7%D8%B1%D9%87-%D8%B4%D9%87%DB%8C%D8%AF-%D8%B1%D8%AC%D8%A7%D8%A6%DB%8C.html',
      },
      {
        title: 'four',
        imgSrc:
          'https://img9.irna.ir/d/r2/2025/03/08/3/171731742.jpg?ts=1741437565342',
        imgLink:
          'https://www.irna.ir/news/85772544/%D8%B4%DB%8C%D8%B4-%D8%AF%D9%88%D9%86%DA%AF-%D8%A8%D8%B1%D8%A7%D9%86%DB%8C%D9%85-%D9%BE%D9%88%DB%8C%D8%B4%DB%8C-%D8%A8%D8%A7-%D9%87%D8%AF%D9%81-%DA%A9%D8%A7%D9%87%D8%B4-%DB%B3%DB%B0-%D8%AF%D8%B1%D8%B5%D8%AF%DB%8C-%D8%AA%D9%84%D9%81%D8%A7%D8%AA-%D8%AC%D8%A7%D8%AF%D9%87-%D8%A7%DB%8C',
      },
      {
        title: 'five',
        imgSrc:
          'https://rmto.ir/data/0/sis_advService/1115/17537618294643ootbdl4sf70t8pecs7a0ed1v6.jpg',
        imgLink:
          'https://rmto.ir/fa/sis_advService/2996737-%DA%86%D8%B4%D9%85-%D8%A8%D8%B1%D8%A7%D9%87%DB%8C%D9%851.html',
      },
    ];

    from([imageArray])
      .pipe(delay(3000))
      .subscribe((images) => {
        this.images.set(images);
      });
  }
}
