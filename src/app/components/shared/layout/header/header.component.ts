import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderData } from 'app/data/model/header-data.model';
import { selectContent } from 'app/store/content-manager/content-manager.selectors';
import { openSidebar } from 'app/store/sidebar/sidebar.actions';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private store = inject(Store);
  private render$?: Subscription;

  headerData: HeaderData = {
    title: 'عنوان صفحه',
    icon: 'pi-user',
  };

  ngAfterViewInit(): void {
    this.render$ = this.store.select(selectContent).subscribe((render) => {
      this.headerData = {
        title: render.title,
        icon: render.icon,
      };
    });
  }

  ngOnDestroy(): void {
    this.render$?.unsubscribe();
  }

  openSidebar() {
    this.store.dispatch(openSidebar());
  }
}
