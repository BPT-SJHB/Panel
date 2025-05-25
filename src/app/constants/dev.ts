// این جهت نگهداری تست من در نبود api ها هست

import { CaptchaChallenge } from "app/model/captcha-challenge.model";
import { PageGroup } from "app/model/page-group.model";
import { UserSession } from "app/model/user-session.model";

export const mockCaptcha:CaptchaChallenge = {
  sessionId:"cb3d7916307b7713875d7cf0fd9639e4a5qddt$oRi2A",
  imageData:"iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAAC+jCIaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVCSURBVHhe7ZqhetwwEITvEQr7KqWFfZ3C0MLAwNDAwMDSwMDA0IOBga7W8bhzm11L8tmWfCeg7//OtlZr7XgkOzncdIfuT2iNl8fj95/d27cfPVOuX5KHlIsa98OSYmI2x7oA1iImZnOsnbJGMTGbY+2ItYuJ2Ryrcu5JTMzmWBVyr2JiNseqhJcgJmZzrIK8NDExm2NtzEsWE7M51ga8FjExr9axUOzU63NZi5jWvk+PV+9YKP4Sk1+bmErmkexYt4rHw6HrdPv9/7wXR9/0GPd46N451s1wHOcHenE9Sr+7e4pL7XE4j+vmiOzcIur76/n8md97yFuf9+Kcm8fSzHKs+4evxTlpSgyxeDwZQivmcxBcajxN6fcYxI5YT8Pxp5AnjrG4uD/npeMuVUSMq/ny6zO3jzDffJz7c37n5rEGsxwLReJie0yN+wCxhmLrycJxuS43bs+Q54fECIV6GI4jDsR1DO7Ax9Gf78fKa6roOeRxhON8SKMVQOeRGr8UsxwLxXgJBZPfelI0Y/Hkuufh6bTEysW0+sd4Oywp1rKK5ZGXG92fx8cyzcWV369//f4xcj49wxzIOB/DnOiHLTVuDSzvWBMifZPJDU2WKy5y8iRDWBOO9aYci8fBceRxsucJeS9R9DFeaJhfjsvnrf61srhjuQxj6GWM+6cUVeLAEU+WFRLcXfitxcT9x42/WpaE2HPKspiSjybH4/7ji8yQH65LjVsDZzmW17yN8BR5ckei8KFpEVtxuCiWOOA43PT1Oj5+4+3Xe5jkYRMn8/Lh45p8XZ8jHiLjodL51c5ZjiVNlhDcLBcuR1y6SF8+OWTGA03RhNh8vI8fcQTPOTxa+bB49G/0g/ON4nXGteLXyizH6pcVZ5L1K3JOXIv8dsQiTo0LspiE+OTA3+GsTxrymzf4/FD1LaPoPD6LrB9nEJF+y0R+yHfu/ZdilmPh5kyGtyNMuLUnsjgZT6j2QrF4IBeRN/D34Zwu8lR8LSZs9FMc2hKRd17HEb5G4tfO2V/ev1DZ91Jx4YRYJrw4LBY+jv767Q/0+sl57CmtL+Cj6ALRj8Wi87MIR+R+fUyjxe6/Ni7nWOHGseEUZ+B+s+IN5O9cur8nCo4/9Z1Mn+d4Qi3qk/7D/fL1evwYR0emxvH4uHX/NTPdscKNYWOtbVvIX9Ct/h5RPP0FHMSyM+6NqPjyOxYfzqL3MD0HcXB89JPzXGTup4sv8xHLw+NJPkSZF2v81LilOe+tcBDPOBkkOmsj7LG/jp5avVHFeLli8uKfLIckKhzX/a3xOQ8tei8Pj7hPi9ppefzU+CWZvccy/6thaHPe3uR66/sYFzH17cti34/EpZv3t0Ie39pj6fxieXjUcUGIWi/D0m8PIpu1xxqdi5q1PKbG6xkKzMWSmHrDHYunqfMRiojNPVNoPD6OW29nQjiK/K2Q++UUW4/PxMMW+1vknHG3YLJjrUVdzNR+S9EbfyzyhNt5/39WqtilxrWY5VhL0SvmVkwdfxRXcDjsIdGs5dGKw8Xe8n553JTrl+ZmjlVicpmlxwc5j62KvvV4wlUdq3QxS4+fwq2LvtV4iztW6WKWHv8cctG3yJ/HS7k+h4s4Vulilh5/LW55X0uLbLZjlS5m6fG35pb3uYTIirwVzuW1iakGzhVZ8e9YMTYx1cMckVXpWE1M9TMmsioci5NsYtofLZEVcywrmcb9E3Xd1LGamK6HqztWE9N1chXHamJqXMyxmpgamWc5VhNTo8dsx2piakxh9V/eG/fJKr+8N+6fzbEaV+Ch+wdKkhv05CZKMwAAAABJRU5ErkJggg==",
}


