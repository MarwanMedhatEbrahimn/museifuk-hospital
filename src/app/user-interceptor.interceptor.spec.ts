import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { userInterceptorInterceptor } from './user-interceptor.interceptor';
import { Observable } from 'rxjs';

describe('userInterceptorInterceptor', () => {
  let interceptor: userInterceptorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        userInterceptorInterceptor
      ]
    });

    interceptor = TestBed.inject(userInterceptorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept HTTP requests', () => {
    const req = new HttpRequest<any>('GET', '/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return new Observable<HttpEvent<any>>();
      }
    };

    interceptor.intercept(req, next).subscribe(
      response => {
        // Add your assertions here
      },
      error => {
        // Add error handling here
      }
    );
  });
});
