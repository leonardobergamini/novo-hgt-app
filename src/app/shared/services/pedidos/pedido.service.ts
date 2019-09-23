import { Injectable, OnDestroy } from '@angular/core';
import { Pedidos } from '../../models/pedidos/pedidos';
import { FormaPagamentoService } from '../formas-pagamento/forma-pagamento.service';
import { LoadingController, NavController } from '@ionic/angular';
import { TicketsService } from '../tickets/tickets.service';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Tickets } from '../../models/tickets/tickets';
import { load } from '@angular/core/src/render3';
import { TicketsPedido } from '../../interfaces/tickets-pedido/tickets-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService{
  
  private id: number = 0;
  private tickets: Tickets[] = [];
  public arrayTicketsPorPedido: TicketsPedido[] = [];
  public arrayTicketsPorIdPedido: TicketsPedido[] = []
  private objTickesPorPedido: TicketsPedido = null;
  private usuario: Usuarios = null;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private loadingController: LoadingController,
    private ticketService: TicketsService,
    private navCtrl: NavController
  ) { 
    this.usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  pedidos: Pedidos[] = [
  //   {
  //   id: this.id++,
  //   isValido: true,
  //   formaPagamento: this.formaPagamentoService.formasPagamento[0]
  // }
]

create(pedido): Promise<Pedidos>{
  return new Promise(async (resolve, reject) => {
    let loading = await this.loadingController.create({
      message: 'Finalizando pedido...',
      keyboardClose: true,
      showBackdrop: true,
      animated: true
    });

    loading.present()
    .then(() => {
      this.adicionarTicketsPedidos(pedido);

      if(this.tickets.length > 0){
        let idFormaPagamento = `\/api\/formas_pagamentos\/${pedido.formaPagamento.idFormaPg}`;
        let obj = {
          idFormaPg: idFormaPagamento,
          isValido: true
        }
        fetch('https://hgt-events.herokuapp.com/api/pedidos', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          debugger;
          console.log(resp);
          this.getLast()
          .then(resp => {
            debugger;
            console.log(resp);
          })
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
      }
    })
  });
}

getLast(): Promise<Pedidos>{
  return new Promise((resolve, reject) => {
    fetch('https://hgt-events.herokuapp.com/api/pedidos')
    .then(resp => resp.json())
    .then(json => {
      debugger;
      let qtdItens = json['hydra:totalItems'];
      let tmp = json['hydra:member'][qtdItens - 1];

      console.log(tmp);
      // let obj: Pedidos = {
      //   id: tmp.id,
      //   formaPagamento: 
      // }
      resolve(tmp)
    })
  });
}

  novoPedido(pedido){
    this.pedidos.push(
      {
        id: this.id++,
        formaPagamento: pedido.formaPagamento[0],
        isValido: true
      }
    );    
    this.adicionarTicketsPedidos(pedido);
    this.getTicketsPorPedido(this.tickets);

    if(this.tickets.length > 0){
      this.ticketService.novoTicket(this.tickets);
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('menu-logado/meus-ingressos');
    }
    
    this.tickets = [];
  }

  adicionarTicketsPedidos(pedido){
    pedido.setores.forEach((value, index) => {
      let i: number = 0;
      for( i = 0; i < value.contador; i++){
        let ticket: Tickets =
          {
            id: this.id++,
            evento: pedido.evento,
            isMeiaEntrada: false,
            pedido: this.pedidos[this.pedidos.length - 1],
            preco: value.preco,
            setor: value.setor,
            titular: this.usuario
          };
        this.tickets.push(ticket)
      }
    });
  }

  getTicketsPorPedido(tickets, idPedido?: number): TicketsPedido[]{ 
    let arrayPedidosComTickets = this.arrayTicketsPorPedido;
    if(idPedido > 0){
      arrayPedidosComTickets.filter(value => {
        if(value.pedido.id === idPedido){
          this.arrayTicketsPorIdPedido.push(value);
          return this.arrayTicketsPorIdPedido;
        }
      });
    }else{
      let objPedido = tickets[0].pedido;
      this.objTickesPorPedido = {
        pedido: objPedido,
        tickets
      };
      this.arrayTicketsPorPedido.push(this.objTickesPorPedido);
      return this.arrayTicketsPorIdPedido
    }
  }
}
