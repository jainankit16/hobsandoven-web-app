import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoopBackAuth } from './../sdk/services/core/auth.service';

@Injectable()
export class AuthorizationService implements HttpInterceptor {

    constructor(
        private router: Router,
        private auth: LoopBackAuth
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && err.error && err.error.error) {
                const error = err.error.error;
                // auto logout if 401 response returned from api when token got expired
                if (error['code'] && error['code'] === 'TOKEN_EXPIRED') {
                    this.auth.clear();
                    localStorage.clear();
                    if (this.router.url.indexOf('login') === -1) {
                        if (this.router.url && this.router.url !== '/') {
                            this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });
                        } else {
                            this.router.navigate(['/login']);
                        }
                    }
                }
            }
            return throwError(err);
        }))
    }
}
