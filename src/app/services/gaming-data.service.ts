import { Injectable } from '@angular/core';
import { userData } from '../shared/userData';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamingDataService {
  constructor(private firestore: AngularFirestore) { }

  getAllUserGamingDataf(){    
    return this.firestore.collection('gamingUserData').snapshotChanges();
  }

  putUserGamingDataf(userData: userData){
 
    return this.firestore.collection('gamingUserData').doc().set(userData)
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }  

  getGamingDataForProf(id:string)
  {
    return this.firestore.collection("gamingUserData",ref => ref.where('professor', '==', id))
    .snapshotChanges() 
  }
}
