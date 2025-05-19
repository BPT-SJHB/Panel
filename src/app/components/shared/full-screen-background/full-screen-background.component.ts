import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-background',
  imports: [NgStyle],
  templateUrl: './full-screen-background.component.html',
  styleUrl: './full-screen-background.component.scss'
})
export class FullScreenBackgroundComponent {
  @Input() imageUrl: string = 'background_form_login.webp';
  @Input() backgroundSize:string = "cover";
  @Input() backgroundPosition :string = "center";
  @Input() blur: number = 0;
}
