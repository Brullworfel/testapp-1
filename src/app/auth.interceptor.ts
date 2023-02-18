import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next));
  }

  private async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<unknown>> {
    const authToken = 'secret_key'
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });
    return lastValueFrom(next.handle(authReq));
  }
}
