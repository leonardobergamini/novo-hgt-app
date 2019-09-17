import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';

@Component({
  selector: 'app-presentear',
  templateUrl: './presentear.page.html',
  styleUrls: ['./presentear.page.scss'],
})
export class PresentearPage implements OnInit {

  private objPedido;
  private pedido;
  private ticket;
  private itens = [];
  private listaUsuarioFiltrado = [];

  constructor(
    private modalController: ModalController,
    private statusBar: StatusBar,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.objPedido = {
      pedido: this.pedido,
      ticket: this.ticket
    }
    console.log(this.objPedido);

    this.itens = [
      {
        usuario: 'alan',
        email: 'alan@gmail.com'
      },
      {
        usuario: 'vitor',
        email: 'vitor@gmail.com'
      },
      {
        usuario: 'pedro',
        email: 'pedro@gmail.com'
      }

    ];
  }

  pesquisarUsuario(event){
    let query = event.target.value.toLowerCase();
    this.itens.filter(item => {
        query === item.usuario ? this.listaUsuarioFiltrado.push(item) : null;
    });
  }

 async presentear(item){
      const alert = await this.alertController.create({
        header: 'Prompt!',
        inputs: [
          {
            name: 'name1',
            type: 'text',
            placeholder: 'Placeholder 1'
          },
          {
            name: 'name2',
            type: 'text',
            id: 'name2-id',
            value: 'hello',
            placeholder: 'Placeholder 2'
          },
          {
            name: 'name3',
            value: 'http://ionicframework.com',
            type: 'url',
            placeholder: 'Favorite site ever'
          },
          // input date with min & max
          {
            name: 'name4',
            type: 'date',
            min: '2017-03-01',
            max: '2018-01-12'
          },
          // input date without min nor max
          {
            name: 'name5',
            type: 'date'
          },
          {
            name: 'name6',
            type: 'number',
            min: -5,
            max: 10
          },
          {
            name: 'name7',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
      await alert.present();
    }

  fecharModal(){
    this.modalController.dismiss();
  }

}
