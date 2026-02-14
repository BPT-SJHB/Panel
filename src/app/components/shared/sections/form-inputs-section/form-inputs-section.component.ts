import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common'; // <-- MUST IMPORT THIS
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-inputs-section',
  imports: [CardModule, NgTemplateOutlet],
  templateUrl: './form-inputs-section.component.html',
  styleUrl: './form-inputs-section.component.scss',
})
export class FormInputsSectionComponent {
  readonly flexDir = input<'flex-row' | 'flex-col'>('flex-col');
  readonly isCard = input<boolean>(true);
}
