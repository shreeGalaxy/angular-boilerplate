import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/components/toaster/toaster.service';
import { StorageService } from './storage.service';

const MINUTES_UNITL_AUTO_LOGOUT = 60; // in mins
const CHECK_INTERVAL = 15000; // in ms
const STORE_KEY = 'lastAction';

@Injectable({
    providedIn: 'root'
})
export class AutoLogoutService {
    public getLastAction(): number {
        let storeKey: number = 0;
        this.storage.getLocalStorageItem('STORE_KEY');
        storeKey = parseInt(this.storage.getLocalStorageItem('STORE_KEY') || '');
        return storeKey;
    }

    public setLastAction(lastAction: number): void {
        this.storage.setLocalStorageItem(STORE_KEY, lastAction.toString());
    }

    constructor(private router: Router, private toaster: ToasterService, private storage: StorageService) {
        this.check();
        this.initListener();
        this.initInterval();
    }

    initListener(): void {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover', () => this.reset());
        document.body.addEventListener('mouseout', () => this.reset());
        document.body.addEventListener('keydown', () => this.reset());
        document.body.addEventListener('keyup', () => this.reset());
        document.body.addEventListener('keypress', () => this.reset());
    }

    reset(): void {
        this.setLastAction(Date.now());
    }

    initInterval(): void {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    check(): void {
        const now = Date.now();
        const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        if (isTimeout) {
            this.toaster.show('error', 'Error!', 'LOGOUT');
            this.storage.clearStorage();
            this.router.navigate(['/auth/login']);
        }
    }
}
