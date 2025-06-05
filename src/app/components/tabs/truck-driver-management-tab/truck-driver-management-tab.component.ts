import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DriverInfoFormComponent } from "../../forms/truck-driver-manages-form/driver-info-form/driver-info-form.component";
import { TruckInfoFormComponent } from "../../forms/truck-driver-manages-form/truck-info-form/truck-info-form.component";

@Component({
  selector: 'app-truck-driver-management-tab',
  imports: [TabsModule, DriverInfoFormComponent, TruckInfoFormComponent],
  templateUrl: './truck-driver-management-tab.component.html',
  styleUrl: './truck-driver-management-tab.component.scss'
})
export class TruckDriverManagementTabComponent {

}
