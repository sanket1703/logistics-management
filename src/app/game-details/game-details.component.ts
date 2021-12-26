import { GameDetailsService } from './../services/game-details.service';
import { GameDetail } from './../shared/GameDetail';
import { WPC } from './../shared/wpc';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  totalWeeks: number;
  totalStorage: number;
  initialStock: number;
  gDetail: GameDetail;
  wpcs: WPC[] = [];
  weeksAll: number[] = [];
  priceAll: number[] = [];
  cDemandAll: number[] = [];
  weeks: number = 1;
  id: string = "0";
  price: number=0;
  cDemand: number=0;
  gameDetailsArr: GameDetail[];
  gameDetails: GameDetail;
  errMess: string;
  twShow = true;
  wpcShow = false;
  show = false;
  submitShow = false;

  invCostFactor: number;
  backlogCostFactor: number;
  demmurageCostFactor: number;
  leadTimeTruck: number;
  leadTimeTrain: number;
  freightRateTruck: number;
  freightRateTrain: number;

  ELEMENT_DATA: GameDetail;
  dataSource: GameDetail[];
  uid: string;

  constructor(private router: Router,
    private gameDetailsService: GameDetailsService) { }

  ngOnInit() {
    console.log("Edit Details Sort")
    this.getRecordsfromDatabase();
  }
  
  /** 
  * @desc Getting Game Detail records form the database  
  **/

  // getRecordsfromDatabase() {
  //   console.log("Edit Details Sort")
  //   this.gameDetailsService.getGameDetail(localStorage.getItem('id')).subscribe(gameDetail => {
  //     this.gameDetailsArr = gameDetail.map(data => {
  //       return {
  //         id: data.payload.doc.id,
  //         ...data.payload.doc.data() as GameDetail
  //       } 
  //     });
  //     this.gameDetails = this.gameDetailsArr[0];
  //   });
  // }

  getRecordsfromDatabase() {
    console.log("Searching for this Prof",localStorage.getItem('id'))
      this.gameDetailsService.getGameDetail(localStorage.getItem('id'))
      .then(data => {
        this.gameDetails =  data as GameDetail
        console.log(this.gameDetails)
      });
    
  
  }

  /** 
  * @desc TWForm onSubmit  
  **/

  twOnSubmit() {
    this.twShow = false;
    this.wpcShow = true;
  }
  
  /** 
  * @desc WPCForm onSubmit  
  **/

  wpcOnSubmit() {
    this.show = true;
    //push
    this.weeksAll.push(this.weeks);
    this.priceAll.push(+this.price);
    this.cDemandAll.push(this.cDemand);

    //wpc push
    this.wpcs.push({
      week: +this.weeks,
      price: +this.price,
      cDemand: +this.cDemand
    });

    this.weeks++;

    if (this.weeks > this.totalWeeks) {
      this.wpcShow = false;
      this.submitShow = true;
    }
  }

  /** 
  * @desc Final form submission   
  **/

  onSubmit() {
    this.gDetail = {
      id: this.id,
      invCostFactor: this.invCostFactor,
      backlogCostFactor: this.backlogCostFactor,
      demmurageCostFactor: this.demmurageCostFactor,
      weeksTotal: +this.totalWeeks,
      storageTotal: +this.totalStorage,
      stockInitial: +this.initialStock,
      truckLeadTime: this.leadTimeTruck,
      trainLeadTime: this.leadTimeTrain,
      truckFreightRate: this.freightRateTruck,
      trainFreightRate: this.freightRateTrain,
      professor:localStorage.getItem('id'),
      wpcs: this.wpcs
    };
    this.putGameDetails(this.gDetail);
    this.router.navigateByUrl("prof/home/"+localStorage.getItem('id'));
  }

  /** 
  * @desc Posting Game Details to Database
  **/

  putGameDetails(gameDetail: GameDetail) {
    this.gameDetailsService.putGameDetailsf(gameDetail,localStorage.getItem('id'));
    alert("Game Details Updated!");
  }

  
  /** 
  * @desc To get an array of n numbers length with values stored sequentially upto n  
  **/

  arrayTwo(n: number): number[] {
    return Array.from(Array(n).keys());
  }
}