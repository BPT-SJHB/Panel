import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-background',
  imports: [NgStyle],
  templateUrl: './full-screen-background.component.html',
  styleUrl: './full-screen-background.component.scss',
})
export class FullScreenBackgroundComponent {
  @Input() lgImageUrl: string = 'login_form_lg_background.webp';
  @Input() lgBackgroundSize: string = 'cover';
  @Input() lgBackgroundPosition: string = 'right';
  @Input() imageUrl: string = 'login_form_background.webp';
  @Input() backgroundSize: string = 'cover';
  @Input() backgroundPosition: string = 'left';
  @Input() blur: number = 0;
}
