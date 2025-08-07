// Angular
import { Component, OnInit } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AnimateOnScroll } from 'primeng/animateonscroll';

// Components
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';
import { SearchInputComponent } from '../../components/shared/inputs/search-input/search-input.component';

// Models & Constants
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { appTitles } from 'app/constants/Titles';

// Services
import { LoadAnnouncementPlacesService } from 'app/services/LoadAnnouncementPlaces/load-announcement-places.service';
import { MapSvgComponent } from "./map-svg/map-svg.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    AnimateOnScroll,
    TerminalCardComponent,
    SearchInputComponent,
    MapSvgComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  // All announcement places fetched from API
  allLoadAnnouncementPlaces: LoadAnnouncementPlace[] = [];

  // Filtered announcement places for display
  displayedLoadAnnouncementPlaces: LoadAnnouncementPlace[] = [];

  // Search term (not directly used here but could be used in view binding)
  currentSearchTerm: string = '';

  // Header title for the page
  headerTitle: string = appTitles.appOnLineTitle;

  constructor(private lap: LoadAnnouncementPlacesService) {}

  // Lifecycle hook: initialize data on component load
  async ngOnInit(): Promise<void> {
    await this.initializeLoadAnnouncementPlaces();
  }

  /**
   * Fetch all terminal data and initialize state
   */
  async initializeLoadAnnouncementPlaces(): Promise<void> {
    const terminals = await this.lap.getLoadAnnouncementPlaces();
    this.allLoadAnnouncementPlaces = terminals.data ?? [];
    this.displayedLoadAnnouncementPlaces = [...this.allLoadAnnouncementPlaces];
  }

  /**
   * Filter function used by the search input
   */
  filterAnnouncementPlaces = (
    announcementPlace: LoadAnnouncementPlace,
    query: string
  ): boolean =>
    announcementPlace.LAPTitle.includes(query) ||
    announcementPlace.Description.includes(query);

  /**
   * Handler for search result from SearchInputComponent
   */
  handleSearch(result: LoadAnnouncementPlace[]): void {
    this.displayedLoadAnnouncementPlaces = result;
  }
}
