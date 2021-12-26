import { LoginDetailsService } from './../services/login-details.service';
import { Component, OnInit } from '@angular/core';
import { Login } from '../shared/login';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Prof } from '../shared/prof';

@Component({
  selector: 'app-existing-users',
  templateUrl: './existing-users.component.html',
  styleUrls: ['./existing-users.component.scss']
})
export class ExistingUsersComponent implements OnInit {

  userRecords: Login[];
  errMess: string;
  norecordsShow = false;
  userRecordsShow = true;
  recordsShow = false;
  flag: object;

  constructor(private router: Router,
    private loginDetailsService: LoginDetailsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getRecordsfromDatabase();
  }
  
  /** 
  * @desc Getting User login records form the database  
  **/

  getRecordsfromDatabase() {
    this.loginDetailsService.getProfLoginDetailsf().subscribe(loginDetails => {
      this.userRecords = loginDetails.map(data => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as Prof
        } ;
      });
      this.onServerLoad();
    });
  }
  
  /** 
  * @desc Checking whether there are records to show or not  
  **/

  onServerLoad() {
    if (this.userRecords.length == 0)
      this.norecordsShow = true;
    else
      this.recordsShow = true;
    this.userRecordsShow = false;
  }
  
 
  /** 
  * @desc Delete User from database corresponding to uid
  **/

  deleteUser(uid: number) {
    let ch = prompt("Delete User?Y or N?");
    ch = ch.toLowerCase();
    if (ch == 'y') {
      this.deleteRecordfromDatabase(uid);
      this.router.navigate(['/admin/home']);
    }
  }

  deleteRecordfromDatabase(uid: number) {
    this.loginDetailsService.deleteUserf(uid);
    alert("User Deleted");
  }

  getUserDetails(id: number){
    return this.userRecords[id];
  }

  openUpdateUser(id: number) {
    const loginDetails = this.getUserDetails(id);
    this.dialog.open(UpdateUserComponent, {
      width: '500px', height: '450px',
      data: loginDetails
    });
  }

}
