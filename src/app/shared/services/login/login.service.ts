import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarioLogado: any;
  private usuarioFormatado: Usuarios;
  private usuarioSemFormatacao: any;

  constructor(private firestore: AngularFirestore, 
              private afAuth: AngularFireAuth,
              private router: Router) { }

  createUser(usuario: Usuarios): Promise<string>{
    
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
          .then(resp => {
            usuario.id_usuario = resp.user.uid;
            this.firestore.collection('/usuarios').add({...usuario});
            resolve('Usuário cadastrado com sucesso');
          })
          .catch(err => reject(err));
      
      console.log(usuario);
      
    }); 
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
              this.usuarioLogado = this.inicializaUsuario(resp.docs[0].data());
              
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

  inicializaUsuario(user: any): Usuarios{
    return this.usuarioFormatado = {
      id_usuario: user.id_usuario,
      primeiro_nome: user.primeiro_nome,
      sobrenome: user.sobrenome,
      email: user.email,
      senha: user.senha,
      cep: null,
      cidade: null,
      complemento: null,
      cpf: null,
      dt_nascimento: null,
      img_perfil: null,
      logradouro: null,
      numero: null,
      telefone: null,
      uf: null,
      usuario: null
    }
  }
  
}
