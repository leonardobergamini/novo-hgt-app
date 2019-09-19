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
          let usuario: Usuarios = {
            id: 1,
            primeiroNome: 'leonardo',
            sobrenome: 'bergamini',
            cpf: '36980235800',
            cep: '02326000',
            cidade: 'são paulo',
            complemento: '',
            dtNascimento: '24/04/1995',
            email: 'leonardo@gmail.com',
            imgPerfil: '',
            logradouro: 'rua arley gilberto de araujo',
            numero: '04',
            senha: 'leonardo',
            telefone: '11940040876',
            uf: 'sp',
            usuario: 'berganardo'
          }
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          this.router.navigate(['menu-logado/explorar']);
          resolve();
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
