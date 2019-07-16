import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: AngularFirestore) { }

  createUser(user){
    return this.firestore.collection('usuarios').add(user);
  }

  readUsers(){
    return this.firestore.collection('usuarios').snapshotChanges();
  }
}
