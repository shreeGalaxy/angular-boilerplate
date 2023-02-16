import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { forgotPassword } from '../../model/forgotPassword';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    forgotForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toaster: ToasterService,
        private loadingService: LoaderService
    ) {}

    onSubmit(): void {
        this.loadingService.setLoading(true);
        const req: forgotPassword = {
            email: this.forgotForm.value.email
        };
        if (!this.forgotForm.valid) {
            this.loadingService.setLoading(false);
            return this.forgotForm.markAllAsTouched();
        }
        this.authService.forgotPassword(req).subscribe({
            next: () => {
                this.loadingService.setLoading(false);
                this.toaster.show('success', 'Hurray!', 'email send successfully.');
                this.router.navigateByUrl('/auth/login');
            },
            error: (err) => {
                this.loadingService.setLoading(false);
                this.toaster.show('error', 'Error!', err);
            }
        });
    }
}
