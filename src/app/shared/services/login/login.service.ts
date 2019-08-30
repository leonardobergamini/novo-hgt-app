import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarioLogado: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }  

  login(email: string, senha: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.router.navigate(['menu-logado/explorar']);
    });
  }

  sair(): Promise<any>{
    return new Promise((resolve, reject) => {
      
      
    });
  }

}
