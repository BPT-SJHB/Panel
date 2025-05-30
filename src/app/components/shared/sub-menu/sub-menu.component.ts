import { Component, Input } from '@angular/core';
import { WebProcess } from 'app/data/model/web-process.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sub-menu',
  imports: [CardModule],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent {
  @Input() processes: WebProcess[] = [];

}
