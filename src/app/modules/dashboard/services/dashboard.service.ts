import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { url } from '../../../core/constants/url';
import { editProfile } from '../model/edit-profile';

const AUTH_API = environment.apiUrl;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: null
})
export class DashboardService {
    constructor(private http: HttpClient) {}
    static readonly editProfilePath = AUTH_API + url.editProfile;
    editProfile(_editModel: editProfile): Observable<object> {
        return this.http.post(
            DashboardService.editProfilePath,
            {
                _editModel
            },
            httpOptions
        );
    }
}
