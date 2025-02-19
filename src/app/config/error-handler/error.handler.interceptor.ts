import { inject } from '@angular/core';
import {HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { SessionService } from '../../services/session.service';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  return next(req).pipe(
    retry(3), // retries N times when request is not 2XX
    catchError((err: HttpErrorResponse) => { // Callback on http error (e.g. 4XX, 5XX )
      /*
      ... BODY ...
      */
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })
  );

};
