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
  private usuarioLogado: Usuarios = JSON.parse(localStorage.getItem('usuarioLogado'));

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private loadingController: LoadingController,
    private ticketService: TicketsService,
    private navCtrl: NavController
  ) { }

  pedidos: Pedidos[] = []
  //   {
  //   id: this.id++,
  //   isValido: true,
  //   formaPagamento: this.formaPagamentoService.formasPagamento[0]
  // }

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
        let obj = {
          idFormaPg: pedido.formaPagamento.id,
          isValido: true
        }
        fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/pedidos', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {

          if(resp.status == 200 || resp.status == 201){
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
                reject('Erro ao consultar último pedido');
                loading.dismiss();
              });
            });
          }else{
            reject('Erro ao fazer pedido.');
            loading.dismiss();
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
          loading.dismiss();
        });
      }else{
        reject('Erro ao criar pedido.');
      }
    })
  });
}

getLast(): Promise<Pedidos>{
  return new Promise(async (resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/pedidos')
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
      fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/pedidos/${idPedido}`)
      .then(resp => resp.json())
      .then(async json => {
        let arrayTickets = [];
        let tickets = json['tickets'];
        
        try{
          for(const item of tickets){
            await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${item}`)
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

  cancelarPedido(pedido): Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Cancelando pedido...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(async () => {
        let tickets = pedido.tickets;
        for(const ticket of tickets){
          await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${ticket['@id']}`, {method: 'delete'})
          .then(async resp => {
            if(resp.status == 200 || resp.status == 204){
              await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/pedidos/${pedido.pedido}}`, {method: 'delete'})
              .then(resp => {
                if(resp.status == 200 || resp.status == 204){
                  resolve(true);
                }else{
                  resolve(false);
                }
                loading.dismiss();
              })
            }else{
              reject('Erro ao cancelar os ingressos do pedido. Veriquei e tente novamente.')
              loading.dismiss();
            }
          })
          .catch(err => {
            console.log(err);
            reject('Erro ao cancelar o pedido. Tente novamente.')
            loading.dismiss();
          })
    
        }
      });
    });
  }
  adicionarTicketsPedidos(pedido){
    this.tickets = [];
    pedido.setores.forEach((value, index) => {
      let i: number = 0;
      for( i = 0; i < value.contador; i++){
        debugger;
        let ticket: Tickets =
          {
            id: this.id++,
            evento: pedido.evento,
            isMeiaEntrada: false,
            pedido: this.pedidos[this.pedidos.length - 1],
            preco: value.preco,
            setor: value.setor,
            titular: this.usuarioLogado
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
        this.usuarioLogado = null;
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        let idUsuario = this.usuarioLogado['@id'];
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idUsuario}`)
        .then(resp => resp.json())
        .then(async json => {
          let formasPagamento = json['formaspagamento'];

          if(formasPagamento.length > 0){
            let pedidos = json['formaspagamento'][0]['pedidos'];
  
            if(pedidos.length > 0){
              let array: TicketsPedido[] = []
              let obj: TicketsPedido;
              pedidos.forEach(item => {
                obj = {
                  pedido: item.id,
                  tickets: item.tickets
                }
                array.push(obj);
              });
              resolve(array);
              loading.dismiss();
            }else{
              reject('Sem pedidos feitos.');
              loading.dismiss();
            }
          }else{
            reject('Sem formas de pagamento cadastradas.');
            loading.dismiss();
          }

        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    })
  }
}
