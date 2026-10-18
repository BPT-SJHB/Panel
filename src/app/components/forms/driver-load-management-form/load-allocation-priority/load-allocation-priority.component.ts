/**
 * Custom reorder list. Replaces PrimeNG OrderList.
 *
 * Spec
 * - Same cards: title, company, priority badge, expandable body, cancel, save.
 * - Circular chevron toggles the card. Grip handle reorders.
 * - Phone: scroll the list; drag only from the grip. Desktop: both.
 * - Order in `loadsAllocations` is the source of truth for save.
 *
 * Do not regress
 * - Whole-row CDK drag sets touch-action:none → phone cannot scroll.
 * - PrimeNG OrderList/Listbox owns CDK_DRAG_CONFIG; delay/handle hacks never stick.
 * - forwardTouchScroll + preventDefault kills native scroll and CDK drag.
 * - Fake sibling scrollbar gutter: RTL first-child is visual right; measure-before-paint → height 0; overlay thumbs hide.
 * - document.querySelector into PrimeNG internals.
 * - New list libraries.
 */
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { LoadAllocationInfo } from 'app/services/load-management/model/load-allocation-info.model';
import { LoadAllocationPriority } from 'app/services/load-management/model/load-allocation-priority';
import { checkAndToastError } from 'app/utils/api-utils';

@Component({
  selector: 'app-load-allocation-priority',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, ButtonComponent, NgClass],
  templateUrl: './load-allocation-priority.component.html',
  styleUrl: './load-allocation-priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadAllocationPriorityComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly loadsService = inject(LoadManagementService);
  private readonly confirmDialog = inject(AppConfirmService);
  readonly loadsAllocations = signal<LoadAllocationInfo[]>([]);
  readonly travelTime = signal(new Map<number, number>());
  readonly loadingTimeTravels = signal(new Set<number>());
  readonly selection = signal<LoadAllocationInfo[]>([]);
  readonly expandedIds = signal(new Set<number>());
  private readonly listEl = viewChild<ElementRef<HTMLUListElement>>('list');

  onViewActivated(): void {
    this.withLoading(async () => {
      this.selection.set([]);
      await this.loadLoadsAllocation();
    });
  }

  drop(event: CdkDragDrop<LoadAllocationInfo[]>): void {
    this.loadsAllocations.update((items) => {
      const next = [...items];
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }

  canMove(dir: 'up' | 'down' | 'top' | 'bottom'): boolean {
    const from = this.selectedIndex();
    if (from < 0) return false;
    const last = this.loadsAllocations().length - 1;
    if (last < 1) return false;
    return dir === 'up' || dir === 'top' ? from > 0 : from < last;
  }

  moveSelected(dir: 'up' | 'down' | 'top' | 'bottom'): void {
    const from = this.selectedIndex();
    if (from < 0) return;
    const last = this.loadsAllocations().length - 1;
    const dest =
      dir === 'top' ? 0 : dir === 'bottom' ? last : dir === 'up' ? from - 1 : from + 1;
    if (dest < 0 || dest > last || dest === from) return;
    const before = this.snapshotRects();
    this.loadsAllocations.update((items) => {
      const next = [...items];
      moveItemInArray(next, from, dest);
      return next;
    });
    requestAnimationFrame(() => this.playFlip(before));
  }

  private snapshotRects(): Map<string, DOMRect> {
    const map = new Map<string, DOMRect>();
    const root = this.listEl()?.nativeElement;
    if (!root) return map;
    for (const el of Array.from(root.children) as HTMLElement[]) {
      const id = el.dataset['id'];
      if (id) map.set(id, el.getBoundingClientRect());
    }
    return map;
  }

  private playFlip(before: Map<string, DOMRect>): void {
    const root = this.listEl()?.nativeElement;
    if (!root) return;
    for (const el of Array.from(root.children) as HTMLElement[]) {
      const id = el.dataset['id'];
      const prev = id ? before.get(id) : undefined;
      if (!prev) continue;
      const dy = prev.top - el.getBoundingClientRect().top;
      if (Math.abs(dy) < 1) continue;
      el.animate(
        [{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
        { duration: 220, easing: 'ease' }
      );
    }
  }

  private selectedIndex(): number {
    const id = this.selection()[0]?.LAId;
    return id == null ? -1 : this.loadsAllocations().findIndex((x) => x.LAId === id);
  }

  selectLoad(load: LoadAllocationInfo): void {
    this.selection.update((cur) => (cur[0]?.LAId === load.LAId ? [] : [load]));
  }

  isExpanded(ladId: number): boolean {
    return this.expandedIds().has(ladId);
  }

  toggleExpand(ladId: number, event: Event): void {
    event.stopPropagation();
    this.expandedIds.update((ids) => {
      const next = new Set(ids);
      if (next.has(ladId)) next.delete(ladId);
      else next.add(ladId);
      return next;
    });
  }

  private async loadLoadsAllocation(): Promise<void> {
    const response = await this.loadsService.GetLoadAllocationOfDriver();
    if (!checkAndToastError(response, this.toast)) {
      this.loadsAllocations.set([]);
      return;
    }
    this.loadsAllocations.set(response.data ?? []);
  }

  async showTravelTime(ladId: number) {
    const time = this.getTimeTravel(ladId);
    if (time != null) return;
    this.loadingTimeTravels.update((lt) => new Set(lt).add(ladId));
    try {
      const response =
        await this.loadsService.GetTravelTimeOfMyLoadAllocation(ladId);
      if (!checkAndToastError(response, this.toast)) return;
      this.travelTime.update(
        (map) => new Map(map).set(ladId, response.data.TravelTime)
      );
    } finally {
      setTimeout(() => {
        this.loadingTimeTravels.update((lt) => {
          const next = new Set(lt);
          next.delete(ladId);
          return next;
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
    return this.travelTime().get(ladId);
  }

  isLoadSelected(ladId: number): boolean {
    return this.selection().length > 0 && this.selection()[0].LAId === ladId;
  }

  async savePriorities() {
    await this.withLoading(async () => {
      const priorites: LoadAllocationPriority[] = this.loadsAllocations().map(
        (item, index) => ({ LAId: item.LAId, Priority: index + 1 })
      );
      const response =
        await this.loadsService.ChangePriorityLoadAllocations(priorites);
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
      await this.loadLoadsAllocation();
    });
  }
}
