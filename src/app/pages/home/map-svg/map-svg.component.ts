import { Component, EventEmitter, Output } from '@angular/core';

const provinceNames = {
  'IR-00': 'Unknown',
  'IR-01': 'آذربایجان شرقی',
  'IR-02': 'آذربایجان غربی',
  'IR-03': 'اردبیل',
  'IR-04': 'اصفهان',
  'IR-05': 'ایلام',
  'IR-06': 'بوشهر',
  'IR-07': 'تهران',
  'IR-08': 'چهارمحال و بختیاری',
  'IR-10': 'خوزستان',
  'IR-11': 'زنجان',
  'IR-12': 'سمنان',
  'IR-13': 'سیستان و بلوچستان',
  'IR-14': 'فارس',
  'IR-15': 'کرمان',
  'IR-16': 'کردستان',
  'IR-17': 'کرمانشاه',
  'IR-18': 'کهگیلویه و بویراحمد',
  'IR-19': 'گیلان',
  'IR-20': 'لرستان',
  'IR-21': 'مازندران',
  'IR-22': 'مرکزی',
  'IR-23': 'هرمزگان',
  'IR-24': 'همدان',
  'IR-25': 'یزد',
  'IR-26': 'قم',
  'IR-27': 'گلستان',
  'IR-28': 'قزوین',
  'IR-29': 'خراسان جنوبی',
  'IR-30': 'خراسان رضوی',
  'IR-31': 'خراسان شمالی',
  'IR-32': 'البرز',
} as const;

type ProvinceMap = typeof provinceNames;
export type ProvinceCode = keyof ProvinceMap;
export type ProvinceName = ProvinceMap[ProvinceCode];

@Component({
  selector: 'app-map-svg',
  imports: [],
  templateUrl: './map-svg.component.html',
  styleUrl: './map-svg.component.scss',
})
export class MapSvgComponent {
  @Output() clickProvince = new EventEmitter<{
    provinceName: ProvinceName;
    provinceCode: ProvinceCode;
  }>();

  private readonly provinceNames = provinceNames;

  onProvinceClick(provinceId: ProvinceCode): void {
    const provinceName = this.provinceNames[provinceId];

    this.clickProvince.emit({
      provinceName: provinceName,
      provinceCode: provinceId,
    });
  }
}
