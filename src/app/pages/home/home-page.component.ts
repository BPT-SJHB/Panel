import { Component, OnInit } from '@angular/core';
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';
import { ButtonModule } from 'primeng/button';
import { SearchInputComponent } from '../../components/shared/inputs/search-input/search-input.component';

import { PanelModule } from 'primeng/panel';
import { appTitles } from 'app/constants/Titles';
import { LoadAnnouncementPlacesService } from 'app/services/LoadAnnouncementPlaces/load-announcement-places.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    AnimateOnScroll,
    TerminalCardComponent,
    SearchInputComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  allLoadAnnouncementPlaces: LoadAnnouncementPlace[] = [];
  displayedLoadAnnouncementPlaces: LoadAnnouncementPlace[] = [];

  currentSearchTerm: string = '';
  headerTitle: string = appTitles.appOnLineTitle;

  constructor(private lap: LoadAnnouncementPlacesService) {}

  async ngOnInit(): Promise<void> {
    await this.initializeLoadAnnouncementPlaces();
  }

  async initializeLoadAnnouncementPlaces() {
    const terminals = await this.lap.getLoadAnnouncementPlaces();
    this.allLoadAnnouncementPlaces = terminals.data!;
    this.displayedLoadAnnouncementPlaces = this.allLoadAnnouncementPlaces;
  }

  filterAnnouncementPlaces = (
    announcementPlace: LoadAnnouncementPlace,
    query: string
  ) =>
    announcementPlace.LAPTitle.includes(query) ||
    announcementPlace.Description.includes(query);

  handleSearch(result: LoadAnnouncementPlace[]): void {
    this.displayedLoadAnnouncementPlaces = result;
  }
}
