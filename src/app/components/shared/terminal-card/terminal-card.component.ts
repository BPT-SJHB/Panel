import { Component, Input } from '@angular/core';
import { APP_ROUTES } from 'app/constants/routes';
import { CargoTerminal } from 'app/data/model/cargo-terminal.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-terminal-card',
  imports: [CardModule,ButtonModule],
  templateUrl: './terminal-card.component.html',
  styleUrl: './terminal-card.component.scss'
})
export class TerminalCardComponent {
  @Input() terminal?:CargoTerminal;

  getLoginLink(){
    return this.terminal?.url + APP_ROUTES.AUTH.LOGIN;
  }
}
