import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { url } from '../../../core/constants/url';
import { Injectable } from '@angular/core';
import { contact } from '../model/contact';

const AUTH_API = environment.apiUrl;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: null
})
export class PublicService {
    constructor(private http: HttpClient) {}
    static readonly sendContactPath = AUTH_API + url.sendContact;
    sendContact(_contact: contact): Observable<object> {
        return this.http.post(
            PublicService.sendContactPath,
            {
                _contact
            },
            httpOptions
        );
    }
}
