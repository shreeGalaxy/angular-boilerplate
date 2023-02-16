import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { modalStatus } from './modal.enum';
import { modalBody } from './modal.interface';
@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private dialogSubject = new Subject<modalBody>();

    toggle(data: modalBody): void {
        if (data.status === modalStatus.close) {
            this.dialogSubject.next(data);
        } else {
            this.dialogSubject.next(data);
        }
    }

    getIsDisplay(): Observable<modalBody> {
        return this.dialogSubject.asObservable();
    }
}
