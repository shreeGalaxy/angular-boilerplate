import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    setLocalStorageItem(key: string, value: string | number | object): void {
        if (key && value && isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    clearStorage(): void {
        if (isPlatformBrowser(this.platformId)) localStorage.clear();
    }

    getLocalStorageItem(key: string): string | null {
        if (key && isPlatformBrowser(this.platformId)) {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
        }
        return null;
    }

    removeLocalStorageItem(key: string): void {
        if (key && isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
            return;
        }
        this.clearStorage();
    }
}
