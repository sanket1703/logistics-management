import { LoginDetailsService } from './../services/login-details.service';
import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Login } from '../shared/login';
import { UserDetails } from '../shared/userDetails';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  uid: number;
  User: UserDetails;
  errMess: string;
  getUser: any;

  constructor(private route: ActivatedRoute,
    private loginDetailsService: LoginDetailsService) { }

  ngOnInit() {
    const uid = this.route.snapshot.params['uid'];
    this.getUserFromDatabase(uid);
  }

  /** 
  * @desc Getting Specific user login records form the database  
  **/

  getUserFromDatabase(uid: string) {
    this.loginDetailsService.getUser(uid)
      .then(userDetails => {
        this.getUser = userDetails;
        this.User = this.getUser;
       
      },
        errmess => this.errMess = <any>errmess);
  }

}
