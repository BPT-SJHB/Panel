import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { ERROR_MESSAGES, ErrorCodes } from 'app/constants/error-messages';
import { APP_ROUTES } from 'app/constants/routes';

@Injectable({ providedIn: 'root' })
export class HttpErrorService {
  private readonly router = inject(Router);

  async handleHttpError<T>(
    error: unknown,
    redirectToLoginOnUnauthorized = true
  ): Promise<ApiResponse<T>> {
    if (!(error instanceof HttpErrorResponse)) {
      return this.unexpectedError(error);
    }

    if (error.status === 0) {
      return this.connectionError();
    }

    let code: ErrorCodes = error.status as ErrorCodes;
    let message = ERROR_MESSAGES[code] ?? 'خطای نامشخصی رخ داده است.';
    let details = error.message;

    if (this.isMainPanelError(error)) {
      ({ code, message, details } = await this.handleMainPanelError(
        error,
        redirectToLoginOnUnauthorized
      ));
    } else if (this.isTicketError(error)) {
      ({ code, message, details } = this.handleTicketError(error));
    } else if (typeof error.error === 'string') {
      message = error.error;
    }

    return { success: false, error: { code, message, details } };
  }

  // ---------- handlers ----------

  private async handleMainPanelError(
    error: HttpErrorResponse,
    redirect: boolean
  ) {
    const apiError = error.error as {
      ErrorMessage?: string;
      ErrorMessageCode?: number;
    };

    const code =
      (apiError.ErrorMessageCode as ErrorCodes) ??
      ErrorCodes.InternalServerError;

    if (redirect && code === ErrorCodes.NotAuthenticated) {
      await this.router.navigate([APP_ROUTES.AUTH.LOGIN]).catch(() => {
        console.log('redirect failed!');
      });
    }

    return {
      code,
      message: apiError.ErrorMessage ?? ERROR_MESSAGES[code],
      details: `کد خطا: ${apiError.ErrorMessageCode ?? 'نامشخص'}`,
    };
  }

  private handleTicketError(error: HttpErrorResponse) {
    const ticketError = error.error.error as {
      code: number;
      message: string;
    };

    return {
      code: ticketError.code as ErrorCodes,
      message: ticketError.message,
      details: `کد خطا: ${ticketError.code}`,
    };
  }

  // ---------- fallbacks ----------

  private connectionError<T>(): ApiResponse<T> {
    return {
      success: false,
      error: {
        code: ErrorCodes.InternalServerError,
        message: 'ارتباط با سرور برقرار نشد.',
        details: 'لطفاً اتصال اینترنت خود را بررسی کنید یا سرور در دسترس نیست.',
      },
    };
  }

  private unexpectedError<T>(error: unknown): ApiResponse<T> {
    const msg = (error as { message?: string })?.message ?? '';
    return {
      success: false,
      error: {
        code: ErrorCodes.InternalServerError,
        message: 'یک خطای غیرمنتظره رخ داده است.',
        details: `جزئیات: ${msg}`,
      },
    };
  }

  // ---------- type guards ----------

  private isMainPanelError(error: HttpErrorResponse): boolean {
    return (
      error.status === ErrorCodes.InternalServerError &&
      typeof error.error === 'object' &&
      error.error !== null &&
      ('ErrorMessage' in error.error || 'ErrorMessageCode' in error.error)
    );
  }

  private isTicketError(error: HttpErrorResponse): boolean {
    const e = error.error?.error;
    return typeof e === 'object' && e !== null && 'code' in e && 'message' in e;
  }
}
