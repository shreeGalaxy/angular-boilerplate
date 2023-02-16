import { Subscription, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Toast } from './core/interface/toast.interface';
import { ToasterService } from './shared/components/toaster/toaster.service';
import { StorageService } from './core/services/storage.service';
import { Router } from '@angular/router';
import { roleType } from 'src/app/modules/auth/role.enum';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    toastSubscription: Subscription = new Subscription();
    theme: string = 'theme-light';
    toasts: Toast[] = [];
    splashLoaded: boolean = false;
    roleType: string = roleType.admin;
    constructor(private toaster: ToasterService, private storage: StorageService) {}

    ngOnInit(): void {
        this.storage.setLocalStorageItem('lastAction', Date.now().toString());
        this.toaster.toast$.subscribe((toast: Toast) => {
            this.toasts = [toast, ...this.toasts];
            this.unsubscribeToastMsg();
        });
    }

    themeChange(theme: string): void {
        this.theme = theme;
    }

    onSplashLoad(isSplashLoaded: boolean): void {
        this.splashLoaded = isSplashLoaded;
    }

    unsubscribeToastMsg(): void {
        const broadcastToastMessage = timer(3000, 1000);
        this.toastSubscription = broadcastToastMessage.subscribe(() => {
            this.remove(0);
            // TODO: need to find better way to do this functionality
            this.toastSubscription.unsubscribe();
        });
    }

    remove(index: number): void {
        this.toasts.splice(index, 1);
    }

    readLocalStorageValue(key: string): string | null {
        return this.storage.getLocalStorageItem(key);
    }
}
