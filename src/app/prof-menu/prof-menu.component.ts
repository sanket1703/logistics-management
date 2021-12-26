import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDetailsService } from '../services/login-details.service';
import { SubscriptionService } from '../services/subscription.service';
import { Prof } from '../shared/prof';
@Component({
  selector: 'app-prof-menu',
  templateUrl: './prof-menu.component.html',
  styleUrls: ['./prof-menu.component.scss']
})
export class ProfMenuComponent implements OnInit {

  
  isSub :boolean = false
  constructor(private router:Router,private firestore: AngularFirestore,private loginDetailsService :LoginDetailsService) { }
  profData : Prof
  ngOnInit(): void {
    
    
    this.loginDetailsService.getProfDataById(localStorage.getItem('id')).subscribe(
      res => {
        this.profData = {id: res.payload.id, ...res.payload.data() as Prof}
        console.log(this.profData)
        if (this.profData.subscription != "") 
        {
          
          this.isSub = true
        }
        else 
        {
          this.isSub = false
        }
      }
    )
   
    
      
      
  }
  
  onLogOut(){
    localStorage.setItem('id','')
    localStorage.setItem('SubId','')
    console.log('Restored',localStorage.getItem('id'))
    this.router.navigate(['/home'])
  }

  onHome()
  {
    this.router.navigateByUrl("prof/home/"+localStorage.getItem('id'))
  }

}
