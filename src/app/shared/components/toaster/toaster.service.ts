import { Injectable } from '@angular/core';
import { Toast } from '../../../core/interface/toast.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    subject: BehaviorSubject<Toast>;
    toast$: Observable<Toast>;

    constructor() {
        this.subject = new BehaviorSubject<Toast>(null!);
        this.toast$ = this.subject.asObservable().pipe(filter((toast) => toast !== null));
    }
    show(type?: string, title?: string, body?: string): void {
        this.subject.next({ type, title, body });
    }
}
