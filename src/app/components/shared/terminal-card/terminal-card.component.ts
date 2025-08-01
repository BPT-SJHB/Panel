import { Component, Input } from '@angular/core';
import { APP_ROUTES } from 'app/constants/routes';
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-terminal-card',
  imports: [CardModule, ButtonModule, ButtonComponent],
  templateUrl: './terminal-card.component.html',
  styleUrl: './terminal-card.component.scss',
})
export class TerminalCardComponent {
  @Input() terminal?: LoadAnnouncementPlace;

  getLoginLink() {
    return this.terminal?.LAPURL + APP_ROUTES.AUTH.LOGIN;
  }
}
