import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToastService } from 'app/services/toast-service/toast.service';
import { LoaderTypesService } from 'app/services/loader-types/loader-types.service';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { TruckDriverInfo } from 'app/services/driver-truck-management/model/truck-driver-info.model';
import { SplitterModule } from 'primeng/splitter';
import { FormCardComponent } from '../../shared/form-card/form-card.component';

interface dataFormat {
  title: string;
  value: any;
}

@Component({
  selector: 'app-truck-and-driver-information-form',
  imports: [CardModule, SplitterModule, FormCardComponent],
  templateUrl: './truck-and-driver-information-form.component.html',
  styleUrl: './truck-and-driver-information-form.component.scss',
})
export class TruckAndDriverInformationFormComponent implements OnInit {
  @Input() insideTabType: 'Truck' | 'LoaderType' | 'Driver' = 'Truck';

  TruckInfo?: TruckInfo;
  LoaderTypeInfo?: LoaderType;
  DriverInfo?: TruckDriverInfo;
  truckDataForHtml: dataFormat[] = [];
  loaderTypeDataForHtml: dataFormat[] = [];
  driverDataForHtml: dataFormat[] = [];

  private driver_truckManager = inject(Driver_TruckManagementService);
  private loaderTypeManager = inject(LoaderTypesService);
  private toast = inject(ToastService);

  async ngOnInit(): Promise<void> {
    //#region Set TruckInfo
    if (this.insideTabType === 'Truck') {
      const truckResponse =
        await this.driver_truckManager.GetTruckInfoForSoftwareUser();
      if (!checkAndToastError(truckResponse, this.toast)) return;
      this.TruckInfo = truckResponse.data;
    }
    //#endregion

    //#region LoaderTypeInfo
    if (this.insideTabType === 'LoaderType') {
      const loaderTypeResponse =
        await this.loaderTypeManager.GetLoaderTypeInfoForSoftwareUser();
      if (!checkAndToastError(loaderTypeResponse, this.toast)) return;
      this.LoaderTypeInfo = loaderTypeResponse.data;
    }
    //#endregion

    //#region DriverInfo
    if (this.insideTabType === 'Driver') {
      const driverResponse =
        await this.driver_truckManager.GetDriverInfoForSoftwareUser();
      if (!checkAndToastError(driverResponse, this.toast)) return;
      this.DriverInfo = driverResponse.data;
    }
    //#endregion

    this.populateDataForHtml();
  }

  private populateDataForHtml() {
    this.loaderTypeDataForHtml = [
      {
        title: 'کد بارگیر :',
        value: this.LoaderTypeInfo?.LoaderTypeId,
      },
      {
        title: 'شرح بارگیر :',
        value: this.LoaderTypeInfo?.LoaderTypeTitle,
      },
      {
        title: 'نوع بارگیر :',
        value: this.LoaderTypeInfo?.LoaderTypeFixStatusTitle,
      },
    ];

    this.driverDataForHtml = [
      {
        title: 'کد راننده :',
        value: this.DriverInfo?.DriverId,
      },
      {
        title: 'نام و نام خانوادگی :',
        value: this.DriverInfo?.NameFamily,
      },
      {
        title: 'کد ملی :',
        value: this.DriverInfo?.NationalCode,
      },
      {
        title: 'شماره همراه :',
        value: this.DriverInfo?.MobileNumber,
      },
      {
        title: 'نام پدر :',
        value: this.DriverInfo?.FatherName,
      },
      {
        title: 'شماره گواهینامه :',
        value: this.DriverInfo?.DrivingLicenseNo,
      },
      {
        title: 'شماره هوشمند :',
        value: this.DriverInfo?.SmartCardNo,
      },
    ];
  }
}
