import { Injectable, NgZone, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { MenuPage } from '../menu/menu.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  public usuarioLogado: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private firestore: AngularFirestore) { 

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.findUser(user.email)
        .then(resp => {
          
          this.usuarioLogado = {
            usuario: resp.docs[0].data(),
            uid: user.uid,
            refreshToken: user.refreshToken
          }
          
          localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado));
          localStorage.setItem('loginValido', 'true');
          this.router.navigate(['menu-logado/perfil']);

        })
        .catch(err => console.log(err));
      } else {
        localStorage.setItem('usuarioLogado', null);
        localStorage.setItem('loginValido', 'false');
      }
    })
  } 

  login(email: string, senha: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
    })
  }

  findUser(email: string){
    return this.firestore.collection('/usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

}
