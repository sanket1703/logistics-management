/*
import { GameDetail } from './../shared/GameDetail';
import { Component, OnInit, ViewChild } from '@angular/core';
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
      id: "0",
      invCostFactor: 0,
      backlogCostFactor: 0,
      demmurageCostFactor: 0,
      stockInitial: 0,
      storageTotal: 0,
      weeksTotal: 0,
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
    totalCosts: [],
    totalCost: 0
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
  totalCost: number;
  invCosts: number[] = [];
  blogCosts: number[] = [];
  demCosts: number[] = [];
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

/*
  getGameDetailsRecordfromDatabase() {
    this.gameDetailsService.getGameDetailf().subscribe(gameData => {
      this.gDetailArr = gameData.map(data => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as GameDetail
        }
      });
      this.gDetail = this.gDetailArr[0];
    });
  }

  /** 
  * @desc Getting Specific user login records form the database  
  **/
/*
  getLoginDetailsRecordfromDatabase(uid: any) {
    this.loginDetailsService.getUserf(uid)
      .then(data => {
        this.getUser = data;
        this.User = this.getUser;
      });
  }

  /** 
  * @desc Getting User gaming data records form the database  
  **/
/*
  getUserGamingDataRecordfromDatabase() {
    this.gamingDataService.getAllUserGamingDataf().subscribe(gameData => {
      this.id = gameData.length;
    });
  }

  /** 
  * @desc Getting User unique id from URL  
  **/
/*
  getUIDfromURL() {
    return this.route.snapshot.params['uid'];
  }

  /** 
  * @desc Initializing variables of game details from the fetched details from Database 
  * once the server gets loaded  
  **/
