export enum ErrorCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  NotFoundInLocalAPI = 27,
  NoRecordFound=28,
}

export const ERROR_MESSAGES: Record<ErrorCodes, string> = {
  [ErrorCodes.BadRequest]: 'لطفاً ورودی خود را بررسی کرده و دوباره تلاش کنید.',
  [ErrorCodes.Unauthorized]: 'جلسه شما منقضی شده است. لطفاً دوباره وارد شوید.',
  [ErrorCodes.Forbidden]: 'شما اجازه انجام این عملیات را ندارید.',
  [ErrorCodes.NotFound]: 'منبع درخواستی یافت نشد.',
  [ErrorCodes.InternalServerError]: 'خطای سرور داخلی رخ داده است. لطفاً بعداً تلاش کنید.',
  [ErrorCodes.NotFoundInLocalAPI]: 'اطلاعات در سرور داخلی یافت نشد',
  [ErrorCodes.NoRecordFound]: "رکورد پیدا مورد نظر یاقت نشد."
};
