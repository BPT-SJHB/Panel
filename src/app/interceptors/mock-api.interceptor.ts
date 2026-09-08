import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from, Observable, of, switchMap } from 'rxjs';

/**
 * Mock API Interceptor
 * In development with disableApi: true, intercepts HTTP calls and returns mock responses.
 * In production or online mode, passes requests directly to backend without loading any mock data.
 */
export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  // If in production or API is enabled, forward to actual backend network
  if (environment.production || !environment.disableApi) {
    return next(req);
  }

  // Load mock registry dynamically only in development offline flow
  return from(import('./mock-registry')).pipe(
    switchMap(({ getMockResponseForUrl }) => {
      const mockData = getMockResponseForUrl(req.url, req.method);
      if (mockData !== undefined) {
        return of(
          new HttpResponse({
            status: 200,
            body: mockData,
          })
        );
      }
      return next(req);
    })
  );
};
