import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';
import { Prof } from '../shared/prof';
import { GameDetailsService } from '../services/game-details.service';
import { GameDetails } from '../shared/gameDetails';
import { GameDetail } from '../shared/GameDetail';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-prof-signup',
  templateUrl: './prof-signup.component.html',
  styleUrls: ['./prof-signup.component.scss']
})
export class ProfSignupComponent implements OnInit {

  PROFS: Prof[];

  @ViewChild('sform') signupFormDirective;
  signupForm: FormGroup;
  profDetailcopy: Prof = { id: 0, email: '', password: '', name: '' ,subscription:''};
  profDetail: Prof = { id: 0, email: '', password: '', name: '',subscription:'' };
  errMess: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginDetailsService: LoginDetailsService,
    private gameDetailsService : GameDetailsService,
    private firestore:AngularFirestore) {
    this.createForm();
  }

  ngOnInit(): void {
    
    // Init the PROFS list

  }

  getRecordsfromDatabase(){

    // Get the profs data from the DB

  }

  onSignupSubmit(): void {

    // Do stuff to add the new data to the db 
    this.profDetailcopy = this.signupForm.value;
    this.profDetailcopy.subscription = ''

    this.signupForm.reset({
      email: '',
      password: ''
    });
    this.signupFormDirective.resetForm();
    this.firestore.collection("profLoginDetails").add(this.profDetailcopy).then(docRef=>{
      
      this.gameDetailsService.putGameDetailsf(GameDetails,docRef.id)
    })
    
    this.router.navigate(['/prof/home']);

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

}
