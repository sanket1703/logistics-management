import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../shared/subscription';
import { Prof } from '../shared/prof';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-prof-new-subscription',
  templateUrl: './prof-new-subscription.component.html',
  styleUrls: ['./prof-new-subscription.component.scss']
})
export class ProfNewSubscriptionComponent implements OnInit {



  constructor(private subscriptionService: SubscriptionService,
    private loginDetailsService: LoginDetailsService,
    private router: Router,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    @Inject('BaseURL') private baseURL) {
    this.createForm();
  }

  formErrors = {
    'startDate': new Date(),
    'endDate': new Date(),
    'userEmails': ""
  };

  startDate = new Date()
  endDate = new Date()
  userEmails = ""

  validationMessages = {

    'startDate': {
      'required': 'Start date is required.',
 
    },
    'endDate': {
      'required': 'End date is required.',

    },
    'userEmails': {
      'required': 'Alteast one user email is required.',

    }
  };

  ngOnInit(): void {
  }
  
  errMess: string;

  @ViewChild('lform') subscriptionFormDirective;
  subscriptionForm: FormGroup;
  subscriptionDetail: Subscription = { id: 0, profId: '', isActive: false, name: '' ,startDate: "", endDate: "", duration:0,userEmails:[]};

  createForm(): void {

    

    // this.subscriptionForm = this.fb.group({
    //   startDate: [new Date(), [Validators.required]],
    //   endDate: [new Date(), [Validators.required]],
    //   userEmails : [[],[Validators.required]]
    // });
    this.subscriptionForm = this.fb.group({
      startDate : new FormControl(),
      endDate : new FormControl(),
      userEmails : ''
    });
    // this.subscriptionForm.valueChanges
    //   .subscribe(data => this.onValueChanged(data));

    // this.onValueChanged();
  }

  processEmails(emailString)
  {
      var emails;
      var trimedEmail=new Array();

      emails = emailString.split(',')
      for(var email in emails){
          trimedEmail.push(emails[email].trim())
      }

      return trimedEmail
  }

  getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  toDDMMYYYY(d) {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = (d.getDate() + 100).toString().slice(-2);
    return dd +'-'+ mm+'-' +yyyy;
  }
  isSubFromToday(date1)
  {
    var date = new Date()
    if(date1 == this.toDDMMYYYY(date))
    {
      return true
    }
    return false
  
  }

  onValueChanged(data?: any) {

    if (!this.subscriptionForm) { return; }
    const form = this.subscriptionForm;
    for (const field in this.subscriptionForm) {
      if (this.subscriptionForm.hasOwnProperty(field)) {
        this.subscriptionForm[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.subscriptionForm[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  onSubscribeSubmit(data) {
    console.log(data)
    
    var profDetails: Prof
    var subs = ''

    this.subscriptionDetail.startDate = this.toDDMMYYYY(data.startDate)
    this.subscriptionDetail.endDate = this.toDDMMYYYY(data.endDate)
    this.subscriptionDetail.duration = this.getDifferenceInDays(data.startDate,data.endDate)
    if(this.isSubFromToday(this.subscriptionDetail.startDate))
    {
      this.subscriptionDetail.isActive = true
    }
    else{
      this.subscriptionDetail.isActive = false
    }
    
    this.subscriptionDetail.userEmails = this.processEmails(data.userEmails)
    this.subscriptionDetail.profId = localStorage.getItem('id')
    
    console.log('Final Payload',this.subscriptionDetail)

    this.subscriptionService.addNewSubscription(this.subscriptionDetail)
    console.log("Subscription Id",localStorage.getItem('SubId'))
    setTimeout(
        () => this.subscriptionService.updateSubscription(localStorage.getItem('SubId'),localStorage.getItem('id')),8000)
    
    setTimeout(()=>{

      for ( var email in this.subscriptionDetail.userEmails)
      {

        // Send Emails
        
        // add to database
        this.firestore.collection('userLoginDetails').add({

          email : this.subscriptionDetail.userEmails[email],
          password : "123456789",
          professor : localStorage.getItem('id'),
          subscription : localStorage.getItem('SubId'),
          isActive : true

        })

      }

    },8000)
    
    
    

    this.subscriptionForm.reset({
      'startDate': new Date(),
      'endDate': new Date(),
      'userEmails': ''
    });

    this.subscriptionFormDirective.resetForm();
    this.router.navigate(['/prof/home',localStorage.getItem('id')])
      
  
  
  }
  
}
