import { Component } from '@angular/core';
import { AppTitles } from 'app/constants/Titles';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  readonly websiteTitle = AppTitles.appBrokenTitle;
}
