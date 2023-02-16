import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';
import { roleType } from 'src/app/modules/auth/role.enum';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMobile: boolean = false;
    showDropdown: boolean = false;
    showMobDropdown: boolean = true;
    lang: string = 'en';
    mobileScreenWidth: number = 992;
    theme: string = 'theme-light';
    width: number = 0;
    roleType: string = roleType.admin;

    @Output() themeChangeEvent = new EventEmitter<string>();

    constructor(
        private router: Router,
        private loadingService: LoaderService,
        private authService: AuthService,
        public translate: TranslateService,
        private toaster: ToasterService,
        private storage: StorageService
    ) {
        translate.addLangs(['en', 'fr_FR']);
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        if (window.innerWidth < this.mobileScreenWidth) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: { target: { innerWidth: number } }): void {
        this.width = event.target.innerWidth;
        if (this.width < this.mobileScreenWidth) {
            this.isMobile = true;
            this.showMobDropdown = false;
        } else {
            this.isMobile = false;
            this.showMobDropdown = true;
        }
    }

    changeTheme(): void {
        this.themeChangeEvent.emit(this.theme);
    }

    readLocalStorageValue(key: string): string | null {
        return this.storage.getLocalStorageItem(key);
    }

    onProfileClick(): void {
        this.showDropdown = false;
    }
    onMobDropDownClick(): void {
        this.showMobDropdown = false;
    }

    switchLang(): void {
        this.translate.use(this.lang);
    }

    logout(): void {
        this.loadingService.setLoading(true);
        this.authService.logout().subscribe({
            next: () => {
                this.loadingService.setLoading(false);
                this.storage.clearStorage();
                this.toaster.show('success', 'Hurray!', 'Logout successfully');
                this.router.navigateByUrl('/home');
            },
            error: (error) => {
                this.loadingService.setLoading(false);
                this.toaster.show('error', 'Error!', 'error in logout');
            }
        });
    }
}
