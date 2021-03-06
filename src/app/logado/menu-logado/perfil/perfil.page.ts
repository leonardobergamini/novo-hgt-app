import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import * as $ from 'jquery';
import { EditarPerfilPage } from './itens-perfil/editar-perfil/editar-perfil.page';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private temFoto: boolean = false;
  private usuarioLogado;
  itens =[
    {
      titulo: 'formas de pagamento',
      icone: 'ios-card',
      rota: 'formas-pagamento'
    },
    // {
    //   titulo: 'alterar senha',
    //   icone: 'ios-key',
    //   rota: 'alterar-senha'
    // },
    {
      titulo: 'editar perfil',
      icone: 'md-create',
      rota: 'editar-perfil'
    },
    {
      titulo: 'atendimento',
      icone: 'ios-chatbubbles',
      rota: 'atendimento'
    },
    {
      titulo: 'termos de uso',
      icone: 'ios-document',
      rota: 'termos-uso'
    },
    {
      titulo: 'políticas de privacidade',
      icone: 'ios-paper',
      rota: 'politicas-privacidade'
    }    
  ];

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private usuarioService: UsuarioService,
    private statusBar: StatusBar
    ) { }

  ngOnInit() {
    this.temFoto = this.usuarioLogado.imgPerfil == undefined || 
    this.usuarioLogado.imgPerfil == null || 
    this.usuarioLogado.imgPerfil == '' ||
    this.usuarioLogado.imgPerfil == 'null';
  }

  ionViewDidEnter(){
    this.usuarioLogado = null;
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    this.statusBar.backgroundColorByHexString('#f3f0f0');
    this.statusBar.styleDefault();
  }

  ionViewCanLeave(){
  }

  sair(){
    this.usuarioService.sair();
  }
}
