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
        header: 'Albums',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

}
