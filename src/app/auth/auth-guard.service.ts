import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  // private isAutenticado: boolean = false;
  public usuarioLogado: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private ngZone: NgZone,
    private loginService: LoginService) { 

    this.afAuth.authState.subscribe(user => {
      if (user) {
      this.usuarioLogado = user; 
      localStorage.setItem('user', JSON.stringify(this.usuarioLogado));
      JSON.parse(localStorage.getItem('user'));
      } else {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
      }
    })
  } 

  login(email: string, senha: string): Promise<any>{
    return new Promise((resolve, reject) => {
      const loginUser = this.afAuth.auth.signInWithEmailAndPassword(email, senha);

      loginUser.then(resp => {
        resp.user.getIdToken(true).then(token => { 
          this.loginService.findUser(email, senha);
          resolve(token);
        })
        .catch(err => {
          console.log('getIdToken() - Error: ' + err);
        });
      })
      .catch(err => 
        {
          reject(err);
          console.log(err)
        });
    });
  }




}
