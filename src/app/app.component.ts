import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {ToastModule} from "primeng/toast"
import { LoadingComponent } from './components/shared/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
