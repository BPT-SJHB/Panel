import { Component, OnInit } from '@angular/core';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';
import { ButtonModule } from 'primeng/button';
import { SearchInputComponent } from '../../components/shared/inputs/search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { appTitles } from 'app/constants/Titles';
import { LoadAnnouncementPlacesService } from 'app/services/LoadAnnouncementPlaces/load-announcement-places.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    AnimateOnScroll,
    TerminalCardComponent,
    SearchInputComponent,
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

  handleSearch(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    const trimmedSearchTerm = searchTerm.trim();
    const minSearchLength = 2;

    if (trimmedSearchTerm.length >= minSearchLength) {
      this.displayedLoadAnnouncementPlaces = this.allLoadAnnouncementPlaces.filter(
        (terminal) =>
          terminal.LAPTitle.toLowerCase().includes(
            trimmedSearchTerm.toLowerCase()
          ) ||
          terminal.Description.toLowerCase().includes(
            trimmedSearchTerm.toLowerCase()
          )
      );
    } else {
      this.displayedLoadAnnouncementPlaces = [...this.allLoadAnnouncementPlaces];
    }
  }

  handleClear(): void {
    this.currentSearchTerm = '';
    this.displayedLoadAnnouncementPlaces = [...this.allLoadAnnouncementPlaces];
  }
}
