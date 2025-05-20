import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './pages/auth/forget-password-page/forget-password-page.component';

export const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch: 'full'},
  {path:'auth/login', component:LoginPageComponent},
  {path:'auth/forget-password',component:ForgetPasswordPageComponent}
];
