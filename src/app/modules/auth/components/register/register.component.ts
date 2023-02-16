import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { message } from '../../model/login';
import { Register } from '../../model/register';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';
import { emailValidator, passwordValidator } from '../../../../core/validators/custom.validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    errorMessage = '';
    registrationForm = this.fb.group({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, emailValidator]),
        password: new FormControl('', [Validators.required, passwordValidator])
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
        const registerFormData: Register = {
            userName: this.registrationForm.controls.name.value,
            email: this.registrationForm.controls.email.value,
            password: this.registrationForm.controls.password.value
        };
        if (!this.registrationForm.valid) {
            this.loadingService.setLoading(false);
            return this.registrationForm.markAllAsTouched();
        }
        this.authService.register(registerFormData).subscribe({
            next: (data: message[]) => {
                this.loadingService.setLoading(false);
                if (data) {
                    this.toaster.show('success', 'Hurray!', 'Registration successfully');
                    this.router.navigateByUrl('/auth/login');
                }
            },
            error: (err) => {
                this.loadingService.setLoading(false);
                this.errorMessage = err.error.message;
                this.toaster.show('error', 'Error!', 'Please check credential');
            }
        });
    }
}