/*
  onServerLoad() {
    this.uname = this.User.email;

    this.start = true;
    this.initialStock = this.gDetail.stockInitial;
    this.totalStorage = this.gDetail.storageTotal;
    this.totalWeeks = this.gDetail.weeksTotal;
    this.inventoryStock.push(this.initialStock);
    this.availStorage = this.totalStorage - this.initialStock;
    this.availableStorage.push(this.availStorage);
    this.currentStock = this.initialStock;
    this.totalDemand = this.gDetail.wpcs[this.week - 1].cDemand;

    this.invCostFactor = this.gDetail.invCostFactor;
    this.backlogCostFactor = this.gDetail.backlogCostFactor;
    this.demmurageCostFactor = this.gDetail.demmurageCostFactor;
    this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[0].price;
    this.backlogCostProdFactor = this.backlogCostProdFactor * this.gDetail.wpcs[0].price;
    this.demProdFactor = this.demProdFactor * this.gDetail.wpcs[0].price;
    //cfullfilled
    if (this.totalDemand < this.inventoryStock[this.inventoryStock.length - 1]) {
      this.cFulfilledDemand = this.totalDemand;
    }
    else {
      this.cFulfilledDemand = this.inventoryStock[this.inventoryStock.length - 1];
    }
    this.cFulfilledDemands.push(this.cFulfilledDemand);
    this.backlogItem = 0;
    this.backlogItems.push(this.backlogItem);

    this.demmurageItem = 0;
    this.demmurageItems.push(this.demmurageItem);

    //costs

    this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.backlogCostProdFactor = this.backlogCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.demProdFactor = this.demmurageCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
    this.invCost = this.inventoryStock[this.inventoryStock.length - 1] * this.invCostProdFactor;
    this.blogCost = this.backlogItems[this.backlogItems.length - 1] * this.backlogCostProdFactor;
    this.demCost = this.demmurageItems[this.demmurageItems.length - 1] * this.demProdFactor;
    this.invCosts.push(this.invCost);
    this.blogCosts.push(this.blogCost);
    this.demCosts.push(this.demCost);

    this.totalCost = this.invCost + this.blogCost + this.demCost;
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
/*
  calculateStocks() {
    if (this.week < 2) {
      this.currentStock = this.currentStock +
        this.orderRoad[this.orderRoad.length - 1] -
        this.cFulfilledDemands[this.cFulfilledDemands.length - 1];

      //availableStorage
      if (this.currentStock >= this.gDetail.storageTotal) {
        this.availStorage = 0;
        this.inventoryStock.push(this.gDetail.storageTotal);
      } else {
        this.availStorage = this.totalStorage - this.currentStock;
        this.availableStorage.push(this.availStorage);
        this.inventoryStock.push(this.currentStock);
      }

      this.totalDemand = this.gDetail.wpcs[this.week - 1].cDemand + this.backlogItems[this.backlogItems.length - 1];

      //backlogItems
      this.backlogItem = this.totalDemand - this.cFulfilledDemand;
      this.backlogItems.push(this.backlogItem);

      //demmurageItems
      if (this.availStorage == 0) {
        this.demmurageItem = +this.orderRoad[this.orderRoad.length - 1] -
          (this.inventoryStock[this.inventoryStock.length - 1] - this.inventoryStock[this.inventoryStock.length - 2]) -
          this.totalDemand;
        this.demmurageItems.push(this.demmurageItem);
      }
      else {
        this.demmurageItem = 0;
        this.demmurageItems.push(this.demmurageItem);
      }

      this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
      this.backlogCostProdFactor = this.backlogCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
      this.demProdFactor = this.demmurageCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
      this.invCost = this.inventoryStock[this.inventoryStock.length - 1] * this.invCostProdFactor;
      this.blogCost = this.backlogItems[this.backlogItems.length - 1] * this.backlogCostProdFactor;
      this.demCost = this.demmurageItems[this.demmurageItems.length - 1] * this.demProdFactor;
      this.invCosts.push(this.invCost);
      this.blogCosts.push(this.blogCost);
      this.demCosts.push(this.demCost);
    }

    else {
      //totalDemad and cfullfilled
      this.totalDemand = this.gDetail.wpcs[this.week - 1].cDemand + this.backlogItems[this.backlogItems.length - 1];

      if (this.totalDemand < this.inventoryStock[this.inventoryStock.length - 1]) {
        this.cFulfilledDemand = this.totalDemand;
      }
      else {
        this.cFulfilledDemand = this.inventoryStock[this.inventoryStock.length - 1];
      }
      this.cFulfilledDemands.push(this.cFulfilledDemand);

      this.currentStock = this.currentStock +
        this.orderRoad[this.orderRoad.length - 1] +
        this.orderRail[this.orderRoad.length - 2] -
        this.cFulfilledDemands[this.cFulfilledDemands.length - 1];

      //availableStorage
      if (this.currentStock >= this.gDetail.storageTotal) {
        this.currentStock = this.gDetail.storageTotal;
        this.availStorage = 0;
        this.inventoryStock.push(this.gDetail.storageTotal);
      } else {
        this.availStorage = this.totalStorage - this.currentStock;
        this.availableStorage.push(this.availStorage);
        this.inventoryStock.push(this.currentStock);
      }
      //backlogItems
      this.backlogItem = this.totalDemand - this.cFulfilledDemand;
      this.backlogItems.push(this.backlogItem);

      //demmurageItems
      if (this.availStorage == 0) {
        this.demmurageItem = +this.orderRoad[this.orderRoad.length - 1] +
          this.orderRail[this.orderRail.length - 2] -
          (this.inventoryStock[this.inventoryStock.length - 1] - this.inventoryStock[this.inventoryStock.length - 2]) -
          this.totalDemand;
        this.demmurageItems.push(this.demmurageItem);
      }
      else {
        this.demmurageItem = 0;
        this.demmurageItems.push(this.demmurageItem);
      }
      if (this.inventoryStock.length < this.totalWeeks) {
        this.invCostProdFactor = this.invCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
        this.backlogCostProdFactor = this.backlogCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
        this.demProdFactor = this.demmurageCostFactor * this.gDetail.wpcs[this.inventoryStock.length - 1].price;
      }
      this.invCost = this.inventoryStock[this.inventoryStock.length - 1] * this.invCostProdFactor;
      this.blogCost = this.backlogItems[this.backlogItems.length - 1] * this.backlogCostProdFactor;
      this.demCost = this.demmurageItems[this.demmurageItems.length - 1] * this.demProdFactor;
      this.invCosts.push(this.invCost);
      this.blogCosts.push(this.blogCost);
      this.demCosts.push(this.demCost);

    }
    this.weeklyTotalCost = this.invCost + this.blogCost + this.demCost;
    this.weeklyTotalCosts.push(this.weeklyTotalCost);
    this.totalCost = this.totalCost + this.invCost + this.blogCost + this.demCost;
    this.totalCosts.push(this.totalCost);
  }

  /** 
  * @desc On submission of each order placed by the user  
  **/
/*
  onOrderSubmit() {
    this.orderRoad.push(+this.orderForm.value['orderRoad']);
    this.orderRail.push(+this.orderForm.value['orderRail']);
    this.calculateStocks();
    this.orderForm.reset({
      orderRoad: 0,
      orderRail: 0
    });
    this.orderFormDirecive.resetForm({ orderRoad: 0, orderRail: 0 });
    //console.log(this.week, this.totalWeeks);
    if (this.week < this.totalWeeks) {
      this.week++;
    }
    else {
      this.orderFormShow = false;
      this.submitShow = true;
    }
  }

  /** 
  * @desc After the final order placed,
  * to render data and submit the game records placed by the user   
  **/
/*
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
    this.userDatacopy.totalCosts = this.totalCosts;
    this.userDatacopy.totalCost = this.totalCosts[this.totalCosts.length - 1];
    this.putUserGamingDatatoDatabase();
  }

  /** 
  * @desc To post the Game Records played by the user to Database  
  **/
/*
  putUserGamingDatatoDatabase() {
    this.gamingDataService.putUserGamingDataf(this.userDatacopy);
    this.userData = this.userDatacopy;
    this.openGameEnd();
  }

  /** 
  * @desc Open GameEnd Component as MatDialog to show final score and logout button  
  **/
/*
  openGameEnd() {
    this.dialog.open(GameEndComponent, {
      width: '500px', height: '450px',
      data: {
        finalScore: this.userData.totalCosts[this.userData.totalCosts.length - 2],
        uid: +this.uid
      }
    });
  }
}*/