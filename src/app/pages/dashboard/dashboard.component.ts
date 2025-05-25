import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { ButtonModule } from 'primeng/button';
import { ToastService } from 'app/services/toast-service/toast.service';


@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private userAuth: UserAuthService,private router: Router,private toast:ToastService){}

  sessionId:string = ""

  async ngOnInit(): Promise<void> {
    if (!(await this.userAuth.isLoggedIn()).success) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }

    this.sessionId = this.userAuth.getSessionId() ?? '';
  }

  logout() {
    this.userAuth.logout();
    this.toast.success('موفق','شما از حساب کاربری خود خارج شدید')
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
