import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth-service/user-auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/routes';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../services/toast-service/toast-service.service';


@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private userAuth: UserAuthService,private router: Router,private toast:ToastService){}

  sessionId:string = ""

  ngOnInit(): void {
     this.sessionId = this.userAuth.getSessionId() ?? "";
     if (this.sessionId == "") {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
     }
  }

  logout() {
    this.userAuth.logout();
    this.toast.info('اطلاعیه','شما از حساب کاربری خود خارج شدید')
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
