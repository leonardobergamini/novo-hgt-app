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
        idTitular: ticket.titular['@id'],
        idPedido: `/api/pedidos/${objeto.pedido.id}`,
        idEvento: `/api/eventos/${ticket.evento.id}`
      }
      console.log(obj);
      try{
        const postTicketsPedido = await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/tickets`, 
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

  updateTitular(idNovoTitular: string, idTicket: string): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let obj = {idTitular: idNovoTitular, ispresente: true}
      let loading = await this.loadingController.create({
        message: 'Presenteando...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idTicket}`, 
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          if(resp.status == 200 || resp.status == 201 || resp.status == 204){
            resolve('Presente enviado com sucesso.');
            loading.dismiss();
          }else{
            reject('Erro ao presentear.');
            loading.dismiss();
          }
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    });
  }

  verificaPresente(): Promise<any>{
    return new Promise(async (resolve, reject) => {
      let arrayTicketsPresentes = [] = [];
      let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${usuarioLogado['@id']}`)
      .then(resp => resp.json())
      .then(json => {
        let ingressos = json['tickets'];
        for(const ticket of ingressos){
          if(ticket.ispresente == true){
            arrayTicketsPresentes.push(ticket);
          }
        }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
      resolve(arrayTicketsPresentes);
    });
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
