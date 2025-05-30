import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { SidebarService } from 'app/services/side-bar-service/sidebar.service';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { APP_ROUTES } from 'app/constants/routes';
import { HeaderComponent } from 'app/components/shared/header/header.component';
import { SidebarComponent } from 'app/components/shared/sidebar/sidebar.component';
import { SubMenuComponent } from 'app/components/shared/sub-menu/sub-menu.component';
import { FooterComponent } from 'app/components/shared/footer/footer.component';

import { HeaderData } from 'app/data/model/header-data.model';
import { WebProcess } from 'app/data/model/web-process.model';
import { MenuItemData } from 'app/data/model/menu-item.model';
import { SupportButtonComponent } from '../../components/shared/support-button/support-button.component';
import { environment } from 'environments/environment';
import { mockPageGroup } from 'app/data/mock/page-group.mock';
import { UserManagementService } from 'app/services/user-management/user-management.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    SidebarComponent,
    SubMenuComponent,
    FooterComponent,
    SupportButtonComponent,
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
    private apiProcessesService: ApiProcessesService, // سرویس دریافت داده‌های API
    private userManagement: UserManagementService
  ) {}

  ngOnInit(): void {
    this.initializeDashboard();
  }

  // متد async جدا برای بارگذاری داده‌ها و مقداردهی اولیه صفحه
  private async initializeDashboard(): Promise<void> {
    // بررسی وجود سشن کاربر، در صورت عدم وجود هدایت به صفحه ورود
    const isLoggedInResponse = await this.userAuth.isLoggedIn();

    if (
      !isLoggedInResponse.success &&
      !isLoggedInResponse.data?.ISSessionLive
    ) {
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
