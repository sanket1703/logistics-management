import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { userData } from '../shared/userData';
import { GamingDataService } from '../services/gaming-data.service';
import { LoginDetailsService } from '../services/login-details.service';
import { Login } from '../shared/login';

export interface userRecordTable {
  week: number;
  stock: number;
  cPrice: number;
  cDemand: number;
  orderRoad: number;
  orderRail: number;
  inventoryCost: number;
  backlogCost: number;
  demmurageCost: number;
  transportationCost: number;
  totalCost: number;
}

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.scss']
})
export class UserRecordsComponent implements OnInit {

  displayedColumns: string[] = ["week", "stock", "cPrice", "cDemand", "orderRoad", "orderRail", "inventoryCost", "backlogCost", "demmurageCost", "transportationCost", "totalCost"];
  data: userRecordTable[][] = [];
  ELEMENT_DATA: userRecordTable;
  DataElement: userRecordTable[] = [];

  USERS: userData[];
  User: Login = {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  getUser: any;
  uname: string;
  userRecords: userData[] = [];
  user = false;
  admin = false;
  errMess: string;
  norecordsShow = false;
  record: userRecordTable[] = [];
  gameNo: number;
  gameNoshow = false;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private gamingDataService: GamingDataService,
    private loginDetailsService: LoginDetailsService) { }

  ngOnInit() {
    const uid = this.checkUserorAdmin();

    this.getRecordsfromDatabase();

    this.getLoginRecordsfromDatabase(uid);
  }

  /** 
  * @desc To check whether request is sent by Admin or User   
  **/

  checkUserorAdmin() {
    const user = this.route.snapshot.url[0].path;
    if (user == 'user')
      this.user = true;
    else
      this.admin = true;
    return this.route.snapshot.params['uid'];
  }


  /** 
  * @desc Getting User Gaming Data records form the database  
  **/

  getRecordsfromDatabase() {
    this.gamingDataService.getAllUserGamingDataf().subscribe(gameData => {
      this.USERS = gameData.map(data => {
        return {
          username: data.payload.doc.id,
          ...data.payload.doc.data() as userData
        }
      })
    });
  }

  /** 
  * @desc Getting User login records form the database  
  **/

  getLoginRecordsfromDatabase(uid: any) {
    this.loginDetailsService.getUser(uid)
      .then(data => {
        this.getUser = data;
        this.User = this.getUser;
        this.getRecords();
      });
  }

  /** 
  * @desc Getting User's gaming records form the database  
  **/

  getRecords() {
    this.uname = this.User.email;

    for (let user of this.USERS) {
      if (user.username == this.uname) {
        this.userRecords.push(user);
        this.norecordsShow = false;
      }
    }
    if (this.userRecords.length == 0)
      this.norecordsShow = true;

    if (this.norecordsShow == false) {
      for (let record of this.userRecords) {
        this.DataElement = [];
        for (let i of this.arrayTwo(record.inventoryItems.length)) {
          this.ELEMENT_DATA = {
            week: i + 1,
            stock: record.inventoryItems[i],
            cPrice: record.gameDetails.wpcs[i].price,
            cDemand: record.gameDetails.wpcs[i].cDemand,
            orderRoad: record.orderRoad[i],
            orderRail: record.orderRail[i],
            inventoryCost: record.inventoryCost[i],
            backlogCost: record.backlogCost[i],
            demmurageCost: record.demmurageCosts[i],
            transportationCost: record.demmurageCosts[i],
            totalCost: record.totalCosts[i]
          }
          this.DataElement.push(this.ELEMENT_DATA);
        }
        this.data.push(this.DataElement);
        console.log('data:',this.data)
      }
    }
  }

  recordsShow(i: number){
    this.record = this.data[i-1];
    this.gameNo = i;
    this.gameNoshow = true;
    console.log('Check data',this.data[i])
  }

  goBack(): void {
    this.location.back();
  }

  /** 
  * @desc To get an array of n numbers length with values stored sequentially upto n  
  **/

  arrayTwo(n: number): number[] {
    return Array.from(Array(n).keys());
  }
}