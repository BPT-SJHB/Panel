import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadAllocationInfo } from 'app/services/load-management/model/load-allocation-info.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { OrderList, OrderListModule } from 'primeng/orderlist';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { NgClass } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AppConfirmService } from 'app/services/confirm/confirm.service';

@Component({
  selector: 'app-load-allocation-priority',
  imports: [OrderListModule, ButtonComponent, NgClass, PanelModule],
  templateUrl: './load-allocation-priority.component.html',
  styleUrl: './load-allocation-priority.component.scss',
})
export class LoadAllocationPriorityComponent
  extends BaseLoading
  implements OnViewActivated, OnInit, AfterViewInit
{
  @ViewChild('orderlist', { static: true }) orderList!: OrderList;

  private readonly loadsService = inject(LoadManagementService);
  private readonly confirmDialog = inject(AppConfirmService);
  readonly loadsAllocations = signal<LoadAllocationInfo[]>([]);
  readonly travelTime = signal(new Map<number, number>());
  readonly loadingTimeTravels = signal(new Set<number>());
  private destroyTouchScroll: (() => void) | null = null;
  readonly selection = signal<LoadAllocationInfo[]>([]);

  onViewActivated(): void {
    this.withLoading(async () => {
      this.selection.set([]);
      await this.loadLoadsAllocation();
    });
  }

  ngAfterViewInit(): void {
    const parent = document.getElementById('orderlist');
    const child = parent?.querySelector('.p-listbox-list-container');

    this.destroyTouchScroll = this.forwardTouchScroll(
      parent,
      child as HTMLElement
    );
  }

  override ngOnDestroy(): void {
    this.destroyTouchScroll?.();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  private forwardTouchScroll(
    parent?: HTMLElement | null,
    child?: HTMLElement | null
  ) {
    if (!parent || !child) return null;

    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      child.scrollTop += deltaY;
      startY = currentY;
      e.preventDefault();
    };

    parent.addEventListener('touchstart', onTouchStart, { passive: true });
    parent.addEventListener('touchmove', onTouchMove, { passive: false });

    // return cleanup function
    return () => {
      parent.removeEventListener('touchstart', onTouchStart);
      parent.removeEventListener('touchmove', onTouchMove);
    };
  }

  private async loadLoadsAllocation(): Promise<void> {
    await this.withLoading(async () => {
      const response = await this.loadsService.GetLoadAllocationOfDriver();
      if (!checkAndToastError(response, this.toast)) return;
      this.loadsAllocations.set(response.data);
    });
  }

  async showTravelTime(ladId: number) {
    const time = this.getTimeTravel(ladId);
    if (time) return;
    this.loadingTimeTravels.update((lt) => lt.add(ladId));
    try {
      const response =
        await this.loadsService.GetTravelTimeOfLoadAllocation(ladId);
      if (!checkAndToastError(response, this.toast)) return;
      this.travelTime.update((map) => map.set(ladId, response.data.TravelTime));
    } finally {
      setTimeout(() => {
        this.loadingTimeTravels.update((lt) => {
          lt.delete(ladId);
          return lt;
        });
      }, 2000);
    }
  }

  async cancelLoad(load: LoadAllocationInfo) {
    this.confirmDialog.confirmLoadAllocationCancel(
      `بار ${load.GoodTitle} - ${load.LAId}`,
      async () => {
        await this.withLoading(async () => {
          const response = await this.loadsService.CancelLoadAllocation(
            load.LAId,
            load.LoadId
          );
          if (!checkAndToastError(response, this.toast)) return;
          this.toast.success('موفق', response.data.Message);
          await this.loadLoadsAllocation();
        });
      }
    );
  }

  getTimeTravel(ladId: number) {
    const time = this.travelTime().get(ladId);
    return time;
  }

  selectionChanged(loads: LoadAllocationInfo[]) {
    if (loads.length === 0) {
      this.selection.set([]);
      return;
    }
    for (const load of loads) {
      if (
        this.selection().length === 0 ||
        this.selection()[0].LAId !== load.LAId
      )
        this.selection.set([load]);
    }
  }

  isLoadSelected(ladId: number): boolean {
    return this.selection().length > 0 && this.selection()[0].LAId === ladId;
  }

  savePriorities($event: MouseEvent) {
    this.withLoading(async () => {
      // this.loadsService.AllocateLoadToNextTurn()
      this.toast.success('موفق', 'اولویت‌ها با موفقیت ذخیره شد');
    });
  }
}
