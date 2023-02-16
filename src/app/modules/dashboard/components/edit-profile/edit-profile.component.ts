import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/spinner/loader.service';
import { ToasterService } from 'src/app/shared/components/toaster/toaster.service';
import { editProfile } from '../../model/edit-profile';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
    editForm = this.fb.group({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required)
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dashboardService: DashboardService,
        private toaster: ToasterService,
        private loadingService: LoaderService
    ) {}

    onSubmit(): void {
        this.loadingService.setLoading(true);
        const req: editProfile = {
            name: this.editForm.value.name,
            email: this.editForm.value.email,
            password: this.editForm.value.password,
            confirmPassword: this.editForm.value.confirmPassword,
            city: this.editForm.value.place,
            place: this.editForm.value.email,
            phoneNumber: this.editForm.value.phoneNumber
        };
        if (!this.editForm.valid) {
            this.loadingService.setLoading(false);
            return this.editForm.markAllAsTouched();
        }
        this.dashboardService.editProfile(req).subscribe({
            next: (data) => {
                this.loadingService.setLoading(false);
                this.toaster.show('success', 'Hurray!', 'Profile edited successfully.');
                this.router.navigateByUrl('/dashboard/your-next');
            },
            error: (err) => {
                this.loadingService.setLoading(false);
                this.toaster.show('error', 'Error!', 'Sorry! profile can not edited.');
            }
        });
    }
}
