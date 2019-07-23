import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { MenuPage } from 'src/app/menu/menu.page';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @ViewChild('MenuPage') menuPage: MenuPage;

  constructor(private firestore: AngularFirestore, 
              private authService: AuthGuardService,
              private afAuth: AngularFireAuth,
              private router: Router) { }

  createUser(user){
    return this.firestore.collection('/usuarios').add(user);
  }

  readUsers(){
    return this.firestore.collection('/usuarios').snapshotChanges();
  }
  
  findUser(email: string){
    return this.firestore.collection('/usuarios', ref => ref.where('email', '==', email)).get().toPromise();
  }

  login(email: string, senha: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.authService.login(email, senha)
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  sair(): Promise<any>{
    return new Promise((resolve, reject) => {
      
      this.afAuth.auth.signOut()
          .then(resp => {
            resolve('logout feito com sucesso');
            this.router.navigate(['menu/explorar']);
          })
          .catch(err => reject('erro ao fazer logout'));
    })
  }
}