export const mockUserSession:UserSession =   {
  sessionId:'cb3d7916307b7713875d7cf0fd9639e4a5qddt$oRi2A',
}


export const mockPageGroup:PageGroup[] = [
  {
    id: 0,
    title: 'اطلاعات پایه',
    icon: 'pi pi-info-circle',
    processes: [
      {
        title: 'رانندگان ، کامیونداران',
        name: 'DriversAndTruckDrivers',
        description: 'مدیریت اطلاعات رانندگان و کامیونداران فعال در سامانه.',
        icon: 'pi pi-users',
      },
      {
        title: 'خودرو ، ناوگان حمل',
        name: 'CarsAndTrucks',
        description: 'ثبت و مدیریت وسایل نقلیه ناوگان حمل و نقل.',
        icon: 'pi pi-truck',
      },
      {
        title: 'شرکت های حمل و نقل',
        name: 'TransportCompanies',
        description: 'مدیریت شرکت‌های حمل و نقل و اطلاعات مجوزهای آن‌ها.',
        icon: 'pi pi-briefcase',
      },
      {
        title: 'صنوف',
        name: 'Associatons',
        description: 'ثبت و سازماندهی صنوف مرتبط با حمل و نقل و باربری.',
        icon: 'pi pi-building',
      },
      {
        title: 'صاحبین بار',
        name: 'BarOwner',
        description: 'مدیریت اطلاعات صاحبان بار و بارهای ثبت شده.',
        icon: 'pi pi-id-card',
      },
      {
        title: 'کارخانجات و مراکز تولید',
        name: 'Manufactures',
        description: 'اطلاعات مربوط به تولیدکنندگان و مراکز صنعتی مرتبط.',
        icon: 'pi pi-industry',
      },
      {
        title: 'مبادی و مقاصد حمل',
        name: 'LoadingDischargingLocations',
        description: 'تعریف و مدیریت مبادی بارگیری و مقاصد تخلیه بار.',
        icon: 'pi pi-map-marker',
      },
    ],
  },
  {
    id: 1,
    title: 'کیف پول',
    icon: 'pi pi-wallet',
    processes: [
      {
        title: 'لیست تراکنش‌ها',
        name: 'TransactionList',
        description: 'مشاهده تراکنش‌های مالی.',
        icon: 'pi pi-list',
      },
      {
        title: 'افزایش موجودی',
        name: 'TopUp',
        description: 'شارژ کیف پول.',
        icon: 'pi pi-plus-circle',
      },
    ],
  },
  {
    id: 2,
    title: 'سفارشات',
    icon: 'pi pi-shopping-cart',
    processes: [
      {
        title: 'لیست سفارشات',
        name: 'OrderList',
        description: 'مدیریت و بررسی سفارش‌های ثبت‌شده.',
        icon: 'pi pi-list',
      },
      {
        title: 'جزئیات سفارش',
        name: 'OrderDetails',
        description: 'نمایش و بررسی جزئیات سفارش.',
        icon: 'pi pi-eye',
      },
    ],
  },
  {
    id: 3,
    title: 'گزارشات',
    icon: 'pi pi-chart-line',
    processes: [
      {
        title: 'گزارش مالی',
        name: 'FinancialReports',
        description: 'گزارش‌های مربوط به وضعیت مالی و تراکنش‌ها.',
        icon: 'pi pi-chart-bar',
      },
      {
        title: 'گزارش سفارشات',
        name: 'OrderReports',
        description: 'تحلیل و بررسی سفارشات ثبت شده.',
        icon: 'pi pi-chart-pie',
      },
    ],
  },
  {
    id: 4,
    title: 'مدیریت کاربران',
    icon: 'pi pi-users',
    processes: [
      {
        title: 'لیست کاربران',
        name: 'UserList',
        description: 'مدیریت و مشاهده لیست کاربران سامانه.',
        icon: 'pi pi-user',
      },
      {
        title: 'نقش‌ها و دسترسی‌ها',
        name: 'RolesAndPermissions',
        description: 'تنظیم نقش‌ها و سطح دسترسی کاربران.',
        icon: 'pi pi-lock',
      },
    ],
  },
  {
    id: 5,
    title: 'تنظیمات',
    icon: 'pi pi-cog',
    processes: [
      {
        title: 'تنظیمات عمومی',
        name: 'GeneralSettings',
        description: 'پیکربندی تنظیمات عمومی سامانه.',
        icon: 'pi pi-cog',
      },
      {
        title: 'اطلاع‌رسانی',
        name: 'NotificationSettings',
        description: 'تنظیمات پیامک‌ها، ایمیل‌ها و اعلان‌ها.',
        icon: 'pi pi-bell',
      },
    ],
  },
];