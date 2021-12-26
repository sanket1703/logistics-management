import { GameDetail } from './../shared/GameDetail';
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { userData } from '../shared/userData';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GameDetailsService } from '../services/game-details.service';
import { GamingDataService } from '../services/gaming-data.service';
import { ActivatedRoute } from '@angular/router';
import { Login } from '../shared/login';
import { LoginDetailsService } from '../services/login-details.service';
import { GameEndComponent } from '../game-end/game-end.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-user-gaming',
  templateUrl: './user-gaming.component.html',
  styleUrls: ['./user-gaming.component.scss']
})
export class UserGamingComponent implements OnInit {

  @ViewChild('oform') orderFormDirecive;
  orderForm: FormGroup;
  userData: userData;
  userDatacopy: userData = {
    id: 0,
    username: '',
    gameDetails: {
      professor:"",
      id: "0",
      invCostFactor: 0,
      backlogCostFactor: 0,
      demmurageCostFactor: 0,
      stockInitial: 0,
      storageTotal: 0,
      weeksTotal: 0,
      truckLeadTime: 0,
      trainLeadTime: 0,
      truckFreightRate: 0,
      trainFreightRate: 0,
      wpcs: [
        {
          week: 0,
          price: 0,
          cDemand: 0
        }
      ]

    },
    orderRoad: [],
    orderRail: [],
    inventoryItems: [],
    inventoryCost: [],
    backlogItems: [],
    backlogCost: [],
    demumurageItems: [],
    demmurageCosts: [],
    transportationCosts: [],
    totalCosts: [],
    totalCost: 0,
    professor:''
  };

  invCostFactor: number;
  backlogCostFactor: number;
  demmurageCostFactor: number;

  errMess: string;
  orderRoad: number[] = [];
  orderRail: number[] = [];
  submitShow = false;
  orderFormShow = true;
  totalWeeks: number;
  uname: string = '';
  id: number;

  initialStock: number;
  totalStorage: number;
  availableStorage: number[] = [];
  inventoryStock: number[] = [];
  backlogItems: number[] = [];
  demmurageItems: number[] = [];
  cFulfilledDemands: number[] = [];

  currentStock: number;
  totalDemand: number;
  cFulfilledDemand: number;
  backlogItem: number;
  availStorage: number;
  demmurageItem: number;

  invCost: number;
  blogCost: number;
  demCost: number;
  truckTransportCost: number;
  trainTransportCost: number;
  transportCost: number;
  totalCost: number;
  invCosts: number[] = [];
  blogCosts: number[] = [];
  demCosts: number[] = [];
  transportCosts: number[] = [];
  totalCosts: number[] = [];
  weeklyTotalCost: number;
  weeklyTotalCosts: number[] = [];

  gDetailArr: GameDetail[];
  gDetail: GameDetail;
  gDetailsShow = true;
  start = false;
  week = 1;

  invCostProdFactor: number;
  backlogCostProdFactor: number;
  demProdFactor: number;

  User: Login = { id: 0, email: "", password: "", name: "" };
  getUser: any;
  uid: number;

  receiptsAll: number[] = [];
  balanceStock: number[] = [];
  shortageAll: number[] = [];
  warehouseStock: number[] = [];
  demand: number;
  receipt: number;
  balance: number;
  shortage: number;
  warehouse: number;

  truckLeadTime: number;
  trainLeadTime: number;
  trainReceipt: number;
  truckReceipt: number;
  truckFreightRate: number;
  trainFreightRate: number;

  formErrors = {
    'orderRoad': '',
    'orderRail': ''
  };

