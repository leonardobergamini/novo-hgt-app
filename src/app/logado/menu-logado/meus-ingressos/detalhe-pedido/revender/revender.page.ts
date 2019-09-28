import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RevenderService } from 'src/app/shared/services/revender/revender.service';
import { Tickets } from 'src/app/shared/models/tickets/tickets';
import * as $ from 'jquery';
import { ComponentRef } from '@angular/core/src/render3';

@Component({
  selector: 'app-revender',
  templateUrl: './revender.page.html',
  styleUrls: ['./revender.page.scss'],
})
export class RevenderPage implements OnInit {

  private id: number = 0;
  private pedido: number = 0;
  private ticket: Tickets = null;
  private formRevender: FormGroup;
  private valorLiquidoVenda: number = 0.00;

  constructor(
    private statusBar: StatusBar,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private revenderService: RevenderService,
    private toastController: ToastController
  ) { 
    this.formRevender = this.formBuilder.group({
      preco: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('idPedido'));
    this.ticket = JSON.parse(localStorage.getItem('ticket'));

    console.log(this.ticket);
  }

  onSubmitRevender(){
    if(this.formRevender.valid){
      this.alertController.create({
        header: 'Confirmação de anúncio',
        animated: true,
        message: 'Confirma o anúncio do ingresso selecionado?',
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
              let preco: number = Number(this.formRevender.value.preco.toString().replace(',', '.'));
              console.log(preco);
              let obj = {
                ticket: {...this.ticket},
                preco: preco
              }
              console.log(obj);
              this.revenderService.create(obj)
              .then(() => {
                // $('#formRevender').trigger('reset');
                this.exibirToast('Anúncio criado com sucesso.', 'md-checkmark');
                // this.revenderPage.destroy();
                this.navCtrl.navigateBack('menu-logado/meus-ingressos');
              })
              .catch(err => {
                console.log(err);
                this.exibirToast('Erro ao criar anúncio. Tente novamente.', 'md-close-circle');
              });
            }
          } 
        ]
      }).then(alert => {
        alert.present();
      }).catch(err => {
        console.log(err);
      });      
      localStorage.removeItem('ticket');
    }else{
      console.log('Há erros no form.');
    }
  }

  voltar(){
    this.navCtrl.navigateBack(`menu-logado/meus-ingressos/detalhe-pedido/${this.id}`);
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
