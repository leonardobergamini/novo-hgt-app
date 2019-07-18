import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public usuarioLogado: any;
  public isAtivado: boolean = false;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private firestore: AngularFirestore) { 

    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
        this.findUser(user.email)
            .then(resp => {
              this.usuarioLogado = resp.docs[0].data();
              localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado));
              localStorage.setItem('loginValido', 'true');
              this.isAtivado = true;
              this.router.navigate(['menu-logado'])
            })
            .catch(err => console.log(err));
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('usuarioLogado', null);
        localStorage.setItem('loginValido', null);
        this.isAtivado = false;
        this.router.navigate(['menu'])
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.isAtivado);
    if(this.isAtivado ==  true) {
      this.router.navigate(['menu-logado']);
      return true;
    } else{
      this.router.navigate(['menu']);
      return false;
    }
  }

}