  validationMessages = {
    'orderRoad': {
      'required': 'Order by road is required(Enter 0).',
      'pattern': 'Order by road must contain only numbers.',
    },
    'orderRail': {
      'required': 'orderRail is required.',
      'pattern': 'orderRail must contain only numbers.',
    }
  };

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private gameDetailsService: GameDetailsService,
    private gamingDataService: GamingDataService,
    private loginDetailsService: LoginDetailsService) {
    this.createForm();
  }

  ngOnInit() {
    this.getGameDetailsRecordfromDatabase();
    const uid = this.getUIDfromURL();
    this.uid = uid;
    this.getLoginDetailsRecordfromDatabase(uid);
    this.getUserGamingDataRecordfromDatabase();
  }

  /** 
  * @desc Getting Game Details record form the database  
  **/

  getGameDetailsRecordfromDatabase() {
    console.log('Prof',localStorage.getItem('profId'))

    this.gameDetailsService.getGameDetail(localStorage.getItem('profId'))
      .then(data => {
        this.gDetail =  data as GameDetail
        console.log(this.gDetail)
      });

    // this.gameDetailsService.getGameDetail(localStorage.getItem('profId')).subscribe(gameData => {
    //   this.gDetailArr = gameData.map(data => {
    //     console.log('G details',data)
    //     return {
    //       id: data.payload.doc.id,
    //       ...data.payload.doc.data() as GameDetail
    //     }
    //   });
    //   this.gDetail = this.gDetailArr[0];
      
    // });
  } 

  /** 
  * @desc Getting Specific user login records form the database  
  **/

  getLoginDetailsRecordfromDatabase(uid: any) {
    this.loginDetailsService.getUser(uid)
      .then(data => {
        this.getUser = data;
        this.User = this.getUser;
      });
  }

  /** 
  * @desc Getting User gaming data records form the database  
  **/

  getUserGamingDataRecordfromDatabase() {
    this.gamingDataService.getAllUserGamingDataf().subscribe(gameData => {
      this.id = gameData.length;
    });
  }

  /** 
  * @desc Getting User unique id from URL  
  **/

  getUIDfromURL() {
    return this.route.snapshot.params['uid'];
  }

  /** 
  * @desc Initializing variables of game details from the fetched details from Database 
  * once the server gets loaded  
  **/

  onServerLoad() {
    this.uname = this.User.email;

    this.start = true;
    this.initialStock = this.gDetail.stockInitial;
    this.totalStorage = this.gDetail.storageTotal;
    this.totalWeeks = this.gDetail.weeksTotal;
    this.inventoryStock.push(this.initialStock);
    this.currentStock = this.initialStock;
    this.demand = this.gDetail.wpcs[this.week - 1].cDemand;
    this.totalDemand = this.demand;

    //Lead Time
    this.truckLeadTime = this.gDetail.truckLeadTime;
    this.trainLeadTime = this.gDetail.trainLeadTime;
    this.truckFreightRate = this.gDetail.truckFreightRate;
    this.trainFreightRate = this.gDetail.trainFreightRate;
    
    this.invCostFactor = this.gDetail.invCostFactor;
    this.backlogCostFactor = this.gDetail.backlogCostFactor;
    this.demmurageCostFactor = this.gDetail.demmurageCostFactor;
    this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[0].price;
    this.backlogCostProdFactor = this.backlogCostProdFactor * this.gDetail.wpcs[0].price;
    this.demProdFactor = this.demProdFactor * this.gDetail.wpcs[0].price;
    
    //cfullfilled
    if (this.totalDemand < this.inventoryStock[this.inventoryStock.length - 1]) {
      this.cFulfilledDemand = this.totalDemand;
      this.backlogItem = 0;
    }
    else {
      this.cFulfilledDemand = this.inventoryStock[this.inventoryStock.length - 1];
      this.backlogItem = this.totalDemand - this.inventoryStock[this.inventoryStock.length - 1];
    }
    this.cFulfilledDemands.push(this.cFulfilledDemand);

    this.backlogItems.push(this.backlogItem);

    this.demmurageItem = 0;
    this.demmurageItems.push(this.demmurageItem);

    //Reciept = 0 in first week
    this.receipt = 0;
    this.receiptsAll.push(this.receipt);
    
    //Balance Stock
    this.balance = this.currentStock + this.receipt - this.cFulfilledDemand;
    this.balanceStock.push(this.balance);
    
    //Storage
    this.shortage = Math.max(0,this.totalDemand - this.currentStock - this.receipt);
    this.shortageAll.push(this.shortage);

    //Warehouse    
    this.warehouse = Math.min(this.balance,this.totalStorage);
    this.warehouseStock.push(this.warehouse);
    
    //costs
    this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.backlogCostProdFactor = this.backlogCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.demProdFactor = this.demmurageCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.invCost = this.inventoryStock[this.inventoryStock.length - 1] * this.invCostProdFactor;
    this.blogCost = this.backlogItems[this.backlogItems.length - 1] * this.backlogCostProdFactor;
    this.demCost = this.demmurageItems[this.demmurageItems.length - 1] * this.demProdFactor;
    this.transportCost = 0;
    this.invCosts.push(this.invCost);
    this.blogCosts.push(this.blogCost);
    this.demCosts.push(this.demCost);
    this.transportCosts.push(this.transportCost);

    this.totalCost = this.invCost + this.blogCost + this.demCost + this.transportCost;
    this.weeklyTotalCost = this.totalCost;
    this.totalCosts.push(this.totalCost);
    this.weeklyTotalCosts.push(this.weeklyTotalCost);
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      orderRoad: [0, [Validators.required, Validators.pattern]],
      orderRail: [0, [Validators.required, Validators.pattern]],
    });

    this.orderForm.valueChanges
      .subscribe(data => this.onValueChanged(data),
        errmess => this.errMess = <any>errmess);

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.orderForm) { return; }
    const form = this.orderForm;
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

  /** 
  * @desc Function where all calculations is done  
  **/
