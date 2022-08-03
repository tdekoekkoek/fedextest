import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AuthValidators } from "../password-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  passwordValidators = [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=[a-z0-9!@#$%^&*()+=?]*[A-Z])(?=[A-Z0-9!@#$%^&*()+=?]*[a-z])[A-Za-z0-9!@#$%^&*()+=?]*$')
  ];
  firstName = ''
  lastName = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.buildForm();
    this.subscribeToFormChanges();
  }

  ngOnInit(): void {
  }

  get formControl() {
    return this.loginForm.controls;
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", this.passwordValidators, AuthValidators.notContainUserName(this.firstName, this.lastName)]
    });
  }

  onLogin(): void {
    this.submitted = true;
    if (this.formIsValid()) {
      console.log(this.loginForm.value);
      localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      this.authService.login({
        firstName: this.loginForm.value.firstName,
        lastName: this.loginForm.value.lastName,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }).subscribe(result => {
        alert(result)
      });
    }
  }

  private subscribeToFormChanges() {
    const firstNameControl = this.loginForm.get('firstName');
    const lastNameControl = this.loginForm.get('lastName');
    if (firstNameControl) {
      firstNameControl.valueChanges.subscribe(val => {
        const passwordControl = this.loginForm.get('password');
        this.firstName = val;
        passwordControl?.setValidators([...this.passwordValidators,
          AuthValidators.notContainUserName(this.firstName, this.lastName)]);
        // firstNameControl?.updateValueAndValidity();
        // lastNameControl?.updateValueAndValidity();
        passwordControl?.updateValueAndValidity();
      });
    }
    if (lastNameControl) {
      lastNameControl.valueChanges.subscribe(val => {
        this.lastName = val;
        const passwordControl = this.loginForm.get('password');
        passwordControl?.setValidators([...this.passwordValidators,
          AuthValidators.notContainUserName(this.firstName, this.lastName)]);
        // firstNameControl?.updateValueAndValidity();
        // lastNameControl?.updateValueAndValidity();
        passwordControl?.updateValueAndValidity();
      });
    }
  }

  private formIsValid() {
    // return this.loginForm.valid
    /* TODO:  Normally we should be able to reference the loginForm.valid property, but since we are dynamically adding
    validators, this property does not update properly.  We need to research this in conjunction with the
    updateValueAndValidity(), but I could not get that to work and hence add this method.
     */
    let isValid = true;
    Object.keys(this.loginForm.controls).forEach(key => {
      isValid = isValid && this.loginForm.get(key)?.errors == null;
    });
    return isValid;
  }
}
