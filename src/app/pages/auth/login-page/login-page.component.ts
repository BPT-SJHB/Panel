import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../../components/forms/login-form/login-form.component';
import { FullScreenBackgroundComponent } from '../../../components/shared/full-screen-background/full-screen-background.component';
import { FormCardComponent } from '../../../components/shared/form-card/form-card.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,LoginFormComponent,FullScreenBackgroundComponent,FormCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {

}