/**
       * 1 	Initial Stock for Week 1 =  	2000
            Initial Stock for Week all other periods = 	Balance Stock
              
          2 	Backlog for Week 1 =  	0
            Backlog for remaining Week  =  	Shortage of Previous Week
              
          3 	Receipts = 	Orders Delivered by Road + orders Deliverd by Rail
              
          4 	To be Supplied = 	Demand + backlog for that week
              
          5 	Supplied = 	minimum of (demand + backlog, Initial Stocks + Receipts)
              
          6 	Balance Stock = 	Initial Stock + Receipts - Supplied
              
          7 	Shortage = 	maximum of (0, demand - backlog- Initial Stock + Receipts)
              
          8 	Total Storage 	As decided by Admin
              
          9 	In warehouse 	minimum of (Balance Stock, total storage)
              
          10 	In Demurage 	balance stock - warehouse

       */
  calculateStocks() {
    //Initial Stock and Backlog
    //Initial Stock
    this.currentStock = this.balanceStock[this.week - 1];
    //Backlog
    this.backlogItem = this.shortageAll[this.week - 1];

    //Receipts
    if((this.orderRoad.length - this.truckLeadTime) < 0)
      this.truckReceipt = 0;
    else
      this.truckReceipt = this.orderRoad[this.orderRoad.length - this.truckLeadTime];
    
    if((this.orderRoad.length - this.trainLeadTime) < 0)
      //if((this.week - 1) < this.trainLeadTime)
      this.trainReceipt = 0;
    else
      this.trainReceipt = this.orderRail[this.orderRoad.length - this.trainLeadTime];
    this.receipt = this.trainReceipt + this.truckReceipt;

    //Stock
    this.inventoryStock.push(this.currentStock);
    this.backlogItems.push(this.backlogItem);
    this.receiptsAll.push(this.receipt);

    //To be supplied - totalDemand
    this.demand = this.gDetail.wpcs[this.week].cDemand;
    this.totalDemand = this.demand + this.backlogItem;

    //Supplied
    this.cFulfilledDemand = Math.min(this.totalDemand,this.currentStock + this.receipt);
    this.cFulfilledDemands.push(this.cFulfilledDemand);
    
    //Balance Stock
    this.balance = this.currentStock + this.receipt - this.cFulfilledDemand;
    this.balanceStock.push(this.balance);

    //Storage
    this.shortage = Math.max(0,this.totalDemand - this.currentStock - this.receipt);
    this.shortageAll.push(this.shortage);

    //In warehouse
    this.warehouse = Math.min(this.balance,this.totalStorage);
    this.warehouseStock.push(this.warehouse);

    //Demurrage
    this.demmurageItem = this.balance - this.warehouse;
    this.demmurageItems.push(this.demmurageItem);

    //Costs
    this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.backlogCostProdFactor = this.backlogCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.demProdFactor = this.demmurageCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    
    this.trainTransportCost = this.trainFreightRate * Math.min(this.orderRail[this.orderRail.length - 1],400);
    this.truckTransportCost = this.truckFreightRate * this.orderRoad[this.orderRoad.length - 1]
    this.transportCost = this.trainTransportCost + this.truckTransportCost; 
    
    this.invCost = this.inventoryStock[this.inventoryStock.length - 1] * this.invCostProdFactor;
    this.blogCost = this.backlogItems[this.backlogItems.length - 1] * this.backlogCostProdFactor;
    this.demCost = this.demmurageItems[this.demmurageItems.length - 1] * this.demProdFactor;

    this.invCosts.push(this.invCost);
    this.blogCosts.push(this.blogCost);
    this.demCosts.push(this.demCost);
    this.transportCosts.push(this.transportCost);

    this.weeklyTotalCost = this.invCost + this.blogCost + this.demCost + this.transportCost;
    this.weeklyTotalCosts.push(this.weeklyTotalCost);
    this.totalCost = this.totalCost + this.invCost + this.blogCost + this.demCost + this.transportCost;
    this.totalCosts.push(this.totalCost);

  }
  
  /** 
  * @desc On submission of each order placed by the user  
  **/

  onOrderSubmit() {
    this.orderRoad.push(+this.orderForm.value['orderRoad']);
    this.orderRail.push(+this.orderForm.value['orderRail']);
    if (this.week < this.totalWeeks) {
      this.calculateStocks();
      this.orderForm.reset({
        orderRoad: 0,
        orderRail: 0
      });
      this.orderFormDirecive.resetForm({ orderRoad: 0, orderRail: 0 });
      this.week++;
    }
    else {
      this.orderFormShow = false;
      this.submitShow = true;
    }
  }

  /** 
  * @desc To get an array of n numbers length with values stored sequentially upto n  
  **/

  arrayTwo(n: number): number[] {
    return Array.from(Array(n).keys());
  }

  /** 
  * @desc After the final order placed,
  * to render data and submit the game records placed by the user   
  **/

  finalSubmit() {
    this.userDatacopy.id = this.id;
    this.userDatacopy.username = this.uname;
    this.userDatacopy.gameDetails = this.gDetail;
    this.userDatacopy.orderRoad = this.orderRoad;
    this.userDatacopy.orderRail = this.orderRail;
    this.userDatacopy.inventoryItems = this.inventoryStock;
    this.userDatacopy.backlogItems = this.backlogItems;
    this.userDatacopy.demumurageItems = this.demmurageItems;
    this.userDatacopy.inventoryCost = this.invCosts;
    this.userDatacopy.backlogCost = this.blogCosts;
    this.userDatacopy.demmurageCosts = this.demCosts;
    this.userDatacopy.transportationCosts = this.transportCosts;
    this.userDatacopy.totalCosts = this.totalCosts;
    this.userDatacopy.totalCost = this.totalCosts[this.totalCosts.length - 1];
    
    this.putUserGamingDatatoDatabase();
    
  }

  /** 
  * @desc To post the Game Records played by the user to Database  
  **/

  putUserGamingDatatoDatabase() {
    console.log(localStorage.getItem('profId'))
    this.userDatacopy.professor = localStorage.getItem('profId')

    this.gamingDataService.putUserGamingDataf(this.userDatacopy);
    this.userData = this.userDatacopy;
    this.openGameEnd();
  }

  /** 
  * @desc Open GameEnd Component as MatDialog to show final score and logout button  
  **/

  openGameEnd() {
    alert("Your total cost is: " + this.userDatacopy.totalCost)
    // this.dialog.open(GameEndComponent, {
    //   width: '50%', height: '100%',
    //   data: {
    //     finalScore: this.userData.totalCosts[this.userData.totalCosts.length - 1],
    //     uid: +this.uid
    //   }
    // });
  }
}