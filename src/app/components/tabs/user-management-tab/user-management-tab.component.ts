import { Component } from '@angular/core';
import {TabsModule} from "primeng/tabs";
import { UserInfoFormComponent } from 'app/components/forms/user-Info-form/user-info-form.component';

@Component({
  selector: 'app-user-management-tab',
  imports: [TabsModule, UserInfoFormComponent],
  templateUrl: './user-management-tab.component.html',
  styleUrl: './user-management-tab.component.scss'
})
export class UserManagementTabComponent {

}
