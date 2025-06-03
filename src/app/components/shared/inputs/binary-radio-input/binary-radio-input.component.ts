import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule} from "primeng/radiobutton"


@Component({
  selector: 'app-binary-radio-input',
  imports: [FormsModule,RadioButtonModule,NgClass,ReactiveFormsModule],
  templateUrl: './binary-radio-input.component.html',
  styleUrl: './binary-radio-input.component.scss'
})
export class SmsActiveInputComponent {
  private _control:FormControl = new FormControl(true);
  @Input() readonly:boolean = false;
  @Input() radioName:string = "radio-option";
  @Input() label:string = ""  


  preventIfReadonly(event: Event): void {
    if (this.readonly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @Input()
  set control(value: FormControl) {  
         this._control = value || new FormControl(true);
  }

  get control(): FormControl {
    return this._control;
  }
}
