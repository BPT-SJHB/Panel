import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../model/api-Response.model';
import { ERROR_MESSAGES, ErrorCodes } from '../constants/error-messages';

export function handleHttpError<T>(error: unknown): ApiResponse<T> {
  if (error instanceof HttpErrorResponse) {
    const code = error.status as ErrorCodes;
    const response = {
      success: false,
      error: {
        code,
        message: ERROR_MESSAGES[code] ?? 'خطای نامشخصی رخ داده است.',
        details: error.message,
      },
    };

    if (code == ErrorCodes.InternalServerError && error.error) {
      response.error.message = error.error;
    }

    return response;
  }
  return {
    success: false,
    error: {
      code: ErrorCodes.InternalServerError,
      message: ERROR_MESSAGES[ErrorCodes.InternalServerError],
      details: 'یک خطای غیرمنتظره رخ داده است.',
    },
  };
}
