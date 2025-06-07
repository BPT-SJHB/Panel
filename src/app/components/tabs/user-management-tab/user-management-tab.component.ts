import { Component } from '@angular/core';
import {TabsModule} from "primeng/tabs";
import { UserInfoFormComponent } from 'app/components/forms/user-management-form/user-Info-form/user-info-form.component';
import { UsersMenuAccessFormComponent } from "../../forms/user-management-form/users-menu-access-form/users-menu-access-form.component";

@Component({
  selector: 'app-user-management-tab',
  imports: [TabsModule, UserInfoFormComponent, UsersMenuAccessFormComponent],
  templateUrl: './user-management-tab.component.html',
  styleUrl: './user-management-tab.component.scss'
})
export class UserManagementTabComponent {
  }