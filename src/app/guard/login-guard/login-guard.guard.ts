import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { APP_ROUTES } from 'app/constants/routes';
import { ToastService } from 'app/services/toast-service/toast.service';
import { checkAndToastError } from 'app/utils/api-utils';

export const loginAuthGuard: CanActivateFn = async () => {
  const auth = inject(UserAuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  try {
    const response = await auth.isLoggedIn();

    if (!checkAndToastError(response, toast) || !response.data?.ISSessionLive) {
      return true;
    }

    await router.navigate([APP_ROUTES.DASHBOARD.HOME]);

    return false;
  } catch (error) {
    console.error('Login guard error:', error);
    return true;
  }
};
