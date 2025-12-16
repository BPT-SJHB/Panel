import { Component, signal } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { BaseLoading } from '../shared/component-base/base-loading';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { checkAndToastError } from 'app/utils/api-utils';

export interface TransportLoadPermissions {
  LoadAllocationId: number;
  Pelak: string;
  Serial: string;
  TruckSmartCardNo: string;
  Driver: string;
  TruckDriverNationalCode: string;
  TruckDriverDrivingLicenseNo: string;
  TruckDriverTel: string;
  LoadAllocationDateTime: string;
  LoadId: number;
  SourceCityTitle: string;
  TargetCityTitle: string;
  ProductTitle: string;
  LoadDescription: string;
  SoftwareUserAllocater: string;
}

type TransportLoadPermissionsRow = TransportLoadPermissions & {
  fullPlate: string;
};

const mockTransportLoadPermissons: TransportLoadPermissions[] = [
  {
    LoadAllocationId: 4,
    Pelak: '646ع72',
    Serial: '73',
    TruckSmartCardNo: '4178165',
    Driver: ';رضا;کرمي',
    TruckDriverNationalCode: '1280336651',
    TruckDriverDrivingLicenseNo: '4007929034',
    TruckDriverTel: '09130843148',
    LoadAllocationDateTime: '1404/08/22 - 09:16:22  ',
    LoadId: 17,
    SourceCityTitle: 'اصفهان - اصفهان  ',
    TargetCityTitle: 'تهران',
    ProductTitle: 'انواع لوله آهني',
    LoadDescription: 'يبليبل يبلبيليبل يبليبل',
    SoftwareUserAllocater:
      ';رضا;کرمي                                                                                           ',
  },
  {
    LoadAllocationId: 5,
    Pelak: '646ع72',
    Serial: '73',
    TruckSmartCardNo: '4178165',
    Driver: ';رضا;کرمي',
    TruckDriverNationalCode: '1280336651',
    TruckDriverDrivingLicenseNo: '4007929034',
    TruckDriverTel: '09130843148',
    LoadAllocationDateTime: '1404/08/22 - 09:26:00  ',
    LoadId: 17,
    SourceCityTitle: 'اصفهان - اصفهان  ',
    TargetCityTitle: 'تهران',
    ProductTitle: 'انواع لوله آهني',
    LoadDescription: 'يبليبل يبلبيليبل يبليبل',
    SoftwareUserAllocater:
      ';رضا;کرمي                                                                                           ',
  },
  {
    LoadAllocationId: 9,
    Pelak: '646ع72',
    Serial: '73',
    TruckSmartCardNo: '4178165',
    Driver: ';رضا;کرمي',
    TruckDriverNationalCode: '1280336651',
    TruckDriverDrivingLicenseNo: '4007929034',
    TruckDriverTel: '09130843148',
    LoadAllocationDateTime: '1404/08/22 - 09:26:11  ',
    LoadId: 17,
    SourceCityTitle: 'اصفهان - اصفهان  ',
    TargetCityTitle: 'تهران',
    ProductTitle: 'انواع لوله آهني',
    LoadDescription: 'يبليبل يبلبيليبل يبليبل',
    SoftwareUserAllocater:
      ';رضا;کرمي                                                                                           ',
  },
  {
    LoadAllocationId: 3,
    Pelak: '646ع72',
    Serial: '73',
    TruckSmartCardNo: '4178165',
    Driver: ';رضا;کرمي',
    TruckDriverNationalCode: '1280336651',
    TruckDriverDrivingLicenseNo: '4007929034',
    TruckDriverTel: '09130843148',
    LoadAllocationDateTime: '1404/08/22 - 08:49:32  ',
    LoadId: 16,
    SourceCityTitle: 'اصفهان - اصفهان  ',
    TargetCityTitle: 'تهران',
    ProductTitle: 'انواع لوله آهني',
    LoadDescription: 'سيبسيب يبب سيبسيب',
    SoftwareUserAllocater:
      ';رضا;کرمي                                                                                           ',
  },
  {
    LoadAllocationId: 1,
    Pelak: '646ع72',
    Serial: '73',
    TruckSmartCardNo: '4178165',
    Driver: ';رضا;کرمي',
    TruckDriverNationalCode: '1280336651',
    TruckDriverDrivingLicenseNo: '4007929034',
    TruckDriverTel: '09130843148',
    LoadAllocationDateTime: '1404/08/22 - 08:48:08  ',
    LoadId: 15,
    SourceCityTitle: 'اصفهان - اصفهان  ',
    TargetCityTitle: 'تهران',
    ProductTitle: 'انواع لوله آهني',
    LoadDescription: 'سيبسيبسيب يبسيبسيب سيبسيب',
    SoftwareUserAllocater:
      ';رضا;کرمي                                                                                           ',
  },
];

@Component({
  selector: 'app-transport-load-permissions-form',
  imports: [TableComponent],
  templateUrl: './transport-load-permissions-form.component.html',
  styleUrl: './transport-load-permissions-form.component.scss',
})
export class TransportLoadPermissionsFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  readonly loadPermissions = signal<TransportLoadPermissionsRow[]>([]);
  readonly columns: TableColumn<TransportLoadPermissionsRow>[] = [
    { field: 'LoadAllocationId', header: 'شناسه تخصیص بار' },
    { field: 'fullPlate', header: 'ناوگان' },
    { field: 'TruckSmartCardNo', header: 'هوشمند' },
    { field: 'Driver', header: 'راننده' },
    { field: 'TruckDriverNationalCode', header: 'کد ملی' },
    { field: 'TruckDriverDrivingLicenseNo', header: 'گواهینامه' },
    { field: 'TruckDriverTel', header: 'تلفن راننده' },
    { field: 'LoadAllocationDateTime', header: 'زمان مجوز' },
    { field: 'LoadId', header: 'شناسه بار' },
    { field: 'SourceCityTitle', header: 'مبدا' },
    { field: 'TargetCityTitle', header: 'مقصد' },
    { field: 'ProductTitle', header: 'کالا' },
    { field: 'LoadDescription', header: 'توضیحات بار' },
    { field: 'SoftwareUserAllocater', header: 'کاربر تخصیص  بار' },
  ];

  onViewActivated(): void {
    this.loadLoadPermissions();
  }

  private async loadLoadPermissions() {
    await this.withLoading(async () => {
      const response = { success: true, data: mockTransportLoadPermissons };
      if (!checkAndToastError(response, this.toast)) return;

      const rows: TransportLoadPermissionsRow[] = response.data.map((d) => ({
        ...d,
        fullPlate: `${d.Serial} - ${d.Pelak}`,
      }));

      this.loadPermissions.set(rows);
    });
  }
}
