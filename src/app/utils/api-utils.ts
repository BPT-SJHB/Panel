import { ApiResponse } from 'app/data/model/api-Response.model';
import { ToastService } from 'app/services/toast-service/toast.service';

export function checkAndToastError<T>(res: ApiResponse<T>, toast: ToastService): res is { success: true, data: T } {
  if (!res.success || !res.data) {
    toast.error('خطا', res.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
    return false;
  }
  return true;
}
