import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ERROR_MESSAGES, ErrorCodes } from 'app/constants/error-messages';
import { APP_ROUTES } from 'app/constants/routes';

export function handleHttpError<T>(error: unknown): ApiResponse<T> {
  // HTTP errors
  if (error instanceof HttpErrorResponse) {
    // Connection not made or CORS blocked
    if (error.status === 0) {
      return {
        success: false,
        error: {
          code: ErrorCodes.InternalServerError,
          message: 'ارتباط با سرور برقرار نشد.',
          details:
            'لطفاً اتصال اینترنت خود را بررسی کنید یا سرور در دسترس نیست.',
        },
      };
    }

    let code = error.status as ErrorCodes;
    let message = ERROR_MESSAGES[code] ?? 'خطای نامشخصی رخ داده است.';
    let details = error.message;

    // Panel server errors
    if (isMainPanelError(error)) {
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
      }
    }
    // Ticket server errors
    else if (isTicketError(error)) {
      const ticketError = error.error.error as {
        code: number;
        message: string;
      };
      code = ticketError.code as ErrorCodes;
      message = ticketError.message;
      details = `کد خطا: ${ticketError.code}`;
    }
    // String error
    else if (typeof error.error === 'string') {
      message = error.error;
    }

    return { success: false, error: { code, message, details } };
  }

  // Non-HTTP errors (like network failures)
  const msg = (error as any)?.message ?? '';
  return {
    success: false,
    error: {
      code: ErrorCodes.InternalServerError,
      message: 'یک خطای غیرمنتظره رخ داده است.',
      details: `جزئیات: ${msg}`,
    },
  };
}

function isMainPanelError(error: HttpErrorResponse): boolean {
  return (
    error.status === ErrorCodes.InternalServerError &&
    error.error &&
    typeof error.error === 'object' &&
    ('ErrorMessage' in error.error || 'ErrorMessageCode' in error.error)
  );
}

function isTicketError(error: HttpErrorResponse): boolean {
  return (
    error.error &&
    typeof error.error === 'object' &&
    'error' in error.error &&
    error.error.error &&
    typeof error.error.error === 'object' &&
    'message' in error.error.error &&
    'code' in error.error.error
  );
}
