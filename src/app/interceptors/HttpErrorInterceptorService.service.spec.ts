/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpErrorInterceptorService } from './HttpErrorInterceptorService.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('Service: HttpErrorInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptorService],
    });
  });

  it('should ...', inject(
    [HttpErrorInterceptorService],
    (service: HttpErrorInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('test_error_response_status_0', () => {
    const interceptor = new HttpErrorInterceptorService();
    const request = new HttpRequest<any>(
      'GET',
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const next = {
      handle: (req: HttpRequest<any>) => {
        return throwError(new HttpErrorResponse({ status: 0 }));
      },
    };
    interceptor.intercept(request, next).subscribe({
      error: (error) => {
        expect(error.message).toBe('No hay conexión con el servidor');
      },
    });
  });
});
