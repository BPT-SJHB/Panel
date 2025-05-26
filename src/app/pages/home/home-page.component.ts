import { Component, OnInit } from '@angular/core';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { CargoTerminal } from 'app/data/model/cargo-terminal.model';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { TerminalCardComponent } from 'app/components/shared/terminal-card/terminal-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AnimateOnScroll, TerminalCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  cargoTerminals: CargoTerminal[] = [];

  ngOnInit(): void {
    this.initializeCargoTerminals();
  }

  async initializeCargoTerminals() {
    // اینجا داده‌ها از API گرفته می‌شود، فعلاً از داده‌های موک استفاده شده
    this.cargoTerminals = mockCargoTerminals;
  }
}
