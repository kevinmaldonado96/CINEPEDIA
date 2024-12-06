import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptorService extends HttpErrorResponse {
  constructor() {
    super({});
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMesagge = '';
        let errorType = '';

        if (httpErrorResponse.error instanceof ErrorEvent) {
          errorMesagge = httpErrorResponse.error.error;
        } else {
          errorType = $localize`:@@dialog.interceptor.title.error:Error del lado del servidor`;
          if (httpErrorResponse.status === 0) {
            errorMesagge = $localize`:@@dialog.interceptor.message.error:No hay conexión con el servidor`;
          } else {
            errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
          }
          Swal.fire({
            icon: 'error',
            title: errorType,
            text: errorMesagge,
            confirmButtonText: 'Ok',
          });
        }
        return throwError(() => new Error(errorMesagge));
      })
    );
  }
}
