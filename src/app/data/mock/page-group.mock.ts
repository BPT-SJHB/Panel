import { PageGroup } from "app/data/model/page-group.model";

export const mockPageGroup: PageGroup[] = [
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
