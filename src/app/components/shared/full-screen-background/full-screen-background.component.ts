import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-background',
  imports: [NgStyle],
  templateUrl: './full-screen-background.component.html',
  styleUrl: './full-screen-background.component.scss',
})
export class FullScreenBackgroundComponent {
  @Input() lgImageUrl = 'login_form_lg_background.webp';
  @Input() lgBackgroundSize = 'cover';
  @Input() lgBackgroundPosition = 'right';
  @Input() imageUrl = 'login_form_background.webp';
  @Input() backgroundSize = 'cover';
  @Input() backgroundPosition = 'left';
  @Input() blur = 0;
}
