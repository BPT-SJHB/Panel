export type PlaceholderKey =
  //#region Global Inputs
  | 'globalIdPlaceholder'
  | 'globalTitlePlaceholder'
  | 'globalPhoneNumberPlaceholder'
  | 'globalAddressPlaceholder'
  | 'globalEmailPlaceholder'
  //#endregion
  //#region User
  | 'userPhoneNumberPlaceholder'
  | 'userNamePlaceholder'
  | 'userNationalCodePlaceholder'
  //#endregion
  | 'webProcessesPlaceholder'
  | 'driverSmartCardNumberPlaceholder'
  | 'truckSmartCardNumberPlaceholder'
  | 'truckLoader'
  | 'truckId'
  | 'nativenessPlaceholder'
  //#region Factories and production centers
  | 'factoriesOrProductionCenterTitle'
  | 'factoriesOrProductionCenterName'
  | 'factoriesOrProductionCenterOwnerName'
  | 'factoriesOrProductionCenterOwnerPhoneNumber'
  //#endregion
  | 'loadAnnouncementPlaceTitle'
  | 'provinceAndCitiesTitle'
  | 'productsTitle'
  | 'loadAnnouncementGroupTitle'
  | 'loadAnnouncementSubGroupTitle'
  | 'loadStatus'
  | 'startCity'
  | 'endCity'
  | 'transportCompanyTitle'
  | 'travelTimeDurationTitle'
  | 'transportCompanyOwnerPhoneNumber'
  | 'transportCompanyOwnerName'
  | 'sequentialTurnTitle'
  | 'loadType';

export class AppTitles {
  public static readonly appOnLineTitle =
    'سامانه جامع حمل و نقل کالا سازمان راهداری و حمل و نقل جاده ای';
  public static readonly appBrokenTitle =
    'سامانه جامع حمل و نقل کالا<br>سازمان راهداری و حمل و نقل جاده ای';
  public static readonly footerTitle =
    'کلیه حقوق این وبسایت متعلق به سازمان‌ راهداری و حمل و نقل جاده ای میباشد | نسخه فرانت-اند: 1.19.32 | نسخه بک-اند: 11.0.0 | طراحی و پیاده‌سازی توسط شرکت برسام پژوهش';

