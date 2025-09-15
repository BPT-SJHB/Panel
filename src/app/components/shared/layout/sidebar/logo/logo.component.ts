import { Component } from '@angular/core';
import { AppTitles } from 'app/constants/Titles';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-logo',
  imports: [NgOptimizedImage],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  readonly websiteTitle = AppTitles.appBrokenTitle;
}
