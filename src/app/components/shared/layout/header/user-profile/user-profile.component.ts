import {
  Component,
  Input,
  computed,
  WritableSignal,
  inject,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { RawSoftwareUserForProfile } from 'app/services/user-management/model/software-user-profile.model';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { Store } from '@ngrx/store';
import { createTab } from 'app/store/tab/tab.actions';
import { TabComponentKey } from 'app/constants/tab-component-registry';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "app/components/shared/button/button.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AvatarModule, SkeletonModule, Popover, ButtonModule, CommonModule, ButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private userAuth = inject(UserAuthService);
  private store = inject(Store);
  @Input() profile!: WritableSignal<RawSoftwareUserForProfile | null>;
  readonly isUserProfileLoad = computed(() => this.profile() !== null);

  logout(popover: Popover) {
    this.userAuth.logout();
    popover.hide();
  }

  openProfile(popover: Popover) {
    this.store.dispatch(
      createTab({
        title: 'پروفایل کاربر',
        icon: 'pi pi-user',
        component: TabComponentKey.UserProfileManagement,
        closeable: true,
      })
    );
    popover.hide();
  }
}
