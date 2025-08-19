// Angular
import { Component, computed, inject, signal } from '@angular/core';

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

// Models & Constants
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';

// Services
import { LoadAnnouncementPlacesService } from 'app/services/LoadAnnouncementPlaces/load-announcement-places.service';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { AppTitles } from 'app/constants/Titles';

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

  isDialogVisible = false;

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
