import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'environments/environment';
import { from, Observable, of, switchMap } from 'rxjs';

function logMockRequest(
  req: HttpRequest<unknown>,
  status: number,
  responseBody: unknown,
  startTime: number
): void {
  const duration = Math.round(performance.now() - startTime);
  const isSuccess = status >= 200 && status < 300;
  const statusColor = isSuccess ? '#16a34a' : '#dc2626';

  console.groupCollapsed(
    `%c MOCK HTTP %c ${req.method} %c ${req.url} %c (${status} OK) %c +${duration}ms`,
    'background: #8b5cf6; color: #fff; font-weight: bold; border-radius: 3px; padding: 2px 5px;',
    'background: #0284c7; color: #fff; font-weight: bold; border-radius: 3px; padding: 2px 5px;',
    'color: #0284c7; font-weight: bold;',
    `color: ${statusColor}; font-weight: bold;`,
    'color: #64748b; font-size: 11px;'
  );

  console.log('%cGeneral:', 'font-weight: bold; color: #64748b;', {
    'Request URL': req.urlWithParams || req.url,
    'Request Method': req.method,
    'Status Code': status,
    Duration: `${duration}ms`,
  });

  console.log('%cHeaders:', 'font-weight: bold; color: #64748b;', req.headers);

  if (req.body !== null && req.body !== undefined) {
    console.log('%cPayload (Body):', 'font-weight: bold; color: #64748b;', req.body);
  }

  console.log('%cResponse Data:', 'font-weight: bold; color: #64748b;', responseBody);

  console.groupEnd();
}

/**
 * Mock API Interceptor
 * In development with disableApi: true, intercepts HTTP calls and returns mock responses.
 * In production or online mode, passes requests directly to backend without loading any mock data.
 */
export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // If in production or API is enabled, forward to actual backend network
  if (environment.production || !environment.disableApi) {
    return next(req);
  }

  const startTime = performance.now();

  // Load mock registry dynamically only in development offline flow
  return from(import('./mock-registry')).pipe(
    switchMap(({ getMockResponseForUrl }) => {
      const mockData = getMockResponseForUrl(req.url, req.method);
      if (mockData !== undefined) {
        logMockRequest(req, 200, mockData, startTime);
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
