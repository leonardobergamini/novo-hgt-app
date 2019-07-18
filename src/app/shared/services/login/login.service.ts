import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: AngularFirestore, 
              private authService: AuthGuardService) { }

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
        console.log(err);
        reject('Erro a logar. Tente novamente.');
      });
    });
  }
  
        // let navigationExtras: NavigationExtras = {
        //   state: {
        //     token: token,
        //     ativo: true
        //   }
        // };
        // this.router.navigate(['/'], navigationExtras);


}
