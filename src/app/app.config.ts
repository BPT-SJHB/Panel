import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { customTheme } from './themes/theme';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { sidebarReducer } from './store/sidebar/sidebar.reducer';
import { contentManagerReducer } from './store/content-manager/content-manager.reducer';
import { tabReducer } from './store/tab/tab.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: customTheme }),
    importProvidersFrom(ToastModule),
    provideStore({
      sidebar: sidebarReducer,
      content: contentManagerReducer,
      // tabs: tabReducer,
      tab: tabReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MessageService,
    CookieService,
  ],
};
