/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpClient
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { loginData } from 'src/app/modules/auth/model/login';
import { environment } from 'src/environments/environment';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
        const { url, method } = request;

        if (!environment.production) {
            return handleRoute();
        } else {
            return handleRoute();
        }

        function handleRoute(): Observable<any> {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return login();
                case url.endsWith('/logout') && method === 'POST':
                    return logout();
                case url.endsWith('/register') && method === 'POST':
                    return register();
                case url.endsWith('/contact') && method === 'POST':
                    return sendContact();
                case url.endsWith('/editProfile') && method === 'POST':
                    return editProfile();
                default:
                    return next.handle(request);
            }
        }

        // route functions

        function login(): Observable<loginData> {
            return ok([
                {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRzZHNmZHMiLCJpYXQiOjE2Njg1MDk2NzYsImV4cCI6MTY2ODU5NjA3Nn0.OwaPx3FHFd0NVRDYWYerRB4N6MLOttiIW8egmPiBPhw',
                    message: 'Login Successfully.'
                }
            ]);
            //  return error({
            //     "message":"user is not authorized"
            //  })
        }

        function logout(): Observable<loginData> {
            return ok({ message: 'logout successfully' });
            //  return error({
            //     "message":"There is an issue with logout."
            //  })
        }

        function register(): Observable<loginData> {
            return ok({ message: 'register successfully' });
            //  return error({
            //     "message":"There is an issue with registering the user."
            //  })
        }

        function sendContact(): Observable<loginData> {
            return ok({ message: 'send Contact successfully' });
            //  return error({
            //     "message":"There is an issue with sending the data"
            //  })
        }

        function editProfile(): Observable<loginData> {
            return ok({ message: 'profile edited successfully' });
            //  return error({
            //     "message":"There is an issue with sending the data"
            //  })
        }

        // helper functions

        function ok(body?: object): Observable<any> {
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string): Observable<never> {
            return throwError(() => ({ error: { message } })).pipe(materialize(), delay(500), dematerialize());
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
