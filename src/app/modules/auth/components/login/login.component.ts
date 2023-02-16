import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Login, loginData } from '../../model/login';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = this.fb.group({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toaster: ToasterService,
        private loadingService: LoaderService,
        private storage: StorageService
    ) {}
    onSubmit(): void {
        this.loadingService.setLoading(true);
        if (!this.loginForm.valid) {
            this.loadingService.setLoading(false);
            return this.loginForm.markAllAsTouched();
        }
        const req: Login = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        this.authService.login(req).subscribe({
            next: (data: loginData[]) => {
                this.storage.setLocalStorageItem('Role', 'admin');
                this.loadingService.setLoading(false);
                this.toaster.show('success', 'Hurray!', 'Login successfully');
                if (data[0].token) {
                    this.storage.setLocalStorageItem('id_token', data[0].token);
                    this.router.navigateByUrl('/dashboard/your-next');
                }
            },
            error: (err) => {
                this.loadingService.setLoading(false);
                this.toaster.show('error', 'Error!', 'Please check credential');
            }
        });
    }
}
