import { LoginDetailsService } from './../services/login-details.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Login } from '../shared/login';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  email: string;
  name: string;
  loginDetails: Login ={
    id: 0,
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router,
    private loginDetailsService: LoginDetailsService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loginDetails = this.data;
  }

  onSubmit() {
    this.loginDetails.email = this.email;
    this.loginDetails.name = this.name;
    this.loginDetailsService.putLoginDetailsf(this.loginDetails);  
    this.dialogRef.close();
    this.router.navigate(['admin/existingUsers/']);
  }

}