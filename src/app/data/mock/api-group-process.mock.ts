import { ApiGroupProcess } from '../model/api-group-process.model';

export const mockApiGroupProcess: ApiGroupProcess[] = [
  {
    PGId: 0,
    PGTitle: 'اطلاعات پایه',
    PGIconName: 'pi-address-book',
    WebProcesses: [
      {
        PId: 0,
        PTitle: 'مدیریت کاربران',
        PName: 'UsersManagement',
        Description:
          'مدیریت کاربر شامل ایجاد، ویرایش، حذف، و تعیین دسترسی‌های کاربران می‌ شود.از طریق این منو می توانید فرآیند فعال سازی پکیج اس ام اس کاربر را نیز انجام دهید و نیز می توانید کاربر را غیر فعال نمایید',
        PIconName: 'pi-user',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 1,
        PTitle: 'راننده و ناوگان حمل',
        PName: 'DriversAndTrucks',
        Description:
          'امکان استعلام و ثبت اطلاعات راننده از طریق کد ملی و ناوگان از طریق شماره هوشمند فراهم می باشد.استعلام کد ملی و هوشمند از درگاه سازمان راهداری موجب ویرایش اطلاعت راننده و ناوگان در سامانه می گردد.پس از ثبت اطلاعات ، مجوزهای دسترسی به صورت خودکار ایجاد می گردد',
        PIconName: 'pi-id-card',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 2,
        PTitle: 'کاروسل ها',
        PName: 'Carousels',
        Description:
          'کاروسل ها درواقع تصاویر متحرک در قسمت بالایی صفحه اصلی سایت هستند.امکان ویرایش ، اضافه و حذف کاروسل ها از طریق این منو صورت می گیرد',
        PIconName: 'pi-truck',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 3,
        PTitle: 'شرکت های حمل و نقل',
        PName: 'TransportCompanies',
        Description:
          'از طریق این منو امکان مشاهده لیست شرکت های حمل و نقل بار یا شرکت های باربری وجود دارد.امکان تغییر عناوین وجود ندارد.برای ارتباط سامانه با شرکت شماره همراه مدیر عامل الزامی است',
        PIconName: 'pi-warehouse',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 4,
        PTitle: 'صفوف نوبت دهی',
        PName: 'SequentialTurns',
        Description:
          'امکان ثبت و ویرایش صفوف نوبت از طریق این واسط فراهم شده است.تغییر در صفوف نوبت ممکن است در آینده موجب اختلالاتی در سامانه گردد لذا انتخاب درست صفوف هنگام استقرار سامانه از مشکلات آتی جلوگیری خواهد کرد',
        PIconName: 'pi-users',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 5,
        PTitle: 'صاحبین بار',
        PName: 'BarOwners',
        Description:
          'موجودیت صاحب بار در این سامانه به منظور ردیابی محموله ، یکپارچگی در اطلاع رسانی های صورت گرفته و ایجاد ارتباط هماهنگ بین شرکت حمل و نقل ، راننده و صاحب بار است',
        PIconName: 'pi-box',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 6,
        PTitle: 'کارخانجات و مراکز تولید بار',
        PName: 'Manufactures',
        Description:
          'امکان اعلام بار یکپارچه و خودکار تولیدات مراکز تولید و کارخانجات تولیدی در سامانه وجود دارد.از طریق این منو مدیریت اطلاعات مراکز مذکور ، ردیابی بارهای اعلام شده و مشاهده اطلاعات دفاتر مرکزی وجود دارد',
        PIconName: 'pi-hammer',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 7,
        PTitle: 'مبادی و مقاصد حمل بار',
        PName: 'LoadingDischargingLocations',
        Description:
          'مبادی و مقاصد حمل شامل انبارها ، پروژه ها ، تعلقات صاحبین بار ، کارخانجات ، مراکز دپوی بار و ... می باشد.امکان کنترل وضعیت بارگیری و تخلیه مبادی و مقاصد حمل از طریق این منو امکان پذیر است',
        PIconName: 'pi-map-marker',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 8,
        PTitle: 'استان ها ، شهرها',
        PName: 'ProvincesCities',
        Description:
          'از طریق این واسط امکان مشاهده لیست استان ها و شهرها همراه با کدینگ سازمان راهداری وجود دارد.کدینگ مذکور قابل تغییر نیست و به صورت خودکار و در صورت نیاز به روز رسانی می گردد.',
        PIconName: 'pi-map-marker',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 9,
        PTitle: 'کالا',
        PName: 'Goods',
        Description:
          'کدینگ کالا تعیین شده توسط سازمان راهداری از طریق این واسط قابل مشاهده است.قابل ذکر است کدینگ مذکور قابل تغییر نیست و به صورت خودکار و در صورت نیاز بروز رسانی می گردد',
        PIconName: 'pi-box',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 10,
        PTitle: 'مشخصات ناوگان و راننده',
        PName: 'TruckAndDriverInformation',
        Description:
          'امکان مشاهده مشخصات راننده فعال شامل نام و نام خانوادگی ، اطلاعات شناسنامه ای و شماره هوشمند از طریق این واسط فراهم است.قبل از هر گونه فعالیت در سامانه از صحت اطلاعات اطمینان یابید',
        PIconName: 'pi-id-card',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 11,
        PTitle: 'گروه ها و زیرگروه های اعلام بار',
        PName: 'Announcements',
        Description:
          'اعلام بار بر اساس گروه ها  و زیرگروه های اعلام بار صورت می گیرد.کالای حمل اساسا در یک زیرگروه اعلام بار دسته بندی می شود .امکان اعلام بار برای یک کالا در یک زیرگروه غیر مرتبط امکان پذیر نیست',
        PIconName: 'pi-truck',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 12,
        PTitle: 'بارگیرها',
        PName: 'Loaders',
        Description:
          'از طریق این واسط می توانید کدینگ استاندارد بارگیرها وضع شده توسط سازمان راهداری را مشاهده نمایید.قابل ذکر است تغییر این کدینگ امکان پذیر نیست و در صورت نیاز به صورت خودکار بروز رسانی می گردند',
        PIconName: 'pi-cart-arrow-down',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 13,
        PTitle: 'ناوگان ملکی',
        PName: 'CorporateTrucks',
        Description:
          'از طریق این واسط می توانید لیست ناوگان ملکی متعلق به شرکت حمل و نقل را مشاهده و در صورت نیاز تغییراتی را لحاظ نمایید',
        PIconName: 'pi-warehouse',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 14,
        PTitle: 'مدت سفر',
        PName: 'TravelDurations',
        Description:
          'فاصله مبدا بارگیری تا مقصد تخلیه بار به عنوان مدت سفر در نظر گرفته می شود.از طریق این واسط می توانید تغییراتی را به مدت سفر که در واحد ساعت می باشد لحاظ نمایید',
        PIconName: 'pi-stopwatch',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 22,
        PTitle: 'پروفایل کاربر',
        PName: 'SoftwareUserProfile',
        Description:
          'از طریق این واسط امکان مشاهده مشخصات کاربری وجود دارد.همچنین امکان بروز رسانی رمز عبور و فعال سازی اس ام اس کاربر نیز فراهم شده است',
        PIconName: 'pi-list',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 44,
        PTitle: 'خود اظهاری رانندگان و کامیونداران',
        PName: 'DriverSelfDeclaration',
        Description:
          'به منظور تدوین و تکمیل و اصلاح قواعد حمل نتایج خوداظهاری راننده به کارگرفته می شود.در فرآیند خود اظهاری صریحا شرایط ناوگان مثل طول و عرض و تعداد محور و وزن خالی بارگیر را لحاظ می شود',
        PIconName: 'pi-exclamation-circle',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 53,
        PTitle: 'تعرفه های حمل بار',
        PName: 'TransportPrices',
        Description:
          'مدیر سیستم از طریق این منو می تواند تعرفه های حمل بار را مدیریت نماید.افزایش مبلغ تعرفه به صورت گروهی و یا تکی مبنی بر مبدا و مقصد حمل صورت می گیرد',
        PIconName: 'pi-objects-column',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 1,
    PGTitle: 'پارکینگ و تردد',
    PGIconName: 'pi-stop',
    WebProcesses: [
      {
        PId: 15,
        PTitle: 'ثبت تردد',
        PName: 'Terrafic',
        Description:
          'تردد و توقف خودرو در پارکینگ از طریق فرآیند پلاک خوانی و کارت تردد که از نوع آر اف می باشد صورت می گیرد.هزینه ها به صورت خودکار محاسبه می شوند و راننده خودرو موظف است قبل از خروج اقدام به تسویه نماید',
        PIconName: 'pi-list-check',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 16,
        PTitle: 'ثبت و ویرایش انواع کارت تردد',
        PName: 'TrafficCardTypes',
        Description:
          'انواع کارت تردد بر مبنای نوع خودرو ، گیت تردد و احکام سازمانی معین می شود.هر نوع کارت تردد هزینه های مرتبط به خود را دارد که از طریق منوی هزینه های تردد و توقف مدیریت می شود',
        PIconName: 'pi-id-card',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 17,
        PTitle: 'گیت های تردد',
        PName: 'TrafficGates',
        Description:
          'امکان ثبت ، ویرایش و یا غیر فعال سازی گیت های تردد از طریق این واسط فراهم شده است.',
        PIconName: 'pi-bars',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 18,
        PTitle: 'هزینه های تردد و توقف',
        PName: 'TrafficCosts',
        Description:
          'از طریق این واسط مدیریت هزینه های پایه ترددو توقف بر مبنای نوع کارت تردد فراهم شده اس.امکان افزایش سالانه هزینه ها نیز با ثبت رکورد هزینه جدید وجد دارد',
        PIconName: 'pi-receipt',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 20,
        PTitle: 'خروج اضطراری',
        PName: 'EmergencyExit',
        Description:
          'در شرایط خاص امکان خروج سیستمی خودرو وجود ندارد.هنگامی که راننده کارت تردد خود را گم می کند می بایست ابتدا خودرو به صورت اضطراری خروج شده و سپس یک کارت تردد جدید به راننده تحویل گردد',
        PIconName: 'pi-refresh',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 24,
        PTitle: 'ویرایش اطلاعات کارت تردد',
        PName: 'TrafficCardEditing',
        Description:
          'مبنی بر دارنده کارت تردد ممکن است اطلاعات شاخص کارت تردد تغییر نماید که شامل مشخصات دارنده کارت تردد ونوع کارت تردد است',
        PIconName: 'pi-user-plus',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 34,
        PTitle: 'ثبت اولیه کارت تردد',
        PName: 'TrafficCardRegistering',
        Description:
          'کارت های تردد ابتدا به ساکن خام می باشند و از لحاظ سامانه غیرمجاز هستند.از طریق این واسط کارت تردد ثبت و فعال می گردد',
        PIconName: 'pi-file-check',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 2,
    PGTitle: 'ناوگان باری و نوبت دهی',
    PGIconName: 'pi-list',
    WebProcesses: [
      {
        PId: 19,
        PTitle: 'نوبت دهی',
        PName: 'TurnIssue',
        Description:
          'نوبت دهی ناوگان حمل بر مبنای قواعد سازمانی و صنفی صورت می گیرد.قبل از صدور وبت جدید می بایستمدت سفر ناوگان مبنی بر آخرین بار دریافت شده سپری شده باشد',
        PIconName: 'pi-check',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 21,
        PTitle: 'لیست نوبت های صادر شده',
        PName: 'TruckTurnsIssued',
        Description:
          'از طریق این واسط راننده امکان مشاهده لیست نوبت های صادر شده را دارد.امکان ارسال درخواست ابطال نوبت نیز از این واسط وجود دارد',
        PIconName: 'pi-file',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 23,
        PTitle: 'درخواست صدور نوبت',
        PName: 'TruckDriver-TurnIssueRequest',
        Description:
          'از طریق این واسط امکان انتخاب و دریافت نوبت مجازی بر مبنای صف نوبت انتخابی وجود دارد.موجودی کیف پول می بایست کافی باشد',
        PIconName: 'pi-globe',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 3,
    PGTitle: 'کیف پول',
    PGIconName: 'pi-wallet',
    WebProcesses: [
      {
        PId: 25,
        PTitle: 'عملکرد شارژ کاربر',
        PName: 'SoftwareUserChargingFunction',
        Description:
          'هر کاربر ممکن است بر اساس مجوزهای موجود در سامانه اقدام به شارژ کیف پول نماید.از طریق این واسط مکان مشاهده عملکرد شارژ فراهم شده است',
        PIconName: 'pi-cog',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 26,
        PTitle: 'کیف پول کنترلی اس ام اس',
        PName: 'SMSControllingMoneyWallet',
        Description:
          'امکان شارژ و مشاهده تراکنش های کیف پول کنترلی اس ام اس از طریق این واسط فراهم شده است',
        PIconName: 'pi-arrow-right-arrow-left',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 27,
        PTitle: 'کیف پول کاربر',
        PName: 'SoftwareUserMoneyWalletCharging',
        Description:
          'از طریق این واسط امکان شارژ ، مشاهده سوابق شارژ و تراکنش های کیف پول کاربر فراهم شده است',
        PIconName: 'pi-download',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 28,
        PTitle: 'انتقال موجودی کیف پول',
        PName: 'TransferMoneyWalletBalance',
        Description:
          'کارت های آر اف در واقع نقش کیف پول را نیز دارند و با توجه به ماهیت شان امکان مفقودی و یا خرابی دارند.کاربر می تواند از طریق این منو موجودی کیف مفقود و یا خراب شده را به کیف پول دیگری انتقال دهد',
        PIconName: 'pi-file-export',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 29,
        PTitle: 'کیف پول ناوگان',
        PName: 'TruckMoneyWalletCharging',
        Description:
          'از طریق این واسط امکان شارژ ، مشاهده سوابق شارژ و تراکنش های کیف پول ناوگان حمل فراهم شده است.ابتدا ناوگان مورد نظر انتخاب و سپس اقدام به شارژ نمایید',
        PIconName: 'pi-truck',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 30,
        PTitle: 'کیف پول شرکت حمل و نقل',
        PName: 'TransportCompanyMoneyWalletCharging',
        Description:
          'از طریق این واسط امکان شارژ ، مشاهده سوابق شارژ و تراکنش های کیف پول شرکت حمل و نقل فراهم شده است.ابتدا شرکت مورد نظر انتخاب و سپس اقدام به شارژ نمایید',
        PIconName: 'pi-warehouse',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 31,
        PTitle: 'کیف پول کنترلی کامیونداران',
        PName: 'TruckersAssociationControllingMoneyWallet',
        Description:
          'مطابق قواعد سازمانی و صنفی هزینه نوبت متعلق به صنوف است.از طریق این منو امکان ردیابی و شارژ کیف پول مذکور وجود دارد.کیف پول مذکور یک کیف پول کنترلی و درون سیستمی است',
        PIconName: 'pi-users',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 4,
    PGTitle: 'اطلاع رسانی و اعلام بار',
    PGIconName: 'pi-folder-open',
    WebProcesses: [
      {
        PId: 32,
        PTitle: 'اعلام بار شرکت حمل و نقل',
        PName: 'TCLoadAnnouncement',
        Description:
          'شرکت های حمل و نقل می توانند با استفاده از این منو اقدام به اعلام بار نماید.بار شامل نوع بار،مبدا،مقصد،تناژ ، تعداد بار،مبا و مقصد حمل و تعرفه حمل است.تعرفه حمل به صورت خودکار و با احتساب تن کیلومتر محاسبه می گردد',
        PIconName: 'pi-warehouse',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 33,
        PTitle: 'اعلام بار کارخانجات و مراکز تولید بار',
        PName: 'FactoryLoadAnnouncement',
        Description:
          'کارخانجات و مراکز تولید بار می توانند با استفاده از این منو اقدام به اعلام بار نماید.بار شامل نوع بار،مبدا،مقصد،تناژ ، تعداد بار،مبا و مقصد حمل و تعرفه حمل است.تعرفه حمل به صورت خودکار و با احتساب تن کیلومتر محاسبه می گردد',
        PIconName: 'pi-hammer',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 37,
        PTitle: 'مشاهده و انتخاب بار',
        PName: 'DriverLoadAllocation',
        Description:
          'زمان بندی اعلام بار از طریق منوی پشتیبانی سامانه قابل مشاهده است و راننده می تواند مطابق زمانبندی وارد این منو شده و بار خود را انتخاب نموده و تخصیص دهد.تعداد بار انتخاب شده محدودیت هایی خواهد داشت',
        PIconName: 'pi-user-edit',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 39,
        PTitle: 'مدیریت بار ، تخصیص بار و مجوزهای صادر شده',
        PName: 'LoadRegisteringEditing',
        Description:
          'امکان مدیریت اطلاعات بار اعلام شده در سامانه شامل هرگونه اصلاحات و یا کنسلی و حذف بار توسط کاربر پشتیبان سامانه از طریق این منو قابل انجام است',
        PIconName: 'pi-pen-to-square',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 40,
        PTitle: 'ثبت درخواست حمل صاحبین کالا',
        PName: 'BarOwnerTransportationRequest',
        Description:
          'اعلام بار و ثبت درخواست حمل بار از طرف صاحب بار که ماهیت شرکت حمل و نقل و یا مراکز و کارخانجات تولید را ندارد از طریق این منو صورت می گیرد',
        PIconName: 'pi-verified',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 5,
    PGTitle: 'مدیریت سیستم',
    PGIconName: 'pi-cog',
    WebProcesses: [
      {
        PId: 36,
        PTitle: 'مدیریت دیوایس',
        PName: 'DeviceManagement',
        Description:
          'از طریق این واسط امکان مدیریت دیوایس ها از قبیل دوربین ها ، کارت خوان ها ، دستگاه های پوز فروشگاهی و ... فراهم شده است.دیوایس ها نهایتا از طریق واسط پیکربندی دیوایس ها قابل برنامه ریزی و پیکربندی خواهند بود.',
        PIconName: 'pi-warehouse',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 48,
        PTitle: 'تقویم حمل و نقلی',
        PName: 'TransportationCalendar',
        Description:
          'همزمان با ارائه تقویم شمسی در این واسط تنظیماتی برای شرایط احتمالی حمل و نقلی در این واسط ارائه شده است .اعلام بار در روزهای تعطیل و یا ابطال نوبت ها و رسوب بار و قواعدی از این نمونه از طریق این تقویم منترل می شوند',
        PIconName: 'pi-calendar-clock',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 50,
        PTitle: 'لیست سیاه',
        PName: 'BlackLists',
        Description:
          'لیست سیاه شامل ایجاد محدودیت هایی برای  آبجکت های موجود و فعال در سامانه است.راننده ، شرکت حمل و نقل ، خودرو ، کاربر و حتی مبادی و مقاصد حمل بار جزو آبچکت های مورد نظر هستند',
        PIconName: 'pi-ban',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 51,
        PTitle: 'مشاهده وقایع',
        PName: 'SystemLoggingView',
        Description:
          'کلیه وقایع که سامانه در تعامل با آبجکت های فعال دارد در مخزن لاگ سیستم ثبت می شوند.از طریق این منو امکان مشاهده و ردیابی کلیه وقایع موجود امکان پذیر است',
        PIconName: 'pi-calendar-plus',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 70,
        PTitle: 'اس ام اس انبوه',
        PName: 'BulkSMSSending',
        Description:
          'امکان تنظیم و ارسال اس ام اس شامل اطلاع رسانی های سازمانی و یا صنفی در حوزه حمل و نقل و یا اطلاع رسانی از طرف پشتیبانی سامانه در حوزه شرایط احتمالی سامانه از طریق این واسط وجود دارد',
        PIconName: 'pi-envelope',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 6,
    PGTitle: 'گزارشات',
    PGIconName: 'pi-copy',
    WebProcesses: [
      {
        PId: 35,
        PTitle: 'مجوزهای صادر شده اخیر شرکت حمل و نقل',
        PName: 'LastLoadPermissions',
        Description:
          'ازطریق این واسط امکان مشاهده مجوزهای بارگیری صادر شده اخیر وجود دارد',
        PIconName: 'pi-inbox',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 54,
        PTitle: 'گزارش نوبت ها',
        PName: 'TurnsReport',
        Description:
          'این گزارش لیست کاملی از نوبت های صادر شده اخیر و نوبت های عیر فعال را ارائه می دهد.خواب ناوگان دارای نوبت نیز در این گزارش لحاظ گردیده است',
        PIconName: 'pi-sort-amount-up',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 55,
        PTitle: 'گزارش تخصیص بار',
        PName: 'LoadAllocationsReport',
        Description:
          'سوابق کلیه تخصیص های صادر شده در سامانه در این گزارش موجود است.تخصیص ممکن است از طریق کاربر راننده و یا شرکت حمل و نقل و یا کاربر پشتیبان سامانه صورت گرفته باشد',
        PIconName: 'pi-list-check',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 56,
        PTitle: 'گزارش مجوزهای حمل صادر شده',
        PName: 'LoadTransportationPermissionsReport',
        Description:
          'در این گزارش لیست کامل مجوزهای صادر شده به تفکیک گروه اعلام بار و زیرگروه اعلام بار همراه با مشخصاتی از قبیل نوع بار و مبدا و مقصد حمل ارائه شده است',
        PIconName: 'pi-verified',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 57,
        PTitle: 'گزارش بارهای کنسل شده',
        PName: 'LoadAnnouncementCancellation',
        Description:
          'کنسلی بار با توجه به شرایط احتمالی حمل به وجود می آید.در این گزارش سوابق کنسلی بار و دلایل آن ارائه شده است',
        PIconName: 'pi-times-circle',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 58,
        PTitle: 'گزارش کلی عملکرد اعلام بار',
        PName: 'LoadAnnouncementOveralReport',
        Description:
          'این گزارش آماری از کلیه بارهای اعلام شده ، آزاد شده و رسوب شده به تفکیک گروه اعلام بار و زیر گروه اعلام بار ارائه می دهد',
        PIconName: 'pi-times-circle',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 59,
        PTitle: 'گزارش مجوزهای حمل بار کنسل شده',
        PName: 'LoadTransportationPermissionCancellationsReport',
        Description:
          'کنسلی مجوز حمل با توجه به شرایط احتمالی حمل به وجود می آید.در این گزارش سوابق کنسلی مجوز حمل و دلایل آن ارائه شده است',
        PIconName: 'pi-stop-circle',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 60,
        PTitle: 'گزارشات مالی پارکینگ',
        PName: 'ParkingAccountingReport',
        Description:
          'با توجه به وجود زیر سیستم حسابداری توکار و لذا ثبت کلیه تراکنش های مالی و بخصوص تراکنش های مرتبط با تردد و توقف خودرو امکان ارائه گزارشی بر پایه پارکینگ ارائه شده است',
        PIconName: 'pi-money-bill',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 61,
        PTitle: 'درآمدهای حاصل از نوبت دهی',
        PName: 'TurnAccountingReport',
        Description:
          'این گزارش با توجه به تراکنش های مالی مرتبط با فرآیند نوبت دهی لیستی از تراکنش های مذکور را در قالب درآمد حاصل از نوبت دهی ارائه می دهد',
        PIconName: 'pi-chart-line',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 62,
        PTitle: 'گزارش بارنامه های صادر شده',
        PName: 'BillOfLadingsReport',
        Description:
          'مجوز حمل پس از صدور وارد فرآیند صدور بارنامه می گردد.اطلاعات بارنامه های صادر شده پس از صدور در سامانه ذخیره می گردند.در این گزارش لیست بارنامه های صادر شده ارائه شده است',
        PIconName: 'pi-chart-scatter',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 64,
        PTitle: 'گزارش ابطالی بر اساس بارنامه',
        PName: 'BillOfLadingTurnCancellationReport',
        Description:
          'با توجه به قواعد موجود صنفی مبنی بر ابطال نوبت های فعالی که پس از صدور آن ها بارنامه صادر شده است گزارش حاضر لیستی از نوبت های مذکور را ارائه می دهد',
        PIconName: 'pi-receipt',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 65,
        PTitle: 'گزارش ابطالی نوبت ها',
        PName: 'TurnCancellationsReport',
        Description:
          'با توجه به قواعد صنفی نوبت های رسوب شده می بایست در پایان هر روز ابطال گردند.گزارش حاضر عملکردی از فرآیند باطلی گروهی نوبت ها را ارئه می دهد',
        PIconName: 'pi-sort-amount-up',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 66,
        PTitle: 'گزارش بار',
        PName: 'LoadAnnouncementsReport',
        Description:
          'گزارش کاملی از مشخصات و آمار بار اعلام شده به تفکیک گروه و زیرگروه اعلام بار و کاربر ثبت بار در این گزارش ارائه شده است',
        PIconName: 'pi-chart-bar',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 67,
        PTitle: 'رانندگان منتظر دریافت مجوز بارگیری',
        PName: 'DriversWhoWaitToLoadingPermissionReport',
        Description:
          'لیست کامل نوبت های فعال موجود در سامانه همراه با مشخصات راننده و ناوگان دارای نوبت در این گزارش ارائه شده است',
        PIconName: 'pi-user',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 7,
    PGTitle: 'پشتیبانی',
    PGIconName: 'pi-desktop',
    WebProcesses: [
      {
        PId: 71,
        PTitle: 'مدیریت تیکت',
        PName: 'TicketingManage',
        Description:
          'کاربران پشتیبان سامانه از طریق این منو تیکت های ارسالی کاربران را پایش و اقدام به ارائه راه حل و پاسخ مطلوب می نمایند',
        PIconName: 'pi-headphones',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
  {
    PGId: 8,
    PGTitle: 'تنظیمات',
    PGIconName: 'pi-desktop',
    WebProcesses: [
      {
        PId: 45,
        PTitle: 'پیکربندی عمومی سیستم',
        PName: 'GeneralConfiguration',
        Description:
          'مدیر سیستم می تواند از طریق این منو اقدام به تغییر تنظیمات عمومی سیستم مثل رنگ ، فونت و یا حتی قواعد عمومی حمل نماید.فعالیت در این واسط نیاز به اطلاعات تخصصی در سامانه دارد',
        PIconName: 'pi-table',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 46,
        PTitle: 'پیکربندی اعلام بار',
        PName: 'LoadAnnouncementConfiguration',
        Description:
          'بارهای اعلام شده در گروههای اعلام بار و زیرگروه های اعلام بار دسته بندی می شوند.تنظیمات ساعات اعلام بار ، قواعد رسوب بار و زمانبندی های هر فرآیند مختص گروه ها و زیرگروه های بار از طریق این منو صورت می گیرد',
        PIconName: 'pi-sitemap',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 47,
        PTitle: 'پیکربندی تجهیزات و دیوایس ها',
        PName: 'ComponentConfiguration',
        Description:
          'تجهیزاتی مثل دوربین پلاک خوان ، دستگاههای پوز ، دستگاههای کارت خوان آر اف ، دستگاههای اثر انگشت و ... که به صورت فیزیکی به سامانه متصل می باشند مشمول تنظیماتی هستند تا هنگام اجرا عملکرد مطلوبی ارائه دهند',
        PIconName: 'pi-th-large',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 69,
        PTitle: 'پارامترهای موثر در تعرفه حمل بار',
        PName: 'TransportTarrifParameters',
        Description:
          'بر اساس نوع بار و مبنی بر تعرفه حمل بار تعیین شده از طرف سازمان راهداری و شرایط حمل بار ممکن است هزینه حمل بار بیش از تعرفه وضع شده مذکور باشد لذا با ایجاد پارامترهایی می توانیم هزینه حمل را با دقت بیشتری تعیین نماییم',
        PIconName: 'pi-headphones',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
      {
        PId: 72,
        PTitle: 'شرایط مشاهده و انتخاب بار',
        PName: 'LoadViewAndAllocationConditions',
        Description:
          'شرایط مشاهده و انتخاب بار اساسا برای کلیه کاربران سامانه یکسان نیست.از طریق این واسط و مبنی بر پارامترهایی همچون گروه و زیرگروه اعلام بار ، صف نوبت ، وضعیت بار ، محل درخواست ، و یا وضعیت نوبت شرایط مشاهد و انتخاب بار برنامه ریزی می گردد',
        PIconName: 'pi-user-edit',
        ForeColor: 'Red',
        BackColor: 'Red',
      },
    ],
  },
];
