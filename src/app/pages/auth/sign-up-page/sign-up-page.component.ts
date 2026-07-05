import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpFormComponent } from 'app/components/forms/sign-up-form/sign-up-form.component';
import { FormCardComponent } from 'app/components/shared/form-card/form-card.component';
import { FullScreenBackgroundComponent } from 'app/components/shared/full-screen-background/full-screen-background.component';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    FullScreenBackgroundComponent,
    FormCardComponent,
    SignUpFormComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  private router = inject(Router);

  navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
