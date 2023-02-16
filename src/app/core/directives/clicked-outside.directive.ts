import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {
    constructor(private el: ElementRef) {}
    @Output() public clickedOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(target: object): void {
        const clickInside = this.el.nativeElement.contains(target);
        if (!clickInside) {
            this.clickedOutside.emit(target);
        }
    }
}
