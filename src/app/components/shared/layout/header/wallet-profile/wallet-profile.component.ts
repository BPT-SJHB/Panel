import { Component, computed, inject, Input, WritableSignal } from '@angular/core';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { Skeleton } from 'primeng/skeleton';
import { Avatar } from 'primeng/avatar';
import { Popover } from 'primeng/popover';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { createTab } from 'app/store/tab/tab.actions';
import { TabComponentKey } from 'app/constants/tab-component-registry';

@Component({
  selector: 'app-wallet-profile',
  imports: [Skeleton, Popover, DecimalPipe, CommonModule, Avatar],
  templateUrl: './wallet-profile.component.html',
  styleUrl: './wallet-profile.component.scss',
})
export class WalletProfileComponent {
  private store = inject(Store);

  @Input() wallet!: WritableSignal<Wallet | null>;
  isUserWalletLoad = computed(() => this.wallet() !== null);

  openWallet(popover: Popover) {
    this.store.dispatch(
      createTab({
        title: 'کیف پول کاربر',
        icon: 'pi pi-wallet',
        component: TabComponentKey.UserWalletManagement,
        closeable: true,
      })
    );
    popover.hide();
  }
}
