import { Component, AfterViewInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-splash-screen',
    templateUrl: './splash-screen.component.html',
    styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements AfterViewInit {
    opacityChange: number = 1;
    splashTransition: string | undefined;
    showSplash = true;
    ANIMATION_DURATION = 1;
    @Output() isSplashScreenLoaded = new EventEmitter<boolean>();

    ngAfterViewInit(): void {
        const splashScreenLoad: Promise<boolean> = new Promise((resolve) => {
            resolve(true);
        });
        splashScreenLoad.then(() => {
            const time: Observable<number> = timer(5000);
            time.subscribe(() => {
                this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
                this.opacityChange = 0;
                this.showSplash = !this.showSplash;
                this.isSplashScreenLoaded.emit(true);
            });
        });
    }
}
