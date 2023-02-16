import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { roleType } from 'src/app/modules/auth/role.enum';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
    constructor(public router: Router, private storage: StorageService) {}
    canActivate(): boolean {
        let role = this.storage.getLocalStorageItem('Role');
        if (role === roleType.admin) {
            this.router.navigate(['/dashboard/your-next']);
        }
        return true;
    }
}