  public static readonly inputs = {
    global: {
      id: 'شناسه',
      title: 'عنوان',
      phoneNumber: 'شماره تلفن',
      address: 'آدرس',
      email: 'ایمیل',
    },
    phoneNumbers: {
      inputTitle: 'شماره موبایل',
    },
    users: {
      userIdTitle: 'شناسه کاربری',
      userNameTitle: 'نام کاربری',
      userTypesTitle: 'نوع کاربری',
      userNationalCodeTitle: 'شناسه ملی',
      userFatherName: 'نام پدر',
      userNameAndLastName: 'نام و نام‌خانوادگی',
    },
    webProcesses: {
      webProcessTitle: 'عنوان منو یا زیر‌منو',
    },
    drivers: {
      driverId: 'شناسه راننده',
      driverLicenseNumber: 'شماره گواهینامه',
      driverSmartCardNumber: 'شماره هوشمند',
    },
    trucks: {
      truckSmartCardNumber: 'شماره هوشمند',
      truckId: 'شناسه ناوگان',
      licensePlateNumber: 'پلاک ناوگان',
      licensePlateSerialNumber: 'شماره سریال',
      truckLoader: 'بارگیر',
    },
    nativenesses: {
      nativenessStatus: 'وضعیت بومی‌گری',
    },
    turns: {
      turnId: 'شناسه نوبت',
      turnTitle: 'شماره نوبت',
      turnStatus: 'وضعیت نوبت'
    },
    wallet: {
      walletId: 'شناسه کیف پول',
      walletTitle: 'کیف پول',
    },
    factoryAndProductionCenters: {
      factoriesOrProductionCenterTitle: 'عنوان کارخانه یا مرکز تولید',
      factoriesOrProductionCenterId: 'شناسه مرکز',
      factoriesOrProductionCenterName: 'عنوان مرکز',
      factoriesOrProductionCenterOwnerName: 'نام مدیر',
      factoriesOrProductionCenterOwnerPhoneNumber: 'موبایل مدیر',
    },
    loadAnnouncementPlaces: {
      loadAnnouncementPlaceTitle: 'عنوان مبدا یا مقصد حمل',
    },
    loadAnnouncements: {
      loadAnnouncementGroupTitle: 'گروه اعلام بار',
      loadAnnouncementSubGroupTitle: 'زیرگروه اعلام بار',
    },
    loads: {
      loadStatus: 'وضعیت نهایی بار',
      loadType: 'نوع بار',
    },
    provinceAndCities: {
      provinceAndCitiesTitle: 'نام استان یا شهر',
      startCity: 'شهر مبدا',
      endCity: 'شهر مقصد',
    },
    products: {
      productsTitle: 'نام کالا',
    },
    transportCompanies: {
      transportCompanyTitle: 'شرکت حمل و نقل',
      transportCompanyId: 'شناسه شرکت',
      transportCompanyName: 'عنوان شرکت',
      transportCompanyOrganizationId: 'شناسه سازمانی',
      transportCompanyLocation: 'شهر محل استقرار',
      transportCompanyOwnerPhoneNumber: 'موبایل مدیرعامل',
      transportCompanyOwnerName: 'نام مدیرعامل',
    },
    travelTime: {
      travelTimeDurationTitle: 'زمان سفر',
    },
    sequentialTurns: {
      sequentialTurnTitle: 'صف نوبت',
    },
  };

  public static readonly buttons = {
    search: 'جستجو',
    retrieveFromOutdoorSystem: 'استعلام',
    add: {
      addUser: 'اضافه کردن کاربر جدید',
      addRecord: 'رکورد جدید',
    },
    saveAndEdit: 'ثبت و ویرایش',
    activateSMS: 'فعال‌سازی پیامک',
    sendSystemLink: 'ارسال لینک سامانه',
    generateNewPassword: 'ایجاد رمز‌عبور جدید',
    changeNativenessStatus: 'تغییر وضعیت بومی‌گیری',
    createNewWallet: 'ساخت کیف پول جدید',
    seeLoads: 'مشاهده بار',
    allocateLoad: 'تخصیص بار',
    newTurnRequest: 'درخواست صدور نوبت',
  };

  public static readonly toggleSwitches = {
    status: 'وضعیت',
    smsStatus: 'وضعیت پیامک',
    userStatus: 'وضعیت کاربر',
    factoryOrProductionCenterStatus: 'وضعیت مرکز',
    loadingStatus: 'وضعیت مبدا بارگیری',
    dischargingStatus: 'وضعیت مقصد تخلیه',
  };

  public static readonly sectionTitles = {
    truckInfo: 'اطلاعات ناوگان',
    nativenessInfo: 'بومی گری',
    driverInfo:'اطلاعات راننده'
  };

  public static readonly datePicker = {
    endDate: 'تاریخ اتمام',
  };

