// Angular
import { Component, inject, signal } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

// Components
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import {
  MapSvgComponent,
  ProvinceCode,
  ProvinceName,
} from './map-svg/map-svg.component';

// NGX Components
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { NgxFadeComponent } from '@omnedia/ngx-fade';
import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';
import { NgxVortexComponent } from '@omnedia/ngx-vortex';
import { NgxShinyTextComponent } from '@omnedia/ngx-shiny-text';

// Models & Constants
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';

// Services
import { LoadAnnouncementPlacesService } from 'app/services/LoadAnnouncementPlaces/load-announcement-places.service';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { AppTitles } from 'app/constants/Titles';
import { TableModule } from 'primeng/table';
import { MapComponent } from './map/map.component';
import { FooterComponent } from 'app/components/shared/layout/footer/footer.component';

type Direction = 'left' | 'right' | 'down' | 'up' | undefined;

interface CountItem {
  count: number;
  text: string;
  duration: number;
  direction: Direction;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    TerminalCardComponent,
    SearchInputComponent,
    MapSvgComponent,
    DialogModule,
    TableModule,
    NgxNumberTickerComponent,
    NgxFadeComponent,
    NgxStarrySkyComponent,
    NgxVortexComponent,
    MapComponent,
    FooterComponent,
    NgxShinyTextComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent extends BaseLoading {
  private readonly lap = inject(LoadAnnouncementPlacesService);

  readonly headerTitle = AppTitles.appBrokenTitle;
  readonly dialogTitle = signal('');
  readonly currentProvince = signal<ProvinceCode>('IR-00');
  readonly displayedLoadAnnouncementPlaces = signal<LoadAnnouncementPlace[]>(
    []
  );

  readonly provincesAnnouncement = signal(
    new Map<ProvinceCode, LoadAnnouncementPlace[]>()
  );

  readonly UnknownProvince: ProvinceCode = 'IR-00';
  readonly EsfahanProvince: ProvinceCode = 'IR-04';
  readonly appTitle = AppTitles;
  screenHeight = signal(0);

  isDialogVisible = false;
  marqueeList = [
    { name: '', imgLink: '/assets/HomePage/1-1.png' },
    { name: '', imgLink: '/assets/HomePage/2-1.png' },
    { name: '', imgLink: '/assets/HomePage/3-1.png' },
    { name: '', imgLink: '/assets/HomePage/4.png' },
    { name: '', imgLink: '/assets/HomePage/5-1.png' },
  ];

  countList: CountItem[] = [
    {
      count: 1,
      text: 'تعداد مرکز اعلام بار فعال',
      duration: 1000,
      direction: 'right',
    },
    {
      count: 20000,
      text: 'تعداد راننده فعال',
      duration: 7000,
      direction: 'up',
    },
    {
      count: 1000,
      text: 'تعداد بارهای اعلام شده',
      duration: 7000,
      direction: 'left',
    },
  ];

  linksList = [
    {
      linkName: 'پایگاه اطلاع رسانی دفتر مقام معظم رهبری',
      linkAddress:
        'https://rmto.ir/fa/weblink/404174-%D9%BE%D8%A7%DB%8C%DA%AF%D8%A7%D9%87-%D8%A7%D8%B7%D9%84%D8%A7%D8%B9-%D8%B1%D8%B3%D8%A7%D9%86%DB%8C-%D8%AF%D9%81%D8%AA%D8%B1-%D9%85%D9%82%D8%A7%D9%85-%D9%85%D8%B9%D8%B8%D9%85-%D8%B1%D9%87%D8%A8%D8%B1%DB%8C.html',
    },
    {
      linkName: 'پایگاه اطلاع رسانی دولت',
      linkAddress:
        'https://rmto.ir/fa/weblink/404168-%D9%BE%D8%A7%DB%8C%DA%AF%D8%A7%D9%87-%D8%A7%D8%B7%D9%84%D8%A7%D8%B9-%D8%B1%D8%B3%D8%A7%D9%86%DB%8C-%D8%AF%D9%88%D9%84%D8%AA.html',
    },
    {
      linkName: 'وزارت راه و شهرسازی ',
      linkAddress:
        'https://rmto.ir/fa/weblink/180610-%D9%88%D8%B2%D8%A7%D8%B1%D8%AA-%D8%B1%D8%A7%D9%87-%D8%B4%D9%87%D8%B1%D8%B3%D8%A7%D8%B2%DB%8C.html',
    },
    {
      linkName: 'سایر وزارتخانه ها',
      linkAddress:
        'https://rmto.ir/fa/weblink/404170-%D8%B3%D8%A7%DB%8C%D8%B1-%D9%88%D8%B2%D8%A7%D8%B1%D8%AA%D8%AE%D8%A7%D9%86%D9%87-%D9%87%D8%A7.html',
    },
    {
      linkName: 'درگاه ملی خدمات دولت هوشمند ',
      linkAddress:
        'https://rmto.ir/fa/weblink/180612-%D8%AF%D8%B1%DA%AF%D8%A7%D9%87-%D9%85%D9%84%DB%8C-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AF%D9%88%D9%84%D8%AA-%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF.html',
    },
    {
      linkName: 'پایگاه اطلاع رسانی ریاست جمهوری',
      linkAddress:
        'https://rmto.ir/fa/weblink/404169-%D9%BE%D8%A7%DB%8C%DA%AF%D8%A7%D9%87-%D8%A7%D8%B7%D9%84%D8%A7%D8%B9-%D8%B1%D8%B3%D8%A7%D9%86%DB%8C-%D8%B1%DB%8C%D8%A7%D8%B3%D8%AA-%D8%AC%D9%85%D9%87%D9%88%D8%B1%DB%8C.html',
    },

    {
      linkName: ' پایگاه خبری وزارت راه و شهرسازی',
      linkAddress:
        'https://rmto.ir/fa/weblink/404173-%D9%BE%D8%A7%DB%8C%DA%AF%D8%A7%D9%87-%D8%AE%D8%A8%D8%B1%DB%8C-%D9%88%D8%B2%D8%A7%D8%B1%D8%AA-%D8%B1%D8%A7%D9%87-%D8%B4%D9%87%D8%B1%D8%B3%D8%A7%D8%B2%DB%8C.html',
    },
    {
      linkName: 'ادارات کل راه و شهرسازی ',
      linkAddress:
        'https://rmto.ir/fa/weblink/404166-%D8%A7%D8%AF%D8%A7%D8%B1%D8%A7%D8%AA-%DA%A9%D9%84-%D8%B1%D8%A7%D9%87-%D8%B4%D9%87%D8%B1%D8%B3%D8%A7%D8%B2%DB%8C.html',
    },
    {
      linkName: 'حمل و نقل بین المللی',
      linkAddress:
        'https://rmto.ir/fa/weblink/404165-%D8%AD%D9%85%D9%84-%D9%86%D9%82%D9%84-%D8%A8%DB%8C%D9%86-%D8%A7%D9%84%D9%85%D9%84%D9%84%DB%8C.html',
    },
  ];

  wave1Colors: string[] = ['#10b981', '#065f46'];
  wave2Colors: string[] = ['#3f3f46', '#34d399'];

  /**
   * Search filter function
   */
  filterAnnouncementPlaces = (
    announcementPlace: LoadAnnouncementPlace,
    query: string
  ): boolean =>
    announcementPlace.LAPTitle.includes(query) ||
    announcementPlace.Description.includes(query);

  /**
   * Handle result from search input
   */
  handleSearch(results: LoadAnnouncementPlace[]): void {
    this.displayedLoadAnnouncementPlaces.set(results);
  }

  /**
   * Handle province click from map
   */
  async clickProvince(event: {
    provinceName: ProvinceName;
    provinceCode: ProvinceCode;
  }) {
    const { provinceCode, provinceName } = event;

    await this.withLoading(() =>
      this.fetchLoadAnnouncementPlaces(provinceCode)
    );

    this.currentProvince.set(provinceCode);

    const provinceMap = this.provincesAnnouncement();
    this.displayedLoadAnnouncementPlaces.set([
      ...(provinceMap.get(provinceCode) ?? []),
    ]);

    this.dialogTitle.set('سامانه های اعلام بار استان ' + provinceName);
    this.isDialogVisible = true;
  }

  /**
   * Fetch data if not already cached
   */
  async fetchLoadAnnouncementPlaces(provinceCode: ProvinceCode): Promise<void> {
    if (provinceCode === this.UnknownProvince) return;

    const cached = this.provincesAnnouncement().get(provinceCode);
    if (cached?.length) return;

    if (provinceCode !== this.EsfahanProvince) return; // TODO: support all provinces

    const terminals = await this.lap.getLoadAnnouncementPlaces();
    const data = terminals.data ?? [];

    this.provincesAnnouncement.update((map) => {
      map.set(provinceCode, data);
      return map;
    });
  }
}
