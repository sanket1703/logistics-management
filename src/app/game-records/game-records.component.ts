import { Component, OnInit, Inject } from '@angular/core';
import { GamingDataService } from '../services/gaming-data.service';
import { userData } from '../shared/userData';
import { Login } from '../shared/login';
import { LoginDetailsService } from './../services/login-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-records',
  templateUrl: './game-records.component.html',
  styleUrls: ['./game-records.component.scss']
})
export class GameRecordsComponent implements OnInit {
  GameRecords: userData[];
  errMess: string;
  records: userData[];
  usernameUnique: string[] = [];
  unameFlag = true;
  
  USERS: Login[];
  userFound: Boolean = false;
  uid: number = -1;
    

  constructor(private gamingDataService: GamingDataService,
    private loginDetailsService: LoginDetailsService,
    private router: Router,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.getRecordsfromDatabase();
    this.getLoginRecordsfromDatabase();    
  }
  getLoginRecordsfromDatabase() {
    this.loginDetailsService.getLoginDetailsf().subscribe(loginDetails => {
      this.USERS = loginDetails.map(data => {
        return {
          email: data.payload.doc.id,
          ...data.payload.doc.data() as Login
        } 
      });
    });
  }
  

  /** 
  * @desc Getting Users Gaming Data form the database  
  **/

  getRecordsfromDatabase() {
    this.gamingDataService.getAllUserGamingDataf().subscribe(gData => {
      this.GameRecords = gData.map(data => {
        return {
          username: data.payload.doc.id,
          ...data.payload.doc.data() as userData
        }
      });
      this.records = this.GameRecords;
      this.uniqueUsernames();
    });
  }


  /** 
  * @desc Mapping only the unique usernames from the fetched data
  **/

  uniqueUsernames() {
    for (let record of this.records) {
      this.unameFlag = true;
      for (let uname of this.usernameUnique) {
        if (record.username == uname) {
          this.unameFlag = false;
        }
      }
      if (this.unameFlag == true) {
        this.usernameUnique.push(record.username);
      }
    }
  }

  /**
   * @desc To jump to the records of the user clicked
   */
  jumpToRecords(username: string) {
    console.log(username);
    this.getLoginRecordsfromDatabase();
    for (var i = 0; i < this.USERS.length; i++) {
      if (this.USERS[i].email == username) {
        this.uid = this.USERS[i].id;
        this.userFound = true;
        break;
      }
    }
    if (this.userFound == true) {
      this.router.navigate(['/admin/record', this.uid]);
    }
    
  }

}
