import { Routes } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    loadComponent: () =>
      import('app/pages/home/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: APP_ROUTES.AUTH.LOGIN,
    loadComponent: () =>
      import('app/pages/auth/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: APP_ROUTES.AUTH.FORGET_PASSWORD,
    loadComponent: () =>
      import(
        'app/pages/auth/forget-password-page/forget-password-page.component'
      ).then((m) => m.ForgetPasswordPageComponent),
  },
  {
    path: APP_ROUTES.DASHBOARD.HOME,
    loadComponent: () =>
      import('app/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
