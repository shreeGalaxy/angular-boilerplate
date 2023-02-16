import { Injectable } from '@angular/core';
import { Subscription, Subject, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SplashScreenStateService {
    subject = new Subject();

    subscribe(onNext: object): Subscription {
        return this.subject.subscribe(onNext);
    }

    stop(): void {
        this.subject.next(false);
    }
}
