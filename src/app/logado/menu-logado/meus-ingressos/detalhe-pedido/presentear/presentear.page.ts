import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/shared/validators/email-validator/email-validator';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-presentear',
  templateUrl: './presentear.page.html',
  styleUrls: ['./presentear.page.scss'],
})
export class PresentearPage implements OnInit {

  private objPedido;
  private pedido;
  private ticket;
  private usuarioEncontrado;
  private formBuscaUsuario: FormGroup;

  constructor(
    private modalController: ModalController,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private ticketService: TicketsService,
    private navCtrl: NavController
  ) { 
    this.formBuscaUsuario = formBuilder.group({
      email: ['', Validators.required, EmailValidator.verificarEmail]
    });
  }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.objPedido = {
      pedido: this.pedido,
      ticket: this.ticket
    }
  }

  onSubmit(){
    if(this.formBuscaUsuario.valid){
      let email = this.formBuscaUsuario.get('email').value;
      this.usuarioService.findUserByEmail(email)
      .then(resp => {
        console.log(resp);
        this.usuarioEncontrado = resp;
        // this.exibirToast('Usuário encontrado.', 'md-checkmark');
      })
      .catch(err => {
        this.exibirToast('Usuário não encontrado.', 'md-close-circle');
      });
    }
  }

  async presentear(){
    this.alertController.create({
      header: 'Envio de presente',
      animated: true,
      message: `Confirma o envio do ingresso para o ${this.usuarioEncontrado.primeironome} ${this.usuarioEncontrado.sobrenome}?`,
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
          role: 'cancel',
          handler: () => {
            return false;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.ticketService.updateTitular(this.usuarioEncontrado['@id'], this.objPedido.ticket['@id'])
            .then(() => {
              this.exibirToast('Presente enviado com sucesso.', 'md-checkmark');
              this.fecharModal();
            })
            .catch(err => {
              console.log(err);
              this.exibirToast('Erro ao presentear. Tente novamente.', 'md-close-circle');
            })
          }
        } 
      ]
    })
    .then(alert => {
      alert.present();
    })
    .catch(err => {
      console.log(err);
    });    
  }

  fecharModal(){
    this.modalController.dismiss();
  }

  exibirToast(msg: string, icone: string){
    const toast = this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: msg,
      closeButtonText: 'fechar',
      showCloseButton: true,
      buttons: [
        {
          side: 'start',
          icon: icone
        }
      ]
    }).then(toastData => {
      toastData.present();
    });  
  }

}
