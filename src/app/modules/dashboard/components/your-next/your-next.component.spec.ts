import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourNextComponent } from './your-next.component';

describe('YourNextComponent', () => {
    let component: YourNextComponent;
    let fixture: ComponentFixture<YourNextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [YourNextComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(YourNextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
