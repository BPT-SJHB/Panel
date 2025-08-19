import { Component } from '@angular/core';
import { AppTitles } from 'app/constants/Titles';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerTitles = AppTitles.footerTitle;
}
