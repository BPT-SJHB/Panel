import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderData } from 'app/data/model/header-data.model';
import { selectContent } from 'app/store/content-manager/content-manager.selectors';
import { openSidebar } from 'app/store/sidebar/sidebar.actions';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { RawSoftwareUserForProfile } from 'app/services/user-management/model/software-user-profile.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { WalletProfileComponent } from "../wallet-profile/wallet-profile.component";
import { ThemeManagementComponent } from "../theme-management/theme-management.component";
import { SearchProcessesComponent } from "../../sidebar/search-processes/search-processes.component";
@Component({
  selector: 'app-header',
  imports: [ButtonModule, UserProfileComponent, WalletProfileComponent, ThemeManagementComponent, SearchProcessesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private render$?: Subscription;
  private toast = inject(ToastService);
  private userService = inject(UserManagementService);

  readonly profile = signal<RawSoftwareUserForProfile | null>(null);
  readonly wallet = signal<Wallet | null>(null);

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

  ngOnInit(): void {
    this.loadUserProfile();
  }

  openSidebar() {
    this.store.dispatch(openSidebar());
  }

  private async loadUserProfile() {
    const response = await this.userService.GetSoftwareUserProfile();
    if (!checkAndToastError(response, this.toast)) return;
    this.profile.set(response.data.RawSoftwareUser);
    this.wallet.set(response.data.MoneyWallet);
  }
}
