import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ToastModule} from "primeng/toast"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
