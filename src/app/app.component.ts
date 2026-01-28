import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ThemeManagementComponent } from './components/shared/layout/header/theme-management/theme-management.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ConfirmDialogModule,
    ToastModule,
    LoadingComponent,
    ThemeManagementComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly montionToastConfig = signal({
    type: 'animation' as const,
    disabled: false,
    appear: true,
    enter: true,
    leave: true,
    duration: 1000,
    autoHeight: true,
    autoWidth: true,
  });
}
