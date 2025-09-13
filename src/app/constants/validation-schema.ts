import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export interface ErrorsValidation {
  required?: any;
  email?: any;
  pattern?: any;
  minlength?: any;
  maxlength?: any;
  min?: any;
  max?: any;
  exactLength?: any;
}

export function getDefaultErrorMessage(
  name: string,
  e: ErrorsValidation
): string | null {
  if (e.required) return `${name} الزامی است`;
  if (e.email) return `فرمت ${name} نامعتبر است`;

  if (e.exactLength) {
    const ex = e.exactLength;
    return `${name} باید دقیقا ${ex.requiredLength} کاراکتر باشد`;
  }

  if (e.minlength)
    return `${name} باید حداقل ${e.minlength.requiredLength} کاراکتر باشد`;
  if (e.maxlength)
    return `${name} باید حداکثر ${e.maxlength.requiredLength} کاراکتر باشد`;

  if (e.pattern) return `فرمت ${name} معتبر نیست`;
  if (e.min) return `${name} نمی‌تواند کمتر از مقدار مجاز باشد`;
  if (e.max) return `${name} نمی‌توان بیشتر از مقدار مجاز باشد`;

  return null;
}

export const ValidationSchema = {
  mobile: {
    name: 'شماره موبایل',
    validators: [
      Validators.required,
      exactLengthValidator(11),
      Validators.pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
    ],
  },
  mobileOrEmpty: {
    name: 'شماره موبایل',
    validators: [
      Validators.pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
    ],
  },
  nationalId: {
    name: 'کد ملی',
    validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
  },
  email: {
    name: 'ایمیل',
    validators: [Validators.required, Validators.email],
  },
  emailOrEmpty: {
    name: 'ایمیل',
    validators: [Validators.email],
  },
  fullName: {
    name: 'نام کاربر',
    validators: [Validators.required, Validators.minLength(3)],
  },
  fullNameOrEmpty: {
    name: 'نام کاربر',
    validators: [Validators.minLength(3)],
  },
  username: {
    name: 'نام کاربری',
    validators: [Validators.required, Validators.minLength(5)],
  },
  password: {
    name: 'رمز عبور',
    validators: [Validators.required, Validators.minLength(1)],
  },
  captcha: {
    name: 'کپچا',
    validators: [Validators.required],
  },
  id: {
    name: 'شناسه',
    validators: [Validators.required],
  },
  driverId: {
    name: 'شناسه راننده',
    validators: [Validators.required],
  },
  telephone: {
    name: 'شماره تلفن',
    validators: [Validators.required, Validators.pattern(/^0\d{10}$/)],
  },
  telephoneOrEmpty: {
    name: 'شماره تلفن',
    validators: [Validators.pattern(/^0\d{10}$/)],
  },
  address: {
    name: 'آدرس',
    validators: [Validators.required, Validators.minLength(5)],
  },
  title: {
    name: 'عنوان',
    validators: [Validators.required],
  },
  keyword: {
    name: 'کلمه کلیدی',
    validators: [Validators.required],
  },
  managerName: {
    name: 'نام مدیر',
    validators: [Validators.required, Validators.minLength(3)],
  },
  fatherName: {
    name: 'نام پدر',
    validators: [Validators.required, Validators.minLength(3)],
  },
  wallet: {
    name: 'کیف پول',
    validators: [Validators.required],
  },
  walletId: {
    name: 'شناسه کیف پول',
    validators: [Validators.required],
  },
  licenseNumber: {
    name: 'شماره گواهینامه',
    validators: [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^\d{10}$/),
    ],
  },
  serialNumber: {
    name: 'شماره سریال',
    validators: [Validators.required, Validators.pattern(/^\d+$/)],
  },
  smartCard: {
    name: 'شماره هوشمند',
    validators: [Validators.required, Validators.pattern(/^\d{7}$/)],
  },
  truckId: {
    name: 'شناسه ناوگان',
    validators: [Validators.required],
  },
  licensePlateNumber: {
    name: 'شماره پلاک',
    validators: [Validators.required],
  },
  turn: {
    name: 'نوبت',
    validators: [Validators.required],
  },
  turnId: {
    name: 'شناسه نوبت',
    validators: [Validators.required],
  },
  smsActive: {
    name: 'فعال‌سازی پیامک',
    validators: [Validators.required],
  },
  loaderType: {
    name: 'نوع بارگیر',
    validators: [Validators.required],
  },
  nativeness: {
    name: 'بومی گری ناوگان',
    validators: [Validators.required],
  },
  truckNativenessExpiredDate: {
    name: 'تاریخ انقضای بومی‌گری',
    validators: [
      Validators.required,
      Validators.pattern(
        /^(13|14)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/
      ),
    ],
  },
  announceDate: {
    name: 'تاریخ ثبت بار',
    validators: [Validators.required],
  },
  loadStatus: {
    name: 'وضعیت بار',
    validators: [Validators.required],
  },
  good: {
    name: 'نوع بار',
    validators: [Validators.required],
  },
  loadAnnouncementGroup: {
    name: 'گروه اعلام بار',
    validators: [Validators.required],
  },
  loadAnnouncementSubGroup: {
    name: 'زیرگروه اعلام بار',
    validators: [Validators.required],
  },
  sourceCity: {
    name: 'شهر مبدا',
    validators: [Validators.required],
  },
  targetCity: {
    name: 'شهر مقصد',
    validators: [Validators.required],
  },
  loadingPlace: {
    name: 'محل بارگیری',
    validators: [Validators.required],
  },
  dischargingPlace: {
    name: 'محل تخلیه',
    validators: [Validators.required],
  },
  transportCompany: {
    name: 'شرکت حمل و نقل',
    validators: [Validators.required],
  },
  totalNumber: {
    name: 'تعداد',
    validators: [Validators.required, Validators.min(1)],
  },
  tonaj: {
    name: 'تناژ',
    validators: [Validators.required, Validators.min(0.1)],
  },
  recipient: {
    name: 'گیرنده',
    validators: [Validators.required],
  },
  tariff: {
    name: 'تعرفه',
    validators: [Validators.required, Validators.min(1)],
  },
  description: {
    name: 'توضیحات',
    validators: [Validators.required, Validators.minLength(5)],
  },
  price: {
    name: 'مبلغ شارژ',
    validators: [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.min(1000),
      // Validators.max(300000)
    ],
  },
  parentage: {
    name: 'درصد',
    validators: [
      Validators.required,
      Validators.min(0.1),
      Validators.max(100), // optional: to cap it at 100%
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ],
  },
};

export type ValidationField = keyof typeof ValidationSchema;

/**
 * Exact length validator
 * @param length required length
 */
export function exactLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null; // don’t validate empty — let Validators.required handle it
    }

    const valueLength = control.value.toString().length;

    return valueLength === length
      ? null
      : { exactLength: { requiredLength: length, actualLength: valueLength } };
  };
}
