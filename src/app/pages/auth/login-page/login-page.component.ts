import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from 'app/components/forms/login-form/login-form.component';
import { FullScreenBackgroundComponent } from 'app/components/shared/full-screen-background/full-screen-background.component';
import { FormCardComponent } from 'app/components/shared/form-card/form-card.component';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,LoginFormComponent,FullScreenBackgroundComponent,FormCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {

}
