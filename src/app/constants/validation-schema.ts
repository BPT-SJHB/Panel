import { Validators } from '@angular/forms';



export interface ErrorsValidation {
  required?:any,
  pattern?:any,
  minlength?:any,
  maxlength?:any,
}

export const ValidationSchema = {
  driverId: {
    validators: [Validators.required],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'شناسه راننده الزامی است.';
      return null;
    },
  },

  nationalId: {
    validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'کد ملی الزامی است.';
      if (e.pattern) return 'کد ملی باید ۱۰ رقم باشد.';
      return null;
    },
  },

  fullName: {
    validators: [Validators.required, Validators.minLength(3)],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'نام کاربر الزامی است.';
      if (e.minlength) return 'نام کاربر باید حداقل ۳ حرف باشد.';
      return null;
    },
  },

  mobile: {
    validators: [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
    ],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'شماره موبایل الزامی است.';
      if (e.minlength || e.maxlength) return 'شماره موبایل باید ۱۱ رقم باشد.';
      if (e.pattern) return 'فرمت شماره موبایل معتبر نیست.';
      return null;
    },
  },

  fatherName: {
    validators: [Validators.required, Validators.minLength(3)],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'نام پدر الزامی است.';
      if (e.minlength) return 'نام پدر باید حداقل ۳ حرف باشد.';
      return null;
    },
  },

  licenseNumber: {
    validators: [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^\d{10}$/),
    ],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'شماره گواهینامه الزامی است.';
      if (e.minlength) return 'شماره گواهینامه باید ۱۰ رقم باشد.';
      if (e.pattern) return 'شماره گواهینامه فقط باید عدد باشد.';
      return null;
    },
  },

  smsActive: {
    validators: [Validators.required],
    getErrorMessage: (e:ErrorsValidation) => e.required && 'فعال‌سازی پیامک الزامی است.',
  },

  smartCard: {
    validators: [Validators.required, Validators.pattern(/^\d{7}$/)],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'شماره کارت هوشمند الزامی است.';
      if (e.pattern) return 'شماره کارت هوشمند باید ۷ رقم باشد.';
      return null;
    },
  },

  address: {
    validators: [Validators.required, Validators.minLength(5)],
    getErrorMessage: (e:ErrorsValidation) => {
      if (e.required) return 'آدرس الزامی است.';
      if (e.minlength) return 'آدرس باید حداقل ۵ کاراکتر باشد.';
      return null;
    },
  },
};

export type ValidationField = keyof typeof ValidationSchema;
