import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { url } from '../../../core/constants/url';
import { Injectable } from '@angular/core';
import { Login, message, loginData } from '../model/login';
import { Register } from '../model/register';
import { forgotPassword } from '../model/forgotPassword';

const AUTH_API = environment.apiUrl;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}
    static readonly loginPath = AUTH_API + url.login;
    static readonly registerPath = AUTH_API + url.register;
    static readonly forgotPasswordPath = AUTH_API + url.forgotPassword;
    static readonly logoutPath = AUTH_API + url.logout;

    login(_LoginModel: Login): Observable<loginData[]> {
        return this.http.post<loginData[]>(
            AuthService.loginPath,
            {
                _LoginModel
            },
            httpOptions
        );
    }

    register(_RegisterModel: Register): Observable<message[]> {
        return this.http.post<message[]>(
            AuthService.registerPath,
            {
                _RegisterModel
            },
            httpOptions
        );
    }

    forgotPassword(_ForgotModel: forgotPassword): Observable<object> {
        return this.http.post(
            AuthService.forgotPasswordPath,
            {
                _ForgotModel
            },
            httpOptions
        );
    }

    logout(): Observable<object> {
        return this.http.post(AuthService.logoutPath, {}, httpOptions);
    }
}
