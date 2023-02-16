import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toast } from 'src/app/core/interface/toast.interface';

@Component({
    selector: 'app-toaster',
    templateUrl: './toaster.component.html',
    styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
    @Input() toast?: Toast;
    @Input() i: number = 0;
    @Output() remove = new EventEmitter<number>();
}
