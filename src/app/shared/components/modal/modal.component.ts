import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { modalStatus } from './modal.enum';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    isDisplay: boolean = false;
    isOpen: string | undefined;
    message: string = '';
    constructor(private modalService: ModalService) {}

    ngOnInit(): void {
        this.modalService.getIsDisplay().subscribe((dialog) => {
            if (dialog && dialog.status == modalStatus.open) {
                this.isDisplay = true;
                this.isOpen = dialog.status;
                this.message = dialog.message;
            } else {
                return;
            }
        });
    }

    close(): void {
        this.isDisplay = false;
        this.message = '';
        this.modalService.toggle({ status: modalStatus.close, message: '' });
    }
}
