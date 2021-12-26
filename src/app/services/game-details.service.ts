import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { GameDetail } from './../shared/GameDetail';

@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  constructor(private firestore: AngularFirestore) { }

  getGameDetailf() {
    return this.firestore.collection('gameDetails').snapshotChanges();
  }

  getGameDetail(id:string)
  {
    return this.firestore.collection("gameDetails").doc(id).get().toPromise()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Gaming for prof data called!");
          return doc.data();
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  putGameDetailsf(gameDetail: GameDetail,id:string) {
    
    return this.firestore.collection('gameDetails').doc(id).set(gameDetail,{merge: true})
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}