import { Injectable } from '@angular/core';
import { Tickets } from '../../models/tickets/tickets';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private id: number = 1
  public tickets: Tickets[] = [];
  private arrayTickets: Tickets[] = [];

  constructor(
    private loadingController: LoadingController
  ) { }

  async create(objeto){
      for(const ticket of objeto.tickets){
        console.log(ticket);

        let obj = {
          isMeiaEntrada: ticket.isMeiaEntrada,
          setor: ticket.setor,
          preco: ticket.preco,
          idTitular: `api/usuarios/${ticket.titular.id}`,
          idPedido: `api/pedidos/${objeto.pedido.id}`,
          idEvento: `api/eventos/${ticket.evento.id}`
        }
        console.log(obj);
        try{
          const postTicketsPedido = await fetch(`https://hgt-events.herokuapp.com/api/tickets`, 
                            {method: 'post', 
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(obj)
                          });
        }catch(err){
          return new Error('Erro ao inserir tickets junto ao pedido');
        }
      }
  }

  // getTicketByUser(idUsuario: number): Promise<Tickets[]>{
  //   return new Promise(async (resolve, reject) => {
  //   let loading = await this.loadingController.create({
  //     message: 'Carregando seus ingressos...',
  //     keyboardClose: true,
  //     showBackdrop: true,
  //     animated: true,
  //     duration: 2000
  //   });
  //   loading.present()
  //   .then(() => {
  //     fetch(`https://hgt-events.herokuapp.com/api/usuarios/${idUsuario}/tickets`)
  //     .then(resp => resp.json())
  //     .then(json => {
  //       resolve(json['hydra:member']);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       reject('Erro ao consultar seus ingressos.');
  //     });
  //   });
  //   });
  // }

  // async novoTicket(arrayTickets: Tickets[]){
  //   let loading = await this.loadingController.create({
  //     message: 'Finalizando compra...',
  //     keyboardClose: true,
  //     showBackdrop: true,
  //     animated: true,
  //     duration: 2000
  //   });
  //   loading.present()
  //   .then(() => {
  //     this.tickets.push(...arrayTickets);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     loading.dismiss();
  //   });
  // }

  // getTicket(): Promise<Tickets[]>{
  //   return new Promise(async (resolve, reject) => {
  //     let loading = await this.loadingController.create({
  //       message: 'Carregando ingressos...',
  //       keyboardClose: true,
  //       showBackdrop: true,
  //       animated: true,
  //     });

  //     loading.present()
  //     .then(() => {
  //       resolve(this.tickets);
  //       console.log(this.tickets);
  //     })
  //     .catch(err => {
  //       reject(err);
  //       console.log('Erro ao trazer tickets.' + err);
  //     })
  //     .finally(() => {
  //       loading.dismiss();
  //     });
  //   });
  // }
}
