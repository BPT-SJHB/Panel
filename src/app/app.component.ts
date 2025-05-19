import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StyleClassModule } from "primeng/styleclass";
import { Card } from "primeng/card";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from "primeng/checkbox"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Card, StyleClassModule,InputGroupModule,InputGroupAddonModule,PasswordModule,CommonModule, ButtonModule,Checkbox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
