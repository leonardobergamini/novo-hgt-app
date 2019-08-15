import { Component, OnInit, Input } from '@angular/core';

import { LoginService } from 'src/app/shared/services/login/login.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import * as $ from 'jquery';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  temFoto: boolean = false;
  user = JSON.parse(localStorage.getItem('usuarioLogado'));
  usuarioLogado: Usuarios = {...this.user};
  itens =[
    {
      titulo: 'meus favoritos',
      icone: 'md-heart',
      tela: 'meus-favoritos'
    },
    {
      titulo: 'formas de pagamento',
      icone: 'ios-card',
      tela: ''
    },
    {
      titulo: 'atendimento',
      icone: 'ios-chatbubbles',
      tela: ''
    },
    {
      titulo: 'termos de uso',
      icone: 'ios-document',
      tela: ''
    },
    {
      titulo: 'políticas de privacidade',
      icone: 'ios-paper',
      tela: ''
    }
  ];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.usuarioLogado.usuario = null;
    this.temFoto = this.usuarioLogado.img_perfil == undefined || this.usuarioLogado.img_perfil == null || this.usuarioLogado.img_perfil == '';
    console.log(this.usuarioLogado);
  }

  sair(){
    this.loginService.sair()
        .then(resp => {
          console.log(resp);
        });
  }

  abrirPagina(){
    console.log();
  }

}
