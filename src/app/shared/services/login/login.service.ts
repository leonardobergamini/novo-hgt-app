import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  createUser(user){
    return this.firestore.collection('usuarios').add(user);
  }

  readUsers(){
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  
  findUser(email: string, senha: string){
    // console.log(this.firestore.collection('usuarios').get().toPromise().then(resp => console.log(resp.)));

  }
  
        // let navigationExtras: NavigationExtras = {
        //   state: {
        //     token: token,
        //     ativo: true
        //   }
        // };
        // this.router.navigate(['/'], navigationExtras);


}
