import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common'; // <-- MUST IMPORT THIS
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-form-inputs-section',
  imports: [CardModule, NgTemplateOutlet, PanelModule],
  templateUrl: './form-inputs-section.component.html',
  styleUrl: './form-inputs-section.component.scss',
})
export class FormInputsSectionComponent {
  readonly flexDir = input<'flex-row' | 'flex-col'>('flex-col');
  readonly isCard = input<boolean>(true);
  readonly header = input<string>('');
  readonly ptValue = {
    root: {
      class: 'bg-stone-100 dark:bg-zinc-800 shadow-md border-0 rounded-xl',
    },
    title: {
      class: 'w-full text-xl font-bold px-2 block',
    },
  };
}
