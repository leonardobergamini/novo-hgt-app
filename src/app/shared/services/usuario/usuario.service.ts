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

  readUsers(): Promise<any>{
    return new Promise((resolve, reject) => {
      fetch('https://hgt-events.herokuapp.com/api/usuarios')
      .then(resp => resp.json())
      .then(json => {
        let usuario: Usuarios = json;
        resolve(usuario);
      })
      .catch(err => reject(err));
    });
  }
  
  findUserByEmail(email: string): Promise<Usuarios>{    
    return new Promise((resolve, reject) => {

    });
  }

  updateUser(usuario: Usuarios): Promise<Usuarios>{
    return new Promise((resolve, reject) => {
      
    });
  }

  async createUser(usuario: any): Promise<any>{
    return new Promise(async (resolve, reject) => {
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
        .then(response => resolve(response))
        .catch(err => reject(err))
        .finally(() => loading.dismiss());
      }); 
    });
  }

  async login(email: string, senha: string): Promise<any>{
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
          this.router.navigate(['menu-logado/explorar']);
          resolve(`Entrou: ${email}`);
        });
        loading.dismiss();
      // this.usuarioLogado.email = email;
      // this.usuarioLogado.senha = senha;
      // this.storage.set('usuario', JSON.stringify(Utils.inicializaUsuario(this.usuarioLogado)));
    });
  }

  sair(): void{
    console.log('saindo...');
    this.router.navigate(['menu/explorar']);
  }
}
