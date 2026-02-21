import { AfterViewInit, Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-form-buttons-section',
  imports: [],
  templateUrl: './form-buttons-section.component.html',
  styleUrl: './form-buttons-section.component.scss',
})
export class FormButtonsSectionComponent implements AfterViewInit {
  readonly classValue = signal('flex justify-center mt-10');
  readonly customClass = input<string>('');

  ngAfterViewInit(): void {
    this.classValue.set(this.classValue() + ' ' + this.customClass());
  }
}
