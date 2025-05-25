import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { SidebarService } from 'app/services/side-bar-service/sidebar.service';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { APP_ROUTES } from 'app/constants/routes';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { SubMenuComponent } from '../../components/shared/sub-menu/sub-menu.component';

import { HeaderData } from 'app/model/header-data.model';
import { WebProcess } from 'app/model/web-process.model';
import { mockPageGroup } from 'app/constants/dev';
import { MenuItemData } from 'app/model/menu-item.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    SidebarComponent,
    SubMenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // هدر صفحه: عنوان و آیکون
  headerData: HeaderData = { title: '', icon: '' };

  // لیست فرآیندهای صفحه جاری
  webProcesses: WebProcess[] = [];
  menuItems: MenuItemData[] = [];

  constructor(
    private userAuth: UserAuthService, // سرویس احراز هویت کاربر
    private router: Router,
    private toast: ToastService, // سرویس نمایش پیام‌ها (Toast)
    private sidebarService: SidebarService, // سرویس مدیریت داده‌های سایدبار
    private apiProcessesService: ApiProcessesService // سرویس دریافت داده‌های API
  ) {}

  ngOnInit(): void {
    this.initializeDashboard();
  }

  // متد async جدا برای بارگذاری داده‌ها و مقداردهی اولیه صفحه
  private async initializeDashboard(): Promise<void> {
    // بررسی وجود سشن کاربر، در صورت عدم وجود هدایت به صفحه ورود
    if (!(await this.userAuth.isLoggedIn()).success) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }

    // درخواست داده‌های گروه صفحه از API
    const response = await this.apiProcessesService.getApiProcesses();

    if (response.success && response.data) {
      this.sidebarService.setPageGroups(response.data);
    } else {
      // نمایش خطا به کاربر در صورت عدم موفقیت دریافت داده‌ها
      this.toast.error('خطا', response.error?.message ?? 'خطایی رخ داده است');
      console.error('API error details:', response.error?.details);
    }
    // this.sidebarService.setPageGroups(mockPageGroup);

    // مشترک شدن روی تغییرات گروه صفحه انتخاب شده جهت به‌روزرسانی هدر و فرآیندها
    this.sidebarService.selectedPageGroup$.subscribe((page) => {
      if (!page) return;

      this.headerData = {
        title: page.title,
        icon: page.icon,
      };

      this.webProcesses = page.processes;

      this.menuItems = this.sidebarService.getPages();
    });
  }
}
