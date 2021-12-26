import { LoginDetailsService } from './../services/login-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  USERS: User[];

  @ViewChild('sform') signupFormDirective;
  signupForm: FormGroup;
  userDetailcopy: User = { id: 0, email: '', password: '', name: '' , subscription : 0};
  userDetail: User = { id: 0, email: '', password: '', name: '' ,subscription : 0};
  errMess: string;

  formErrors = {
    'name': '',
    'email': '',
    'password': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    }
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginDetailsService: LoginDetailsService) {
    this.createForm();
  }

  ngOnInit() {
    // Initialising the USER list
    this.getRecordsfromDatabase();
  }

  /** 
  * @desc Getting User login records form the database  
  **/

  getRecordsfromDatabase() {
    this.loginDetailsService.getLoginDetailsf().subscribe(loginDetails => {
      this.USERS = loginDetails.map(data => {
        return {
          email: data.payload.doc.id,
          ...data.payload.doc.data() as {}
        } as User;
      });
    });
  }


  createForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });

    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }


  /** 
  * @desc onSubmit on signupForm submission to render data and post new user to Database  
  **/

  onSignupSubmit() {
    this.userDetailcopy = this.signupForm.value;
    this.userDetailcopy.id = this.USERS.length;
    this.userDetailcopy.subscription = 0

    this.putLoginDetails(this.userDetailcopy);
    this.signupForm.reset({
      email: '',
      password: ''
    });
    this.signupFormDirective.resetForm();
    this.router.navigate(['/admin/home']);
  }

  /** 
  * @desc Post new user's data to Database  
  **/

  putLoginDetails(userDetail: User) {
    this.loginDetailsService.putLoginDetailsf(userDetail);
    alert(userDetail.subscription);
  }
}