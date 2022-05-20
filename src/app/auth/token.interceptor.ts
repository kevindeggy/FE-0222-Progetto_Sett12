import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private srvAuth: AuthServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.srvAuth.user$.pipe(
      take(1), switchMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const newReq = request.clone({
          headers: request.headers.set(
            "Authorization", `Bearer ${user?.accessToken}`
          )
        })
        return next.handle(newReq);
      }))

  }
}
