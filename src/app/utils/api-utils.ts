import { ApiResponse } from 'app/data/model/api-Response.model';
import { ToastService } from 'app/services/toast-service/toast.service';

export function checkAndToastError<T>(res: ApiResponse<T>, toast: ToastService): res is { success: true, data: T } {
  if (!res.success || !res.data) {
    toast.error('خطا', res.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
    return false;
  }
  return true;
}


export function trimInDeep<T>(input: T): T {
  if (typeof input === 'string') {
    return input.trim() as T; 
  }

  if (Array.isArray(input)) {
    return input.map(item => trimInDeep(item)) as T;
  }

  if (input !== null && typeof input === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(input)) {
      result[key] = trimInDeep(value);
    }
    return result;
  }

  return input;
}
