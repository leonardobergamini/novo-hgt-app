import { Injectable } from '@angular/core';

import { Usuarios } from '../../models/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

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

  createUser(usuario: any): Promise<any>{
    console.log(JSON.stringify(usuario));
    return new Promise((resolve, reject) => {
      fetch('https://hgt-events.herokuapp.com/api/usuarios', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      })
      .then(response => resolve(response))
      .catch(err => reject(err));
    }); 
  }
}
