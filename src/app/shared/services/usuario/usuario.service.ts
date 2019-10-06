import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Usuarios } from '../../models/usuarios/usuarios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private router: Router,
    private storage: Storage,
    private loadingController: LoadingController
    ) { }

  readUsers(): Promise<Usuarios[]>{
    return new Promise((resolve, reject) => {
      fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/usuarios')
      .then(resp => resp.json())
      .then(json => {
        let usuarios: Usuarios[] = (json['hydra:member']);
        resolve(usuarios);
      })
      .catch(err => reject(err));
    });
  }
  
  findUserByEmail(email: string): Promise<Usuarios>{    
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Buscando usuário...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/usuarios/?email=${email}`)
        .then(resp => resp.json())
        .then(json => {
          let arrayUsuario = json['hydra:member'];
          if(arrayUsuario.length > 0){
            resolve(arrayUsuario[0]);
            loading.dismiss();
          }else{
            reject('Usuário não encontrado.');
            loading.dismiss();
          }
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        });
      });
    });
  }

  updateUser(usuario: Usuarios): Promise<Usuarios>{
    return new Promise((resolve, reject) => {
      
    });
  }

createUser(usuario: any): Promise<any>{
  return new Promise(async (resolve, reject) => {
    debugger;
    console.log(usuario);
    let loading = await this.loadingController.create({
      message: 'Cadastrando...',
      keyboardClose: true,
      showBackdrop: true,
      animated: true
    });
    loading.present()
    .then(() => {
      fetch('https://hgt-events.herokuapp.com/api/usuarios', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      })
      .then(response => {
        debugger;
        resolve(response);
      })
      .catch(err => {
        debugger;
        reject(err);
      })
      .finally(() => loading.dismiss());
      }); 
    });
  }

  login(email: string, senha: string): Promise<Usuarios>{
    return new Promise(async (resolve, reject) => {
        let loading = await this.loadingController.create({
          message: 'Entrando...',
          keyboardClose: true,
          showBackdrop: true,
          animated: true,
          duration: 2000
        });
        loading.present()
        .then(() => {    
          fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/usuarios/?email=${email}`)
          .then(resp => resp.json())
          .then(json => {
            let usuario = json['hydra:member'][0];
            if(usuario){
              localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
              localStorage.setItem('isUsuarioLogado', 'true');
              this.router.navigate(['menu-logado/explorar']);
              resolve(usuario)
              loading.dismiss();
            }else{
              reject('Usuário não encontrado.');
              loading.dismiss();
            }
          })
          .catch(err => {
            console.log(err);
            reject('Erro ao efetuar login. Tente novamente.');
            loading.dismiss();
          })
        });
      // this.usuarioLogado.email = email;
      // this.usuarioLogado.senha = senha;
      // this.storage.set('usuario', JSON.stringify(Utils.inicializaUsuario(this.usuarioLogado)));
    });
  }

  sair(): void{
    console.log('saindo...');
    this.router.navigate(['menu/explorar']);
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('detalhe-evento');
    localStorage.removeItem('detalhe-pedido');
    localStorage.removeItem('isUsuarioLogado');
    localStorage.removeItem('anunciosPorEvento');
    localStorage.removeItem('eventoSelecionado');
  }
}
