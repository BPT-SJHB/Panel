import { Routes } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { dashboardGuard } from './guard/dashboard-guard/dashboard-guard.guard';
import { loginAuthGuard } from './guard/login-guard/login-guard.guard';

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
    data: { preload: true },
    canActivate: [loginAuthGuard],
  },
  {
    path: APP_ROUTES.AUTH.FORGET_PASSWORD,
    loadComponent: () =>
      import(
        'app/pages/auth/forget-password-page/forget-password-page.component'
      ).then((m) => m.ForgetPasswordPageComponent),
    canActivate: [loginAuthGuard],
  },
  {
    path: APP_ROUTES.DASHBOARD.HOME,
    loadComponent: () =>
      import('app/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [dashboardGuard],
  },

  {
    path: APP_ROUTES.TICKET.CREATE,
    loadComponent: () =>
      import(
        'app/pages/tickets/ticket-create-page/ticket-create-page.component'
      ).then((m) => m.TicketCreatePageComponent),
  },

  {
    path: APP_ROUTES.TICKET.TRACK,
    loadComponent: () =>
      import(
        'app/pages/tickets/ticket-tracker-page/ticket-tracker-page.component'
      ).then((m) => m.TicketTrackerPageComponent),
    data: { preload: true },
  },
];
