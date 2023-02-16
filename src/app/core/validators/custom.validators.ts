import { AbstractControl, FormGroup } from '@angular/forms';

export function emailValidator(control: AbstractControl): object | null {
    let enteredEmail = control.value;
    let emailRegex: RegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegex.test(enteredEmail) && enteredEmail ? { emailValidateError: true } : null;
}
export function passwordValidator(control: AbstractControl): object | null {
    let enteredPassword = control.value;
    //Choose a password of at least eight characters, one uppercase letter and one number
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword ? { patternError: true } : null;
}

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string): object | null {
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
