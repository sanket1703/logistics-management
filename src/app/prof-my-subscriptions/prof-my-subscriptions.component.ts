import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../shared/subscription';

@Component({
  selector: 'app-prof-my-subscriptions',
  templateUrl: './prof-my-subscriptions.component.html',
  styleUrls: ['./prof-my-subscriptions.component.scss']
})
export class ProfMySubscriptionsComponent implements OnInit {

  constructor(private subscriptionService:SubscriptionService) { }
  SUBS : Subscription[]
  dataSource : Subscription[][] =[]
  showSubs:boolean
  subNo:number
  nosub:boolean

  toDDMMYYYY(d) {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = (d.getDate() + 100).toString().slice(-2);
    return dd +'-'+ mm+'-' +yyyy;
  }
  
  ngOnInit(): void {

    this.subscriptionService.getAllSubscriptionById(localStorage.getItem('id'))
    .subscribe(querySnapshot => {
      
      console.log('Check',querySnapshot)

      this.SUBS = querySnapshot.map(data => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as Subscription
        } 
      });

      this.SUBS[0].startDate = this.toDDMMYYYY(this.SUBS[0].startDate)
      this.SUBS[0].endDate = this.toDDMMYYYY(this.SUBS[0].endDate)
      

   
      
  })
  
  
  }


  subsShow(i:number)
  {
    this.subNo = i;
    this.showSubs = true;
  }

}
