import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavParams, ModalController, ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { PresentearPage } from './presentear/presentear.page';
import { RevenderPage } from './revender/revender.page';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import { TicketsPedido } from 'src/app/shared/interfaces/tickets-pedido/tickets-pedido';
import { Tickets } from 'src/app/shared/models/tickets/tickets';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { AnunciosService } from 'src/app/shared/services/anuncios/anuncios.service';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.page.html',
  styleUrls: ['./detalhe-pedido.page.scss'],
})
export class DetalhePedidoPage implements OnInit {

  private pedido;
  private tickets;
  private objPedido;
  private id: number = 0;
  private arrayTickets;

  constructor(
    private statusBar: StatusBar,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private navCrtl: NavController,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private ticketService: TicketsService,
    private anuncioService: AnunciosService

  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = this.id = Number(this.activatedRoute.snapshot.paramMap.get('idPedido'));
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    console.log('entrou');
    this.pedidoService.getTicketsByPedido(this.id)
    .then(resp => {
      let obj = {
        pedido: this.id,
        tickets: resp
      }
      this.arrayTickets = obj;
      console.log(this.arrayTickets);

      // for(const ticket of this.arrayTickets.tickets){
      //   debugger;
      //   this.anuncioService.temAnuncios(ticket['@id'])
      //   .then(resp => {
      //     debugger;
      //   })
      //   .catch(err => {
      //     debugger;
      //     console.log(err);
      //   })
      // }

    })
    .catch(err => {
      console.log(err);
    });
  }

  async acoes(ticket, i){
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',
      buttons: [ 
      {
        text: 'Presentear',
        icon: 'gift',
        handler: async () => {
          if(ticket){
            const modalPresentear = await this.modalController.create({
              component: PresentearPage,
              componentProps: {
                pedido: this.arrayTickets.pedido,
                ticket: ticket
              }
            });
            console.log(ticket);
            return await modalPresentear.present();
          }
        }
      }, 
      {
        text: 'Anunciar',
        icon: 'pricetag',
        handler: () => {
          if(ticket){
            localStorage.setItem('ticket', JSON.stringify(ticket));
            this.navCrtl.navigateForward(`menu-logado/meus-ingressos/detalhe-pedido/revender/${this.arrayTickets.pedido}`);
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

}
