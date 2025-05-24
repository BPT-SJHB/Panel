import { Component } from '@angular/core';
import { FullScreenBackgroundComponent } from "app/components/shared/full-screen-background/full-screen-background.component";
import { FormCardComponent } from "app/components/shared/form-card/form-card.component";
import { ForgetPasswordFormComponent } from "app/components/forms/forget-password-form/forget-password-form.component";

@Component({
  selector: 'app-forget-password-page',
  imports: [FullScreenBackgroundComponent, FormCardComponent, ForgetPasswordFormComponent],
  templateUrl: './forget-password-page.component.html',
  styleUrl: './forget-password-page.component.scss'
})
export class ForgetPasswordPageComponent {

}
