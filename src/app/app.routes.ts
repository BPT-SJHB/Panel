import { Routes } from '@angular/router';
import { LoginPageComponent } from 'app/pages/auth/login-page/login-page.component';
import { ForgetPasswordPageComponent } from 'app/pages/auth/forget-password-page/forget-password-page.component';
import { APP_ROUTES } from 'app/constants/routes';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path: APP_ROUTES.HOME,redirectTo:'auth/login',pathMatch: 'full'},
  {path: APP_ROUTES.AUTH.LOGIN , component:LoginPageComponent},
  {path: APP_ROUTES.AUTH.FORGET_PASSWORD,component:ForgetPasswordPageComponent},
  {path:APP_ROUTES.DASHBOARD.HOME,component:DashboardComponent}
];
