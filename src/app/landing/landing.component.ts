import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';
import { Login } from '../shared/login';
import { Prof } from '../shared/prof';
import { UserDetails } from '../shared/userDetails';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  USERS: UserDetails[];
  PROFS: Prof[];
  ADMINS: Login[];

  errMess: string;

  @ViewChild('lform') loginFormDirective;
  loginForm: FormGroup;

  userDetail: UserDetails = { id: 0, email: '', password: '', subscription : '', professor:'',isActive: false};

  profDetail: Prof = {id:0,email : '', password:'',name:'',subscription:''};

  adminDetail: Login = { id: 0, email: '', password: '', name: '' };



  userFound = false;
  profFound = false;
  adminFound = false;

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

  ngOnInit(): void {
    this.getRecordsfromDatabase();
  }

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

    this.loginDetailsService.getProfLoginDetails().subscribe(loginDetails => {

      
      this.PROFS = loginDetails.map(data => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as Prof
        } 
      });
    })

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

  onLoginSubmit() {

    this.userDetail = this.loginForm.value;

    // Check for student users login
    for (var i = 0; i < this.USERS.length; i++) {

      if (this.USERS[i].email == this.userDetail.email) {

        if(this.USERS[i].isActive == false){
          alert("Subscription Expired")
        }
        else{
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

    // Check for professor login 
    this.profDetail = this.loginForm.value;
    console.log(this.profDetail)
    for (var i = 0; i < this.PROFS.length; i++) {
      if (this.PROFS[i].email == this.profDetail.email) {
        if (this.PROFS[i].password == this.profDetail.password) {
          this.profFound = true;
          this.profDetail.name = this.PROFS[i].name;
          this.profDetail.id = this.PROFS[i].id;
        }
      }
    }

    // Check for admin login 
    this.adminDetail = this.loginForm.value;
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

    if(this.profFound == true)
    {
      console.log(this.profDetail.id)
      localStorage.setItem('id',String(this.profDetail.id))
      this.router.navigate(['/prof/home', this.profDetail.id]);
    }


    if (this.userFound == true) {
      
      console.log('Prof in Login',this.userDetail.professor)
      console.log(this.userDetail)
      localStorage.setItem('profId',this.userDetail.professor)
      localStorage.setItem('subId',this.userDetail.subscription)

      this.router.navigate(['/user/home', this.userDetail.id]);
    }


    if(this.userFound == false && this.profFound == false && this.adminFound == false)
    {
      alert("No login credentials found!")
    }

    this.loginForm.reset({
      email: '',
      password: ''
    });

    this.loginFormDirective.resetForm();
  }



}
