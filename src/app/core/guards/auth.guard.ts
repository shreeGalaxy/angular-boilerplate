import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { roleType } from 'src/app/modules/auth/role.enum';
import { modalStatus } from 'src/app/shared/components/modal/modal.enum';
import { ModalService } from '../../shared/components/modal/modal.service';
import { StorageService } from '../services/storage.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(public router: Router, private storage: StorageService, private modalService: ModalService) {}

    canActivate(): boolean {
        let role = this.storage.getLocalStorageItem('Role');
        if (role !== roleType.admin) {
            this.storage.clearStorage();
            this.modalService.toggle({
                status: modalStatus.open,
                message: 'Access Denied, Login is Required to Access This Page!'
            });
            this.router.navigateByUrl('/auth/login');
        }
        return true;
    }
}
