import { Component, OnInit } from '@angular/core';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { CargoTerminal } from 'app/data/model/cargo-terminal.model';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';
import { ButtonModule } from 'primeng/button';
import { SearchInputComponent } from '../../components/shared/inputs/search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { appTitles } from 'app/constants/Titles';

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
  allCargoTerminals: CargoTerminal[] = [];
  displayedCargoTerminals: CargoTerminal[] = [];
  currentSearchTerm: string = '';
  headerTitle: string = appTitles.appOnLineTitle;

  ngOnInit(): void {
    this.initializeCargoTerminals();
  }

  async initializeCargoTerminals() {
    this.allCargoTerminals = mockCargoTerminals;
    this.displayedCargoTerminals = [...this.allCargoTerminals];
  }

  handleSearch(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    const trimmedSearchTerm = searchTerm.trim();
    const minSearchLength = 2;

    if (trimmedSearchTerm.length >= minSearchLength) {
      this.displayedCargoTerminals = this.allCargoTerminals.filter(
        (terminal) =>
          terminal.name
            .toLowerCase()
            .includes(trimmedSearchTerm.toLowerCase()) ||
          terminal.description
            .toLowerCase()
            .includes(trimmedSearchTerm.toLowerCase())
      );
    } else {
      this.displayedCargoTerminals = [...this.allCargoTerminals];
    }
  }

  handleClear(): void {
    this.currentSearchTerm = '';
    this.displayedCargoTerminals = [...this.allCargoTerminals];
  }
}
