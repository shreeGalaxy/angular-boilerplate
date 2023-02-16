import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, AuthComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule, TranslateModule],
    providers: [AuthService]
})
export class AuthModule {}
