import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ModalController, IonSegment } from '@ionic/angular';

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
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  selecionar(aba: string){
    aba === 'presentes' ? this.formSlides.slideNext() : this.formSlides.slidePrev();   
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    // this.formSlides.lockSwipeToNext();
    this.pedidoService.getTicketsPedidoByUsuarioLogado()
    .then(resp => {
      this.ticketsPorPedido = resp;
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
  }

  async selecionarPedido(param, i){
    if(param){
      localStorage.setItem('detalhe-pedido', JSON.stringify(param));
      this.navCtrl.navigateForward(`menu-logado/meus-ingressos/detalhe-pedido/${param.pedido}`)
    }
  }


}
