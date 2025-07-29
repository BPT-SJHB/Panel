import { Component, OnInit, signal } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { ButtonComponent } from '../button/button.component';
import { Card } from 'primeng/card';
import { WebProcess } from 'app/data/model/web-process.model';

@Component({
  selector: 'app-main-tab',
  imports: [CarouselComponent, ButtonComponent, Card],
  templateUrl: './main-view.component.html',
  standalone: true,
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  images = [
    {
      title: 'one',
      imgLink: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
    },
    {
      title: 'two',
      imgLink: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
    },
    {
      title: 'three',
      imgLink: 'https://api.slingacademy.com/public/sample-photos/3.jpeg',
    },
    {
      title: 'four',
      imgLink: 'https://api.slingacademy.com/public/sample-photos/4.jpeg',
    },
    {
      title: 'five',
      imgLink: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
    },
  ];

  process = [
    {
      PId: 0,
      PTitle:
        'مدیریت کاربران                                                                                      ',
      PName: 'UsersManagement                                   ',
      Description:
        'مدیریت کاربر شامل ایجاد، ویرایش، حذف، و تعیین دسترسی‌های کاربران می‌ شود.از طریق این منو می توانید فرآیند فعال سازی پکیج اس ام اس کاربر را نیز انجام دهید و نیز می توانید کاربر را غیر فعال نمایید',
      PIconName: 'pi-user',
    },
    {
      PId: 1,
      PTitle:
        'راننده و ناوگان حمل                                                                                 ',
      PName: 'DriversAndTrucks                                  ',
      Description:
        'امکان استعلام و ثبت اطلاعات راننده از طریق کد ملی و ناوگان از طریق شماره هوشمند فراهم می باشد.استعلام کد ملی و هوشمند از درگاه سازمان راهداری موجب ویرایش اطلاعت راننده و ناوگان در سامانه می گردد.پس از ثبت اطلاعات ، مجوزهای دسترسی به صورت خودکار ایجاد می گردد',
      PIconName: 'pi-id-card',
    },
    {
      PId: 3,
      PTitle:
        'شرکت های حمل و نقل                                                                                  ',
      PName: 'TransportCompanies                                ',
      Description:
        'از طریق این منو امکان مشاهده لیست شرکت های حمل و نقل بار یا شرکت های باربری وجود دارد.امکان تغییر عناوین وجود ندارد.برای ارتباط سامانه با شرکت شماره همراه مدیر عامل الزامی است',
      PIconName: 'pi-warehouse',
    },
    {
      PId: 4,
      PTitle:
        'صفوف نوبت دهی                                                                                       ',
      PName: 'SequentialTurns                                   ',
      Description:
        'امکان ثبت و ویرایش صفوف نوبت از طریق این واسط فراهم شده است.تغییر در صفوف نوبت در آینده ممکن است موجب اختلالاتی در سامانه گردد لذا انتخاب درست صفوف هنگام استقرار سامانه از مشکلات آتی جلوگیری خواهد کرد ',
      PIconName: 'pi-users',
    },
    {
      PId: 5,
      PTitle:
        'صاحبین بار                                                                                          ',
      PName: 'BarOwners                                         ',
      Description:
        'موجودیت صاحب بار در این سامانه به منظور ردیابی محموله ، یکپارچگی در اطلاع رسانی های صورت گرفته و ایجاد ارتباط هماهنگ بین شرکت حمل و نقل ، راننده و صاحب بار است',
      PIconName: 'pi-box',
    },
    {
      PId: 6,
      PTitle:
        'کارخانجات و مراکز تولید بار                                                                         ',
      PName: 'Manufactures                                      ',
      Description:
        'امکان اعلام بار یکپارچه و خودکار تولیدات مراکز تولید و کارخانجات تولیدی در سامانه وجود دارد.از طریق این منو مدیریت اطلاعات مراکز مذکور ، ردیابی بارهای اعلام شده و مشاهده اطلاعات دفاتر مرکزی وجود دارد',
      PIconName: 'pi-hammer',
    },
    {
      PId: 7,
      PTitle:
        'مبادی و مقاصد حمل بار                                                                               ',
      PName: 'LoadingDischargingLocations                       ',
      Description:
        'مبادی و مقاصد حمل شامل انبارها ، پروژه ها ، تعلقات صاحبین بار ، کارخانجات ، مراکز دپوی بار و ... می باشد.امکان کنترل وضعیت بارگیری و تخلیه مبادی و مقاصد حمل از طریق این منو امکان پذیر است',
      PIconName: 'pi-map-marker',
    },
    {
      PId: 8,
      PTitle:
        'استان ها ، شهرها                                                                                    ',
      PName: 'ProvincesCities                                   ',
      Description:
        'از طریق این واسط امکان مشاهده لیست استان ها و شهرها همراه با کدینگ سازمان راهداری وجود دارد.کدینگ مذکور قابل تغییر نیست و به صورت خودکار و در صورت نیاز به روز رسانی می گردد.',
      PIconName: 'pi-map-marker',
    },
    {
      PId: 9,
      PTitle:
        'کالا                                                                                                ',
      PName: 'Goods                                             ',
      Description:
        'کدینگ کالا استاندارد تعیین شده توسط سازمان راهداری از طریق این واسط قابل مشاهده است.قابل ذکر است کدینگ مذکور قابل تغییر نیست و به صورت خودکار و در صورت نیاز بروز رسانی می گردد',
      PIconName: 'pi-box',
    },
    {
      PId: 10,
      PTitle:
        'مشخصات ناوگان و راننده                                                                              ',
      PName: 'TruckAndDriverInformation                         ',
      Description:
        'امکان مشاهده مشخصات راننده فعال شامل نام و نام خانوادگی ، اطلاعات شناسنامه ای و شماره هوشمند از طریق این واسط فراهم است.قبل از هر گونه فعالیت در سامانه از صحت اطلاعات اطمینان یابید',
      PIconName: 'pi-id-card',
    },
    {
      PId: 11,
      PTitle:
        'گروه ها و زیرگروه های اعلام بار                                                                     ',
      PName: 'Announcements                                     ',
      Description:
        'اعلام بار بر اساس گروه ها  و زیرگروه های اعلام بار صورت می گیرد.کالای حمل اساسا در یک زیرگروه اعلام بار دسته بندی می شود .امکان اعلام بار برای یک کالا در یک زیرگروه غیر مرتبط امکان پذیر نیست ',
      PIconName: 'pi-truck',
    },
    {
      PId: 12,
      PTitle:
        'بارگیرها                                                                                            ',
      PName: 'Loaders                                           ',
      Description:
        'از طریق این واسط می توانید کدینگ استاندارد بارگیرها وضع شده توسط سازمان راهداری را مشاهده نمایید.قابل ذکر است تغییر این کدینگ امکان پذیر نیست و در صورت نیاز به صورت خودکار بروز رسانی می گردند',
      PIconName: 'pi-cart-arrow-down',
    },
    {
      PId: 13,
      PTitle:
        'ناوگان ملکی                                                                                         ',
      PName: 'CorporateTrucks                                   ',
      Description:
        'از طریق این واسط می توانید لیست ناوگان ملکی متعلق به شرکت حمل و نقل را مشاهده و در صورت نیاز تغییراتی را لحاظ نمایید',
      PIconName: 'pi-warehouse',
    },
    {
      PId: 14,
      PTitle:
        'مدت سفر                                                                                             ',
      PName: 'TravelDurations                                   ',
      Description:
        'فاصله مبدا بارگیری تا مقصد تخلیه بار به عنوان مدت سفر در نظر گرفته می شود.از طریق این واسط می توانید تغییراتی را به مدت سفر که در واحد ساعت می باشد لحاظ نمایید',
      PIconName: 'pi-stopwatch',
    },
    {
      PId: 22,
      PTitle:
        'پروفایل کاربر                                                                                       ',
      PName: 'SoftwareUserProfile                               ',
      Description:
        'از طریق این واسط امکان مشاهده مشخصات کاربری وجود دارد.همچنین امکان بروز رسانی رمز عبور و فعال سازی اس ام اس کاربر نیز فراهم شده است',
      PIconName: 'pi-list',
    },
    {
      PId: 44,
      PTitle:
        'خود اظهاری راننده گان و کامیونداران                                                                 ',
      PName: 'DriverSelfDeclaration                             ',
      Description:
        'به منظور تدوین و تکمیل و اصلاح قواعد حمل نتایج خوداظهاری راننده به کارگرفته می شود.در فرآیند خود اظهاری صریحا شرایط ناوگان مثل طول و عرض و تعداد محور و وزن خالی بارگیر را لحاظ می شود ',
      PIconName: 'pi-exclamation-circle',
    },
    {
      PId: 53,
      PTitle:
        'تعرفه های حمل بار                                                                                   ',
      PName: 'TransportPrices                                   ',
      Description:
        'مدیر سیستم از طریق این منو می تواند تعرفه های حمل بار را مدیریت نماید.افزایش مبلغ تعرفه به صورت گروهی و یا تکی مبنی بر مبدا و مقصد حمل صورت می گیرد',
      PIconName: 'pi-objects-column',
    },
  ];

  ngOnInit(): void {}

  OpenProcess(item: WebProcess) {
    console.log('Hello from MainViewComponent!');
  }
}
