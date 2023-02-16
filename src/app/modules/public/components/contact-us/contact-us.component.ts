import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { contact } from '../../model/contact';
import { PublicService } from '../../services/public.service';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
    providers: [PublicService],
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
    contactForm = this.fb.group({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        contact: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private contactService: PublicService,
        private toaster: ToasterService,
        private loadingService: LoaderService
    ) {}

    onSubmit(): void {
        this.loadingService.setLoading(true);
        const req: contact = {
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            contact: this.contactForm.value.contact,
            message: this.contactForm.value.message
        };
        if (!this.contactForm.valid) {
            this.loadingService.setLoading(false);
            return this.contactForm.markAllAsTouched();
        }
        this.contactService.sendContact(req).subscribe({
            next: () => {
                this.loadingService.setLoading(false);
                this.toaster.show('success', 'Hurray!', 'Contact sent successfully.');
                this.router.navigateByUrl('/home');
            },
            error: () => {
                this.loadingService.setLoading(false);
                this.toaster.show('error', 'Error!', 'Sorry! Contact not sent.');
            }
        });
    }
}
