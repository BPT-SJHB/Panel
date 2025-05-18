import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-card',
  imports: [],
  template: `<p>loginCard works!</p>`,
  styleUrl: './loginCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCardComponent { }
