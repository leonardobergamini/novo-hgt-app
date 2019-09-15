import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ModalController } from '@ionic/angular';

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

  constructor(
    private statusBar: StatusBar,
    private ticketService: TicketsService,
    private pedidoService: PedidoService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.ticketService.getTicket()
    .then(resp => {
      this.tickets = resp;
      this.qtdTickets = this.tickets.length;
      this.ticketsPorPedido = this.pedidoService.arrayTicketsPorPedido;
      // console.log(this.pedidoService.arrayTicketsPorPedido);
      // console.log(this.tickets);
    })
    .catch(err => {
      console.log(err);
    })
  }

  async selecionarPedido(param){
    if(param){
      const modal = await this.modalController.create({
        component: DetalhePedidoPage,
        componentProps: {
          pedido: param.pedido,
          tickets: param.tickets
        }
      });
      console.log(param);
      return await modal.present();

    }
  }


}
