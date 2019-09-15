import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.page.html',
  styleUrls: ['./detalhe-pedido.page.scss'],
})
export class DetalhePedidoPage implements OnInit {

  private pedido;
  private tickets;
  private objPedido;

  constructor(
    private statusBar: StatusBar,
    private modalController: ModalController,
    public actionSheetController: ActionSheetController      
  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.objPedido = {
      pedido: this.pedido,
      tickets: this.tickets
    }
    console.log(this.objPedido);
  }

  fecharModal(){
    this.modalController.dismiss();
  }

  async presentar(ticket){
      const actionSheet = await this.actionSheetController.create({
        header: 'Ações',
        buttons: [ 
        {
          text: 'Presentear',
          icon: 'gift',
          handler: () => {
            console.log('presentar clicked');
            console.log(ticket);
          }
        }, 
        {
          text: 'Revender',
          icon: 'pricetag',
          handler: () => {
            console.log('revender clicked');
            console.log(ticket);
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
