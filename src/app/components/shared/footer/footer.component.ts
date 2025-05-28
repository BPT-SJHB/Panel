import { Component } from '@angular/core';
import { appTitles } from 'app/constants/Titles';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerTitle: string = appTitles.footerTitle;
  constructor() {}
}
