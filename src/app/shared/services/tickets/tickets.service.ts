import { Injectable } from '@angular/core';
import { Eventos } from '../../models/eventos/eventos';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Pedidos } from '../../models/pedidos/pedidos';
import { Tickets } from '../../models/tickets/tickets';
import { LoadingController } from '@ionic/angular';
import { QuantidadeIngressoSetor } from '../../interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private id: number = 1
  public tickets: Tickets[] = [];

  constructor(
    private loadingController: LoadingController
  ) { }

  async novoTicket(arrayTickets: Tickets[]){
    let loading = await this.loadingController.create({
      message: 'Finalizando compra...',
      keyboardClose: true,
      showBackdrop: true,
      animated: true,
      duration: 2000
    });
    loading.present()
    .then(() => {
      this.tickets.push(...arrayTickets);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading.dismiss();
    });
  }

  getTicket(): Promise<Tickets[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Carregando ingressos...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true,
      });

      loading.present()
      .then(() => {
        resolve(this.tickets);
        console.log(this.tickets);
      })
      .catch(err => {
        reject(err);
        console.log('Erro ao trazer tickets.' + err);
      })
      .finally(() => {
        loading.dismiss();
      });
    });
  }
}
