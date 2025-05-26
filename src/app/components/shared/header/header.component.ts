import { Component, Input } from '@angular/core';
import { HeaderData } from 'app/data/model/header-data.model';
import { SidebarService } from 'app/services/side-bar-service/sidebar.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() headerData: HeaderData = {
    title: "عنوان صفحه",
    icon: 'pi-user'
  }
  constructor(private sidebarService: SidebarService) {

  }

  openSidebar() {
    this.sidebarService.open();
  }
}
