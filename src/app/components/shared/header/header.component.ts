import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderData } from 'app/data/model/header-data.model';
import {openSidebar} from 'app/store/sidebar/sidebar.actions';
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
  constructor(private store:Store) {

  }

  openSidebar() {
    this.store.dispatch(openSidebar())
  }
}
