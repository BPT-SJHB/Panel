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
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { createTab } from 'app/store/tab/tab.actions';
import { SkeletonModule } from 'primeng/skeleton';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { BackColor, ForeColor } from 'app/constants/ui/color.ui';
import { CarouselManagementService } from 'app/services/carousel-management/carousel-management.service';
import { detectImageMime } from 'app/utils/image.utils';

@Component({
  selector: 'app-main-tab',
  imports: [CarouselComponent, Card, SkeletonModule],
  templateUrl: './main-view.component.html',
  standalone: true,
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent
  extends BaseLoading
  implements AfterViewInit, OnDestroy
{
  private readonly store = inject(Store);
  private readonly processService = inject(ApiProcessesService);
  private readonly carouselService = inject(CarouselManagementService);

  images = signal<{ title: string; src: string }[]>([]);
  processes = signal<WebProcess[]>([]);

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadProcesses();
  }

  ngAfterViewInit(): void {
    this.setImages();
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

  private async loadProcesses() {
    const response = await this.processService.getUsefulWebProcesses();
    if (!checkAndToastError(response, this.toast)) return;
    const process = response.data.flatMap((pg) =>
      pg.processes.map((p) => ({ ...p }))
    );

    this.processes.set(process);
  }

  get skeletonArray() {
    return Array.from({ length: 15 }, (_, i) => i);
  }

  async setImages() {
    const response = await this.carouselService.GetCarouselsForView();
    if (!checkAndToastError(response, this.toast)) return;

    const images: { title: string; src: string }[] = response.data.map((i) => {
      let src = i.URL;

      if (i.Picture) {
        src = `data:${detectImageMime(i.Picture)};base64,${i.Picture}`;
      }

      return {
        title: String(i.CId),
        src: src,
      };
    });
    this.images.set(images);
  }

  getColor(web: WebProcess): string {
    const back = BackColor.get(web.backColor.toLowerCase()) ?? '';
    const fore = ForeColor.get(web.foreColor.toLowerCase()) ?? '';
    return `${back} ${fore}`.trim();
  }
}
