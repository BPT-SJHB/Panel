import { PTPInfo } from './ptp-info-model';

export interface LoadInfo {
  LoadId: number; // کد بار
  AnnounceDate: string; // تاریخ ثبت بار
  AnnounceTime: string; // ساعت ثبت بار
  TransportCompanyId: number; // کد شرکت اعلام کننده بار
  TransportCompanyTitle: string; // عنوان شرکت اعلام کننده بار
  GoodId: number; // کد کالا
  GoodTitle: string; // عنوان کالا
  LoadAnnouncementGroupId: number; // کد گروه اعلام بار
  LoadAnnouncementGroupTitle: string; // عنوان گروه اعلام بار
  LoadAnnouncementSubGroupId: number; // کد زیرگروه اعلام بار
  LoadAnnouncementSubGroupTitle: string; // عنوان زیرگروه اعلام بار
  SourceCityId: number; // کد شهر مبدا
  SourceCityTitle: string; // عنوان شهر مبدا
  TargetCityId: number; // کد شهر مقصد
  TargetCityTitle: string; // عنوان شهر مقصد
  LoadingPlaceId: number; // کد مبدا بارگیری
  LoadingPlaceTitle: string; // عنوان مبدا بارگیری
  DischargingPlaceId: number; // کد مقصد تخلیه
  DischargingPlaceTitle: string; // عنوان مقصد تخلیه
  TotalNumber: number; // تعداد کل
  Tonaj: number; // تناژ بار
  Tarrif: number; // تعرفه حمل
  Recipient: string; // گیرنده
  Address: string; // آدرس
  Description: string; // توضیحات
  LoadStatusId: number; // کد وضعیت نهایی بار
  LoadStatusTitle: string; // عنوان وضعیت نهایی بار
  TPTParams: PTPInfo[];
}