  public static getPlaceholder(
    key: PlaceholderKey,
    suffix = ' را وارد کنید'
  ): string {
    let placeholderValue: string;

    switch (key) {
      //#region Global Inputs
      case 'globalIdPlaceholder':
        placeholderValue = this.inputs.global.id;
        break;
      case 'globalTitlePlaceholder':
        placeholderValue = this.inputs.global.title;
        break;
      case 'globalPhoneNumberPlaceholder':
        placeholderValue = this.inputs.global.phoneNumber;
        break;
      case 'globalAddressPlaceholder':
        placeholderValue = this.inputs.global.address;
        break;
      case 'globalEmailPlaceholder':
        placeholderValue = this.inputs.global.email;
        break;
      //#endregion

      //#region User
      case 'userPhoneNumberPlaceholder':
        placeholderValue = this.inputs.phoneNumbers.inputTitle;
        break;
      case 'userNamePlaceholder':
        placeholderValue = this.inputs.users.userNameTitle;
        break;
      case 'userNationalCodePlaceholder':
        placeholderValue = this.inputs.users.userNationalCodeTitle;
        break;
      //#endregion

      case 'webProcessesPlaceholder':
        placeholderValue = this.inputs.webProcesses.webProcessTitle;
        break;

      case 'driverSmartCardNumberPlaceholder':
        placeholderValue = this.inputs.drivers.driverSmartCardNumber;
        break;

      case 'truckSmartCardNumberPlaceholder':
        placeholderValue = this.inputs.trucks.truckSmartCardNumber;
        break;

      case 'truckLoader':
        placeholderValue = this.inputs.trucks.truckLoader;
        break;

      case 'truckId':
        placeholderValue = this.inputs.trucks.truckId;
        break;

      case 'nativenessPlaceholder':
        placeholderValue = this.inputs.nativenesses.nativenessStatus;
        break;

      //#region Factories and production centers
      case 'factoriesOrProductionCenterTitle':
        placeholderValue =
          this.inputs.factoryAndProductionCenters
            .factoriesOrProductionCenterTitle;
        break;
      case 'factoriesOrProductionCenterName':
        placeholderValue =
          this.inputs.factoryAndProductionCenters
            .factoriesOrProductionCenterName;
        break;
      case 'factoriesOrProductionCenterOwnerName':
        placeholderValue =
          this.inputs.factoryAndProductionCenters
            .factoriesOrProductionCenterOwnerName;
        break;
      case 'factoriesOrProductionCenterOwnerPhoneNumber':
        placeholderValue =
          this.inputs.factoryAndProductionCenters
            .factoriesOrProductionCenterOwnerPhoneNumber;
        break;
      //#endregion

      case 'loadAnnouncementPlaceTitle':
        placeholderValue =
          this.inputs.loadAnnouncementPlaces.loadAnnouncementPlaceTitle;
        break;

      case 'loadAnnouncementGroupTitle':
        placeholderValue =
          this.inputs.loadAnnouncements.loadAnnouncementGroupTitle;
        break;

      case 'loadAnnouncementSubGroupTitle':
        placeholderValue =
          this.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle;
        break;

      case 'loadStatus':
        placeholderValue = this.inputs.loads.loadStatus;
        break;

      case 'provinceAndCitiesTitle':
        placeholderValue = this.inputs.provinceAndCities.provinceAndCitiesTitle;
        break;

      case 'productsTitle':
        placeholderValue = this.inputs.products.productsTitle;
        break;

      case 'startCity':
        placeholderValue = this.inputs.provinceAndCities.startCity;
        break;

      case 'endCity':
        placeholderValue = this.inputs.provinceAndCities.endCity;
        break;

      case 'transportCompanyTitle':
        placeholderValue = this.inputs.transportCompanies.transportCompanyTitle;
        break;

      case 'travelTimeDurationTitle':
        placeholderValue = this.inputs.travelTime.travelTimeDurationTitle;
        break;

      case 'transportCompanyOwnerPhoneNumber':
        placeholderValue =
          this.inputs.transportCompanies.transportCompanyOwnerPhoneNumber;
        break;

      case 'transportCompanyOwnerName':
        placeholderValue =
          this.inputs.transportCompanies.transportCompanyOwnerName;
        break;

      case 'sequentialTurnTitle':
        placeholderValue = this.inputs.sequentialTurns.sequentialTurnTitle;
        break;

      case 'loadType':
        placeholderValue = this.inputs.loads.loadType;
        break;

      default:
        placeholderValue = '';
        break;
    }

    return `${placeholderValue}${suffix}`;
  }
}
