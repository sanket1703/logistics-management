import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';;
import { Login } from '../shared/login';
import { Prof } from '../shared/prof';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  constructor(private firestore: AngularFirestore) { }

  getLoginDetailsf() {
    return this.firestore.collection('userLoginDetails').snapshotChanges();
  }
  getProfLoginDetailsf() {
    return this.firestore.collection('profLoginDetails').snapshotChanges();
  }

  

  getUser(uid: string) {
    return this.firestore.collection("userLoginDetails").doc(uid).get().toPromise()
      .then(function (doc) {
        if (doc.exists) {
          console.log("User data called!");
          return doc.data();
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  getAdminLoginDetailsf() {
    return this.firestore.collection('adminLoginDetails').snapshotChanges();
  }

  putLoginDetailsf(login: Login) {
    let id: string = login.id.toString();
    return this.firestore.collection('userLoginDetails').doc(id).set(login)
      .then(function (docRef) {
       
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }

  deleteUserf(uid: number) {
    let id = uid.toString();
    return this.firestore.collection("profLoginDetails").doc(id).delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  putProfDetails(prof : Prof){

    return this.firestore.collection("profLoginDetails").add(prof)
      .then(function (docRef) {
        localStorage.setItem('CurrentProfSignup',docRef.id)
      console.log("Prof successfully Added!");
    })
    .catch(function (error) {
      console.error("Error adding prof: ", error);
    });
    
  }

  getProfLoginDetails() {

    return this.firestore.collection('profLoginDetails').snapshotChanges();

  }

 

  getProfDataById(id : string)
  {
    
    return this.firestore.collection('profLoginDetails').doc(id).snapshotChanges();
  
  }

  


}