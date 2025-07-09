import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ERROR_MESSAGES, ErrorCodes } from 'app/constants/error-messages';
import { APP_ROUTES } from 'app/constants/routes';

export function handleHttpError<T>(error: unknown): ApiResponse<T> {
  if (error instanceof HttpErrorResponse) {
    let code = error.status as ErrorCodes;
    let message = ERROR_MESSAGES[code] ?? 'خطای نامشخصی رخ داده است.';
    let details = error.message;
    
    if (
      code === ErrorCodes.InternalServerError &&
      typeof error.error === 'object' &&
      error.error !== null
    ) {
      const apiError = error.error as {
        ErrorMessage?: string;
        ErrorMessageCode?: number;
      };
      
      if (apiError.ErrorMessageCode === ErrorCodes.NotAuthenticated) {
        window.location.href = APP_ROUTES.AUTH.LOGIN;
      }

      if (apiError.ErrorMessage) {
        message = apiError.ErrorMessage;
        details = `کد خطا: ${apiError.ErrorMessageCode ?? 'نامشخص'}`;
        code = apiError.ErrorMessageCode ?? 500;
      } else if (typeof error.error === 'string') {
        message = error.error;
      }
    }
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
    };
  }

  const message = (error as any)?.message ?? '';
  return {
    success: false,
    error: {
      code: ErrorCodes.InternalServerError,
      message: ERROR_MESSAGES[ErrorCodes.InternalServerError],
      details: `یک خطای غیرمنتظره رخ داده است. \n ${message}`,
    },
  };
}
