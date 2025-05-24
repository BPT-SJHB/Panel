import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { customTheme } from './themes/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: customTheme }),
    importProvidersFrom(ToastModule),
    MessageService,
    CookieService
  ]
};
