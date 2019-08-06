import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarioLogado: any;

  constructor(private firestore: AngularFirestore, 
              private afAuth: AngularFireAuth,
              private router: Router) { }

  createUser(user){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
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
      this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(resp => {
        resolve(resp);

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
              this.router.navigate(['menu-logado/explorar']);
    
            })
            .catch(err => console.log(err));
          } else {
            localStorage.setItem('usuarioLogado', null);
            localStorage.setItem('loginValido', 'false');
          }
        });

      })
      .catch(err => {
        reject(err);
      });
    })
  }

  sair(): Promise<any>{
    return new Promise((resolve, reject) => {
      
      this.afAuth.auth.signOut()
          .then(resp => {
            resolve('logout feito com sucesso');
            localStorage.setItem('usuarioLogado', null);
            localStorage.setItem('loginValido', 'false');
            this.router.navigate(['menu/explorar']);
          })
          .catch(err => reject('erro ao fazer logout'));
    })
  }

  getAuth(){
    return this.afAuth.auth;
  }

  
}
