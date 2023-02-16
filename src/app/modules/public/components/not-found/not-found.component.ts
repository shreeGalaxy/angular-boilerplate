import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [TranslateModule],
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    constructor(private router: Router, public translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    goToHome(): void {
        this.router.navigateByUrl('/home');
    }
}
