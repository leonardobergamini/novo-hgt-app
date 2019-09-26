import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavParams, ModalController, ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { PresentearPage } from './presentear/presentear.page';
import { RevenderPage } from './revender/revender.page';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import { TicketsPedido } from 'src/app/shared/interfaces/tickets-pedido/tickets-pedido';
import { Tickets } from 'src/app/shared/models/tickets/tickets';

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
  private arrayTickets: Tickets;

  constructor(
    private statusBar: StatusBar,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private navCrtl: NavController,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,

  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = this.id = Number(this.activatedRoute.snapshot.paramMap.get('idPedido'));
    this.arrayTickets = JSON.parse(localStorage.getItem('detalhe-pedido'));
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
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
            this.navCrtl.navigateForward(`menu-logado/meus-ingressos/detalhe-pedido/revender/${ticket.id}`);
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
