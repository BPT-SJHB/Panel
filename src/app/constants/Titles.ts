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
  | 'loadType'
  | 'loadsLoadingPlace'
  | 'loadsDischargingPlace'
  | 'loadsRecipient'
  | 'loadsDescription'
  | 'sequentialTurnKeywork';

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
      turnStatus: 'وضعیت نوبت',
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
      loadId: 'شناسه مخزن بار',
      loadStatus: 'وضعیت نهایی بار',
      loadType: 'نوع بار',
      loadCost: 'تعرفه حمل',
      loadingPlace: 'محل بارگیری',
      dischargingPlace: 'محل تخلیه',
      loadAmount: 'تعداد',
      loadSize: 'تناژ',
      loadRecipient: 'گیرنده',
      loadDescription: 'توضیحات',
      tptParamsJoint: ' پارامترهای موثر',
    },
    loadAnnouncementDetails: {
      loadDateAndTime: 'زمان اعلام بار',
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
      keyWord: 'کلمه کلیدی',
    },
  };

  public static readonly tables = {
    loads: {
      loadProvince: 'استان',
      loadId: this.inputs.loads.loadId,
      product: 'کالا',
      sourceCity: this.inputs.provinceAndCities.startCity,
      targetCity: this.inputs.provinceAndCities.endCity,
      announcementGroup:
        this.inputs.loadAnnouncements.loadAnnouncementGroupTitle,
      announcementSubGroup:
        this.inputs.loadAnnouncements.loadAnnouncementSubGroupTitle,
      transportCompany: this.inputs.transportCompanies.transportCompanyTitle,
      recipient: this.inputs.loads.loadRecipient,
      address: this.inputs.global.address,
      description: this.inputs.loads.loadDescription,
      loadRegisteringUser: 'کاربر ثبت بار',
      loadAllocationUser: 'کاربر تخصیص بار',
      loadAllocationId: 'شناسه تخصیص بار',
      licensePlate: this.inputs.trucks.licensePlateNumber,
      smartCardNo: this.inputs.trucks.truckSmartCardNumber,
      truckDriver: 'راننده',
      nationalCode: this.inputs.users.userNationalCodeTitle,
      mobileNumber: this.inputs.phoneNumbers.inputTitle,
      allocationDate: 'تاریخ تخصیص بار',
      allocationTime: 'ساعت تخصیص بار',
      sequentialTurn: 'تسلسل نوبت',
      note: this.inputs.loads.loadDescription,
      loadAllocationStatusTitle: 'وضعیت تخصیص بار',
      tptParamsJoint: this.inputs.loads.tptParamsJoint,
      loadSize: this.inputs.loads.loadSize,
      loadTotalAmount: 'تعداد کل',
      loadRemainedAmount: 'تعداد باقیمانده',
      loadCost: this.inputs.loads.loadCost,
      loadingPlace: this.inputs.loads.loadingPlace,
      dischargingPlace: this.inputs.loads.dischargingPlace,
      loadStatus: this.inputs.loads.loadStatus,
      loadAnnouncementDate: 'تاریخ اعلام بار',
      loadAnnouncementTime: 'ساعت اعلام بار',
    },
  };

  public static readonly buttons = {
    search: 'جستجو',
    retrieveFromOutdoorSystem: 'استعلام',
    add: {
      addUser: 'جدید',
      addRecord: 'جدید',
    },
    saveAndEdit: 'ثبت و ویرایش',
    activateSMS: 'فعال‌سازی پیامک',
    sendSystemLink: 'ارسال لینک سامانه',
    generateNewPassword: 'ایجاد رمز‌عبور جدید',
    changeNativenessStatus: 'تغییر وضعیت بومی‌گری',
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
    driverInfo: 'اطلاعات راننده',
    turnInfo: 'اطلاعات نوبت',
    walletInfo: 'اطلاعات کیف پول',
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

      case 'loadsLoadingPlace':
        placeholderValue = this.inputs.loads.loadingPlace;
        break;

      case 'loadsDischargingPlace':
        placeholderValue = this.inputs.loads.dischargingPlace;
        break;

      case 'loadsRecipient':
        placeholderValue = this.inputs.loads.loadRecipient;
        break;

      case 'loadsDescription':
        placeholderValue = this.inputs.loads.loadDescription;
        break;

      case 'sequentialTurnKeywork':
        placeholderValue = this.inputs.sequentialTurns.keyWord;
        break;

      default:
        placeholderValue = '';
        break;
    }

    return `${placeholderValue}${suffix}`;
  }
}
