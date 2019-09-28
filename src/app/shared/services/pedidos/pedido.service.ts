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

create(pedido): Promise<string>{
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
          this.getLast()
          .then(resp => {
            let obj = {
              pedido: resp,
              tickets: this.tickets
            }
            console.log(obj);
            this.ticketService.create(obj)
            .then(resp => {
              resolve('Pedido feito');
              loading.dismiss();
            })
            .catch(err => {
              console.log(err);
              reject('Erro ao fazer pedido');
              loading.dismiss();
            })
          })
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
      }else{
        reject('Erro ao criar pedido.');
      }
    })
  });
}

getLast(): Promise<Pedidos>{
  return new Promise(async (resolve, reject) => {
    fetch('https://hgt-events.herokuapp.com/api/pedidos')
    .then(resp => resp.json())
    .then(json => {
      let qtdItens = json['hydra:totalItems'];
      let tmp = json['hydra:member'][qtdItens - 1];
      resolve(tmp)
    })
    .catch(err => {
      reject(err);
    })
  });
}

getTicketsByPedido(idPedido: number): Promise<Tickets[]>{
  return new Promise(async (resolve, reject) => {
    let loading = await this.loadingController.create({
      message: 'Atualizando...',
      keyboardClose: true,
      showBackdrop: true,
      animated: true
    });

    loading.present()
    .then(() => {
      fetch(`https://hgt-events.herokuapp.com/api/pedidos/${idPedido}`)
      .then(resp => resp.json())
      .then(async json => {
        let arrayTickets = [];
        let tickets = json['tickets'];
        
        try{
          for(const item of tickets){
            await fetch(`https://hgt-events.herokuapp.com${item}`)
            .then(resp => resp.json())
            .then(json => {
              arrayTickets.push(json);
            })
          }
          resolve(arrayTickets);
          loading.dismiss();
        }
        catch(err){
          reject(err);
        }
      })
      .catch(err => {
        reject(err);
        loading.dismiss();
      })
    })
  })
}

  // novoPedido(pedido){
  //   this.pedidos.push(
  //     {
  //       id: this.id++,
  //       formaPagamento: pedido.formaPagamento[0],
  //       isValido: true
  //     }
  //   );    
  //   this.adicionarTicketsPedidos(pedido);
  //   this.getTicketsPorPedido(this.tickets);

  //   if(this.tickets.length > 0){
  //     this.ticketService.novoTicket(this.tickets);
  //     this.navCtrl.setDirection('forward');
  //     this.navCtrl.navigateForward('menu-logado/meus-ingressos');
  //   }
    
  //   this.tickets = [];
  // }

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

  getTicketsPedidoByUsuarioLogado(): Promise<TicketsPedido[]>{ 
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Carregando seus pedidos...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });
  
      loading.present()
      .then(() => {
        let idUsuario = 1;
        fetch(`https://hgt-events.herokuapp.com/api/usuarios/${idUsuario}`)
        .then(resp => resp.json())
        .then(json => {
          let response = json['formaspagamento'][0]['pedidos'];

          let array: TicketsPedido[] = []
          let obj: TicketsPedido;
          response.forEach(item => {
            obj = {
              pedido: item.id,
              tickets: item.tickets
            }
            array.push(obj);
          });
          resolve(array);
          loading.dismiss();
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    })
  }
}
