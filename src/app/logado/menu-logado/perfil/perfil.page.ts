import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/shared/services/login/login.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import * as $ from 'jquery';
import { ModalController, NavController } from '@ionic/angular';
import { EditarPerfilPage } from './itens-perfil/editar-perfil/editar-perfil.page';

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
      rota: 'meus-favoritos'
    },
    {
      titulo: 'formas de pagamento',
      icone: 'ios-card',
      rota: 'formas-pagamento'
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
    private loginService: LoginService, 
    private modalController: ModalController) { }

  ngOnInit() {
    this.temFoto = this.usuarioLogado.img_perfil == undefined || this.usuarioLogado.img_perfil == null || this.usuarioLogado.img_perfil == '';
  }

  ionViewDidEnter(){
    this.usuarioLogado = {...JSON.parse(localStorage.getItem('usuarioLogado'))};
  }

  sair(){
    this.loginService.sair()
        .then(resp => {
          console.log(resp);
        });
  }

  async editarPerfil(){
    const modal = await this.modalController.create({
      component: EditarPerfilPage,
      componentProps: {
        'usuario': this.usuarioLogado
      }
    });
    return await modal.present();
  }

}
