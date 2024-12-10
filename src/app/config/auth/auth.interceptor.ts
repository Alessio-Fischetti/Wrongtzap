import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const sessionService = inject(SessionService);
  const token = sessionService.getToken();

  const authReq = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', token ? `Bearer ${token}` : '')
  });

  return next(authReq);
};
