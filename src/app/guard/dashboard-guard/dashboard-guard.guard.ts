import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { APP_ROUTES } from 'app/constants/routes';
import { checkAndToastError } from 'app/utils/api-utils';

export const dashboardGuard: CanActivateFn = async () => {
  const auth = inject(UserAuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  try {
    const response = await auth.isLoggedIn(true);

    // Check for API errors and show toast
    if (!checkAndToastError(response, toast)) {
      await router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return false;
    }

    // Check if session is live
    if (!response.data?.ISSessionLive) {
      await router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return false;
    }

    return true; // access allowed
  } catch (error) {
    console.error('Guard error:', error);
    await router.navigate([APP_ROUTES.AUTH.LOGIN]);
    return false;
  }
};
