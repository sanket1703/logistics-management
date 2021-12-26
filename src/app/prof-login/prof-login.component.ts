import { collection, getDocs, query, where } from "firebase/firestore";  
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';
import { Login } from '../shared/login';
import { Prof } from '../shared/prof';

@Component({
  selector: 'app-prof-login',
  templateUrl: './prof-login.component.html',
  styleUrls: ['./prof-login.component.scss']
})
export class ProfLoginComponent implements OnInit {

  constructor(private loginDetailsService: LoginDetailsService,
    private router: Router,
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getRecordsfromDatabase();
  }

  PROFS: Prof[];
  errMess: string;

  profFound = false;

  @ViewChild('lform') loginFormDirective;
  loginForm: FormGroup;
  profDetail: Prof = { id: 0, email: '', password: '', name: '' ,subscription:''};

  getRecordsfromDatabase() {
    
    this.loginDetailsService.getProfLoginDetails().subscribe(loginDetails => {

      
      this.PROFS = loginDetails.map(data => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as Prof
        } 
      });
    })
    

    
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

    if(this.profFound == true)
    {
      console.log(this.profDetail.id)
      localStorage.setItem('id',String(this.profDetail.id))
      this.router.navigate(['/prof/home', this.profDetail.id]);
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

  

}
