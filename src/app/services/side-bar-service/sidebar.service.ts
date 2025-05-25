import { Injectable } from '@angular/core';
import { MenuItemData } from 'app/model/menu-item.model';
import { PageGroup } from 'app/model/page-group.model';
import { WebProcess } from 'app/model/web-process.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // وضعیت باز یا بسته بودن سایدبار را به صورت observable نگه می‌دارد
  private _isOpen = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this._isOpen.asObservable();

  // لیست گروه‌های صفحه و فرآیندهای مرتبط با هر کدام
  private pageGroups: PageGroup[] =[]

  // نگه‌دارنده شناسه گروه صفحه انتخاب‌شده فعلی
  private _selectedPageGroupId = new BehaviorSubject<number>(this.pageGroups[0]?.id || 0);

  // خروجی Observable برای ارسال اطلاعات گروه صفحه انتخاب‌شده به کامپوننت‌ها
  selectedPageGroup$: Observable<PageGroup | undefined> = this._selectedPageGroupId.asObservable()
    .pipe(
      map(id => this.pageGroups.find(pg => pg.id === id))
    );

  /**
   * دریافت لیست صفحات به صورت آرایه‌ای از آیتم‌های منوی PrimeNG
   */
  getPages(): MenuItemData[] {
    return this.pageGroups.map(group => ({
      label: group.title,
      icon: group.icon,
      command: () => {
        this.selectPageGroup(group.id);
        this.close();
      }
    }));
  }

  /**
   * دریافت لیست فرآیندهای مربوط به یک گروه صفحه مشخص
   * @param pageId شناسه گروه صفحه
   * @returns آرایه‌ای از WebProcess یا آرایه خالی در صورت عدم وجود گروه
   */
  getProcesses(pageId: number): WebProcess[] {
    const group = this.pageGroups.find(g => g.id === pageId);
    return group ? group.processes : [];
  }

  /**
   * انتخاب یک گروه صفحه بر اساس شناسه آن و اطلاع‌رسانی به مشترکین
   * @param id شناسه گروه صفحه
   */
  selectPageGroup(id: number): void {
    if (this.pageGroups.find(pg => pg.id === id)) {
      this._selectedPageGroupId.next(id);
    } else {
      console.warn(`گروه صفحه با شناسه ${id} یافت نشد`);
    }
  }

  /**
   * دریافت شناسه گروه صفحه انتخاب شده فعلی
   */
  getSelectedPageGroupId(): number {
    return this._selectedPageGroupId.value;
  }

  /**
   * تنظیم گروه‌های صفحه جدید و بررسی معتبر بودن شناسه انتخاب شده فعلی
   * @param groups آرایه جدید گروه‌های صفحه
   */
  setPageGroups(groups: PageGroup[]) {
    this.pageGroups = groups;
    if (!this.pageGroups.find(pg => pg.id === this._selectedPageGroupId.value)) {
      this._selectedPageGroupId.next(this.pageGroups[0]?.id || 0);
    }
  }

  /** باز کردن سایدبار */
  open(): void {
    this._isOpen.next(true);
  }

  /** بستن سایدبار */
  close(): void {
    this._isOpen.next(false);
  }

  /** تغییر وضعیت باز یا بسته بودن سایدبار */
  toggle(): void {
    this._isOpen.next(!this._isOpen.value);
  }
}
