import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { SidebarService } from 'app/services/side-bar-service/sidebar.service';

import { APP_ROUTES } from 'app/constants/routes';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';

import { HeaderData } from 'app/model/header-data.model';
import { WebProcess } from 'app/model/web-process.model';
import { SubMenuComponent } from "../../components/shared/sub-menu/sub-menu.component";
import { mockPageGroup } from 'app/constants/dev';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, HeaderComponent, SidebarComponent, SubMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // داده‌های هدر صفحه (عنوان و آیکون)
  headerData: HeaderData = { title: '', icon: '' };

  // لیست فرآیندهای وب نمایش داده شده در صفحه
  webProcesses: WebProcess[] = [];

  constructor(
    private userAuth: UserAuthService,    // سرویس احراز هویت کاربر
    private router: Router,
    private sidebarService: SidebarService // سرویس مدیریت سایدبار
  ) {}

  ngOnInit(): void {
    // اگر سشن کاربر موجود نبود، به صفحه ورود هدایت شود
    if (!this.userAuth.getSessionId()) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }

    // --------- بارگذاری داده‌ها ---------
    // این بخش می‌تواند با دریافت داده‌ها از API جایگزین شود
    const pageGroupsAPI = mockPageGroup;
    this.sidebarService.setPageGroups(pageGroupsAPI);

    // مشترک شدن روی صفحه گروه انتخاب شده برای به‌روزرسانی headerData و webProcesses
    this.sidebarService.selectedPageGroup$.subscribe(page => {
      if (!page) return;

      this.headerData = {
        title: page.title,
        icon: page.icon,
      };

      this.webProcesses = page.processes;
    });
  }
}
