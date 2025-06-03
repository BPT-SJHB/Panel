import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-type-input',
  standalone: true,
  imports: [ReactiveFormsModule, SelectModule, InputGroup, InputGroupAddon, NgClass],
  templateUrl: './user-type-input.component.html',
  styleUrl: './user-type-input.component.scss'
})
export class UserTypeInputComponent {
  @Input() readOnly = false;
  @Input() placeholder = "نوع کاربر";
  @Input() disabled = false;
  @Input() userType:{label:string,value:number}[] = [];

  private _control = new FormControl(null);
  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl(null);
  }

  get control(): FormControl {
    return this._control;
  }

  compareFn(o1: any, o2: any): boolean {
    return o1 === o2;
  }
}
