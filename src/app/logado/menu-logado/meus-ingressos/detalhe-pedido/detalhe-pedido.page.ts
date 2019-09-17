import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavParams, ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { PresentearPage } from './presentear/presentear.page';
import { RevenderPage } from './revender/revender.page';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import { TicketsPedido } from 'src/app/shared/interfaces/tickets-pedido/tickets-pedido';

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
  private arrayPedidos: TicketsPedido[] = [];

  constructor(
    private statusBar: StatusBar,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private navCrtl: NavController,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService

  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = this.id = Number(this.activatedRoute.snapshot.paramMap.get('idPedido'));
    this.pedidoService.getTicketsPorPedido([], this.id);
    this.arrayPedidos = this.pedidoService.arrayTicketsPorIdPedido;
    console.log(this.arrayPedidos);
    this.arrayPedidos.forEach(item => {
      this.objPedido = {
        pedido: item.pedido,
        tickets: item.tickets
      }
    });
    console.log(this.objPedido);
  }

  fecharModal(){
    this.modalController.dismiss();
  }

  async presentar(ticket, i){
    console.log(ticket);
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
                pedido: ticket.pedido,
                ticket: this.objPedido.tickets[i]
              }
            });
            console.log(ticket);
            return await modalPresentear.present();
          }
        }
      }, 
      {
        text: 'Revender',
        icon: 'pricetag',
        handler: () => {
          if(ticket){
            this.fecharModal();
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
