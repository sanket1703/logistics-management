import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/login';
import { LoginDetailsService } from './../services/login-details.service';
import { UserDetails } from '../shared/userDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  USERS: UserDetails[];
  errMess: string;

  @ViewChild('lform') loginFormDirective;
  loginForm: FormGroup;
  userDetail: UserDetails = { id: 0, email: '', password: '', subscription : '', professor:'',isActive: false};

  userFound = false;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
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

  constructor(private loginDetailsService: LoginDetailsService,
    private router: Router,
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.getRecordsfromDatabase();
  }

  /** 
  * @desc Getting User login records form the database  
  **/

  getRecordsfromDatabase() {
    console.log('Check',this.loginDetailsService.getLoginDetailsf())
    this.loginDetailsService.getLoginDetailsf().subscribe(loginDetails => {
      this.USERS = loginDetails.map(data => {
        console.log(data.payload.doc.id)
        console.log(data.payload.doc.data())
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as UserDetails
        } 
      });
    });
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
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
  * @desc To check the login credentials entered by the User is present in Database  
  **/

  onLoginSubmit() {
    this.userDetail = this.loginForm.value;
    for (var i = 0; i < this.USERS.length; i++) {
      if (this.USERS[i].email == this.userDetail.email) {

        if(this.USERS[i].isActive == false){
          alert("Subscription Expired")
        }else{
          if (this.USERS[i].password == this.userDetail.password) {
            this.userFound = true;
            this.userDetail.id = this.USERS[i].id;
            this.userDetail.email = this.USERS[i].email
            this.userDetail.professor = this.USERS[i].professor
            this.userDetail.subscription = this.USERS[i].subscription
            this.userDetail.isActive = this.USERS[i].isActive
          }

        }
        
      }
      
    }
    if (this.userFound == true) {
      
      console.log('Prof in Login',this.userDetail.professor)
      console.log(this.userDetail)
      localStorage.setItem('profId',this.userDetail.professor)
      localStorage.setItem('subId',this.userDetail.subscription)

      this.router.navigate(['/user/home', this.userDetail.id]);
    }
    else {
      alert("Enter valid email id and password!")
    }
    this.loginForm.reset({
      email: '',
      password: ''
    });
    this.loginFormDirective.resetForm();
  }
}
