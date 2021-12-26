import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firestore from 'firebase/compat/app';
import { Prof } from '../shared/prof';

import { Subscription } from '../shared/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private firestore: AngularFirestore) { }

  

  // updateSubscription(subs:string,id:string)
  // {

  //   // This adds subscriptions to a list -> For multiple Subscriptions

          // Here the subscription is an array 

  //   return this.firestore.collection('profLoginDetails')
  //   .doc(id)
  //   .update({subscription: firestore.firestore.FieldValue.arrayUnion(subs)})
  //   .then(() => {
  //     console.log('Prof subscription updated');
  //   })
  //   .catch(function(error) {
  //    console.error('Error writing document: ', error);
  //   });
  // }


  updateSubscription(subs:string,id:string)
  {
    
    // This adds subscriptions to a list -> For multiple Subscriptions

    try {
      this.firestore.collection('profLoginDetails')
        .doc(id)
        .update({ subscription: subs });
      console.log('Prof subscription updated Check');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  }

  addNewSubscription(subscription : Subscription){

    return this.firestore.collection('subscriptions').add(subscription)
    .then(function(docRef)
    {
      localStorage.setItem('SubId',docRef.id)
      console.log("Subscription Added Successfully")
    })
    .catch(function (error) {
      console.error("Error adding subs: ", error);
    });
    
  }

  getAllSubscriptionById(id:string)
  {
    return this.firestore.collection("subscriptions",ref => ref.where('profId', '==', id))
    .snapshotChanges() 
  }



}
