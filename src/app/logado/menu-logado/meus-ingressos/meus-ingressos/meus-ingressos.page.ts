import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ModalController, IonSegment, ActionSheetController, AlertController } from '@ionic/angular';

import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { Tickets } from 'src/app/shared/models/tickets/tickets';
import * as $ from 'jquery';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import { TicketsPedido } from 'src/app/shared/interfaces/tickets-pedido/tickets-pedido';
import { Pedidos } from 'src/app/shared/models/pedidos/pedidos';
import { DetalhePedidoPage } from '../detalhe-pedido/detalhe-pedido.page';

@Component({
  selector: 'app-meus-ingressos',
  templateUrl: './meus-ingressos.page.html',
  styleUrls: ['./meus-ingressos.page.scss'],
})
export class MeusIngressosPage implements OnInit {

  private tickets: Tickets[] = [];
  private qtdTickets: number = 0;
  public ticketsPorPedido: TicketsPedido[] = [];
  @ViewChild('formSlides') formSlides;

  constructor(
    private statusBar: StatusBar,
    private ticketService: TicketsService,
    private pedidoService: PedidoService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() { 
    this.pedidoService.getTicketsPedidoByUsuarioLogado()
    .then(resp => {
      this.ticketsPorPedido = resp;
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
  }

  selecionar(aba: string){
    aba === 'presentes' ? this.formSlides.slideNext() : this.formSlides.slidePrev();   
  }

  ativarAba(aba: string){
    if(aba === 'presentes'){
      $('#presentes').attr('checked', true);
      $('#minhas-compras').removeAttr('checked');
    }else{
      $('#minhas-compras').attr('checked', true);
      $('#presentes').removeAttr('checked');
    }
  }


  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    // this.formSlides.lockSwipeToNext();
  }

  async onPress(pedido){
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',
      buttons: [ 
      {
        text: 'Cancelar pedido',
        handler: () => {
          if(pedido){
            // localStorage.setItem('ticket', JSON.stringify(ticket));
            // this.navCrtl.navigateForward(`menu-logado/meus-ingressos/detalhe-pedido/revender/${this.arrayTickets.pedido}`);
            this.alertController.create({
              header: 'Cancelamento de pedido.',
              animated: true,
              message: 'Confirma o cancelamento do pedido?',
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
                    // return true;
                    this.pedidoService.cancelarPedido(pedido)
                    .then(resp => {
                      if(resp){
                        console.log('cancelou');
                        this.atualizarTela(null);
                      }else{
                        console.log('não cancelou');
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })
                  }
                } 
              ]
            }).then(alert => {
              alert.present();
            }).catch(err => {
              console.log(err);
            });
          };
        }
      }, 
      {
        text: 'Fechar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('fechar clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  atualizarTela(event){
    this.pedidoService.getTicketsPedidoByUsuarioLogado()
    .then(resp => {
      this.ticketsPorPedido = resp;
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });

    event.target.complete();
  }
  
  async selecionarPedido(param, i){
    if(param){
      localStorage.setItem('detalhe-pedido', JSON.stringify(param));
      this.navCtrl.navigateForward(`menu-logado/meus-ingressos/detalhe-pedido/${param.pedido}`)
    }
  }


}
