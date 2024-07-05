import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  // HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  // HttpHeaders
} from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
// import { Observable } from 'rxjs';


export const BYPASS_LOG = new HttpContextToken(() => false)
@Injectable()
export class userInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const AuthToken = this.authService.getUserToken();

    let headers = req.headers;

    headers = headers.append('x-auth-token', AuthToken || '');
    
    const authRequest = req.clone({
      headers: headers
    });
    return next.handle(authRequest);

  }
}
