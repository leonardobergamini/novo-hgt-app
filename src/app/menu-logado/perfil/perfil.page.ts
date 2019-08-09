import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { AlertController } from '@ionic/angular';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user = JSON.parse(localStorage.getItem('usuarioLogado'));
  usuarioLogado: Usuarios;
  constructor(private loginService: LoginService) { }

  ngOnInit() {    
    console.log(this.user);
  }

  sair(){
    this.loginService.sair()
        .then(resp => {
          console.log(resp);
        });
    
  }
}
