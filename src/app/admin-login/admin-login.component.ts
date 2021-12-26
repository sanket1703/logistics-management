import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../shared/login';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  ADMINS: Login[];
  errMess: string;

  @ViewChild('lform') AdminLoginFormDirective;
  AdminLoginForm: FormGroup;
  adminDetail: Login = { id: 0, email: '', password: '', name: '' };

  adminFound = false;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 3 characters long.',
      'maxlength': 'Username cannot be more than 25 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 3 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    }
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginDetailsService: LoginDetailsService) {
    this.createForm();
  }

  ngOnInit() {
    this.getRecordsfromDatabase();
  }

  /** 
  * @desc Getting Admin login records form the database  
  **/
  getRecordsfromDatabase() {
    this.loginDetailsService.getAdminLoginDetailsf().subscribe(loginDetails => {
      this.ADMINS = loginDetails.map(data => {
        return {
          email: data.payload.doc.id,
          ...data.payload.doc.data() as {}
        } as Login;
      });
    });
  }

  createForm(): void {
    this.AdminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    });


    this.AdminLoginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.AdminLoginForm) { return; }
    const form = this.AdminLoginForm;
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
  * @desc Checking username and password in stored records  
  **/
  onLoginSubmit() {
    this.adminDetail = this.AdminLoginForm.value;
    for (var i = 0; i < this.ADMINS.length; i++) {
      if (this.ADMINS[i].email == this.adminDetail.email) {
        if (this.ADMINS[i].password == this.adminDetail.password) {
          this.adminFound = true;
          this.adminDetail.name = this.ADMINS[i].name;
        }
      }
    }
    if (this.adminFound == true) {
      this.router.navigate(['/admin/home']);
    }
    else {
      alert("Enter valid username and password!");
    }
    this.AdminLoginForm.reset({
      email: '',
      password: ''
    });
    this.AdminLoginFormDirective.resetForm();
  }

}
