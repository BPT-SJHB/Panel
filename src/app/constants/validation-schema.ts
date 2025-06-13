import { Validators } from '@angular/forms';

export interface ErrorsValidation {
  required?: any;
  email?: any;
  pattern?: any;
  minlength?: any;
  maxlength?: any;
  min?:any,
}

export const ValidationSchema = {
  mobile: {
    validators: [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
    ],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره موبایل الزامی است.';
      if (e.minlength || e.maxlength) return 'شماره موبایل باید ۱۱ رقم باشد.';
      if (e.pattern) return 'فرمت شماره موبایل معتبر نیست.';
      return null;
    },
  },

  nationalId: {
    validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'کد ملی الزامی است.';
      if (e.pattern) return 'کد ملی باید ۱۰ رقم باشد.';
      return null;
    },
  },

  email: {
    validators: [Validators.required, Validators.email],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'ایمیل الزامی است.';
      if (e.email) return 'فرمت ایمیل نامعتبر است.';
      return null;
    },
  },

  fullName: {
    validators: [Validators.required, Validators.minLength(3)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'نام کاربر الزامی است.';
      if (e.minlength) return 'نام کاربر باید حداقل ۳ حرف باشد.';
      return null;
    },
  },

  id: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شناسه الزامی است.' : null,
  },

  driverId: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شناسه راننده الزامی است.' : null,
  },

  telephone: {
    validators: [Validators.required,Validators.pattern(/^0\d{10}$/)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره تلفن الزامی است.';
      if (e.pattern) return 'فرمت شماره تلفن معتبر نیست.';
      return null;
    },
  },

  address: {
    validators: [Validators.required, Validators.minLength(5)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'آدرس الزامی است.';
      if (e.minlength) return 'آدرس باید حداقل ۵ کاراکتر باشد.';
      return null;
    },
  },

  title: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'عنوان الزامی است.' : null,
  },

  managerName: {
    validators: [Validators.required, Validators.minLength(3)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'نام کاربر الزامی است.';
      if (e.minlength) return 'نام کاربر باید حداقل ۳ حرف باشد.';
      return null;
    },
  },

  fatherName: {
    validators: [Validators.required, Validators.minLength(3)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'نام پدر الزامی است.';
      if (e.minlength) return 'نام پدر باید حداقل ۳ حرف باشد.';
      return null;
    },
  },

  wallet: {
    Validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'کیف پول الزامی است.';
      return null;
    },
  },

  walletId: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شناسه کیف پول الزامی است.' : null,
  },

  licenseNumber: {
    validators: [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^\d{10}$/),
    ],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره گواهینامه الزامی است.';
      if (e.minlength) return 'شماره گواهینامه باید ۱۰ رقم باشد.';
      if (e.pattern) return 'شماره گواهینامه فقط باید عدد باشد.';
      return null;
    },
  },

  serialNumber: {
    validators: [Validators.required, Validators.pattern(/^\d+$/)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره سریال الزامی است.';
      if (e.pattern) return 'شماره سریال باید فقط عدد باشد.';
      return null;
    },
  },

  smartCard: {
    validators: [Validators.required, Validators.pattern(/^\d{7}$/)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره هوشمند الزامی است.';
      if (e.pattern) return 'شماره هوشمند باید ۷ رقم باشد.';
      return null;
    },
  },

  truckId: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شناسه ناوگان الزامی است.' : null,
  },

  licensePlateNumber: {
    validators: [
      Validators.required,
      // Validators.pattern(/^\d{2}[A-Zآ-ی]\d{3}\d{2}$/),
    ],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'شماره پلاک الزامی است.';
      if (e.pattern) return 'فرمت شماره پلاک معتبر نیست.';
      return null;
    },
  },

  turn: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'نوبت الزامی است.';
      return null;
    },
  },

  turnId: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شناسه نوبت الزامی است.' : null,
  },

  smsActive: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'فعال‌سازی پیامک الزامی است.' : null,
  },

  loaderType: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'نوع بارگیر الزامی است.' : null,
  },

  nativeness: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'بومی گری ناوگان الزامی است.' : null,
  },

  truckNativenessExpiredDate: {
    validators: [
      Validators.required,
      Validators.pattern(
        /^(13|14)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/
      ),
    ],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'تاریخ انقضای بومی‌گری الزامی است.';
      if (e.pattern) return 'فرمت تاریخ اشتباه است.';
      return null;
    },
  },

  announceDate: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'تاریخ ثبت بار الزامی است.' : null,
  },

  loadStatus: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'وضعیت بار الزامی است.' : null,
  },

  good: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'نوع بار الزامی است.' : null,
  },

  loadAnnouncementGroup: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'گروه اعلام بار الزامی است.' : null,
  },

  loadAnnouncementSubGroup: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'زیرگروه اعلام بار الزامی است.' : null,
  },

  sourceCity: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شهر مبدا الزامی است.' : null,
  },

  targetCity: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شهر مقصد الزامی است.' : null,
  },

  loadingPlace: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'محل بارگیری الزامی است.' : null,
  },

  dischargingPlace: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'محل تخلیه الزامی است.' : null,
  },

  transportCompany: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'شرکت حمل و نقل الزامی است.' : null,
  },

  totalNumber: {
    validators: [Validators.required, Validators.min(1)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'تعداد الزامی است.';
      if (e.min) return 'تعداد نمی‌تواند صفر باشد.';
      return null;
    },
  },

  tonaj: {
    validators: [Validators.required, Validators.min(0.1)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'تناژ الزامی است.';
      if (e.min) return 'تناژ باید بیشتر از صفر باشد.';
      return null;
    },
  },

  recipient: {
    validators: [Validators.required],
    getErrorMessage: (e: ErrorsValidation) =>
      e.required ? 'گیرنده الزامی است.' : null,
  },

  tarrif: {
    validators: [Validators.required, Validators.min(1)],
    getErrorMessage: (e: ErrorsValidation) => {
      if (e.required) return 'تعرفه الزامی است.';
      if (e.min) return 'تعرفه نمی‌تواند صفر باشد.';
      return null;
    },
  },

  description: {
  validators: [Validators.required, Validators.minLength(5)],
  getErrorMessage: (e: ErrorsValidation) => {
    if (e.required) return 'توضیحات الزامی است.';
    if (e.minlength) return 'توضیحات باید حداقل ۵ کاراکتر باشد.';
    return null;
  },
},

};

export type ValidationField = keyof typeof ValidationSchema;
