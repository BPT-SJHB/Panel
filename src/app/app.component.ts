import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ToastModule} from "primeng/toast"
import { LoadingComponent } from './components/shared/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,ToastModule,LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
