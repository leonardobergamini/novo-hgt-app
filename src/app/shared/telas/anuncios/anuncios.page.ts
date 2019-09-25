import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ActionSheetController, IonSegment, AlertController } from '@ionic/angular';

import { AnunciosService } from '../../services/anuncios/anuncios.service';
import { Anuncios } from '../../models/anuncios/anuncios';
import * as $ from 'jquery';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {

  private arrayAnunciosAtivos: Anuncios[] = [];
  private arrayAnunciosVendidos: Anuncios[] = [];
  private arrayAnuncios: Anuncios[] = [];
  @ViewChild('formSlides') formSlides;

  constructor(
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private anuncioService: AnunciosService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.carregarAnuncios();
  }

  selecionar(aba: string){
    aba === 'vendidos' ? this.formSlides.slideNext() : this.formSlides.slidePrev();   
  }

  ativarAba(aba: string){
    if(aba === 'vendidos'){
      $('#vendidos').attr('checked', true);
      $('#ativos').removeAttr('checked');
    }else{
      $('#vendidos').removeAttr('checked');
      $('#ativos').attr('checked', true);
    }
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }

  atualizarTela(event){
    this.arrayAnuncios = [];
    this.anuncioService.getAll()
    .then(resp => {
      console.log(resp);
      this.arrayAnuncios = resp;
      let copyArrayAtivos = this.arrayAnuncios;
      this.arrayAnunciosVendidos = [];
      this.arrayAnunciosAtivos = [];

      copyArrayAtivos.filter(item => {
        item.isvendido === false ? this.arrayAnunciosAtivos.push(item) : this.arrayAnunciosVendidos.push(item);
      });

      event.target.complete();
    })
    .catch(err => {
      console.log(err);
    });
  }

  carregarAnuncios(){
    this.arrayAnuncios = [];
    this.anuncioService.getAll()
    .then(resp => {
      console.log(resp);
      this.arrayAnuncios = resp;
      let copyArrayAtivos = this.arrayAnuncios;
      this.arrayAnunciosVendidos = [];
      this.arrayAnunciosAtivos = [];

      copyArrayAtivos.filter(item => {
        item.isvendido === false ? this.arrayAnunciosAtivos.push(item) : this.arrayAnunciosVendidos.push(item);
      })
    })
    .catch(err => {
      console.log(err);
    });
  }


  async opcoes(anuncio){
    const actionSheet = await this.actionSheetController.create({
      header: `Ações para anúncio #000${anuncio.id}`,
      buttons: [ 
      {
        text: 'Editar',
        icon: 'create',
        handler: async () => {
          const alert = await this.alertController.create({
            header: 'Editar anúncio',
            inputs: [
              {
                name: 'novoValor',
                type: 'number',
                label: 'Novo valor',
                placeholder: 'R$ 0,00'
              },
            ],
            buttons: [
              {
                text: 'cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  return;
                }
              }, {
                text: 'editar',
                handler: (e) => {
                  let obj = {
                    novoValor: e.novoValor,
                    anuncio: anuncio
                  }
                  this.anuncioService.update(obj)
                  .then(resp => {
                    console.log(resp);
                    this.carregarAnuncios();
                  })
                  .catch(err => {
                    console.log(err);
                  });
                }
              }
            ]
          });
      
          await alert.present();        
        }
      }, 
      {
        text: 'Excluir',
        icon: 'md-trash',
        handler: () => {
          this.alertController.create({
            header: 'Excluir anúncio.',
            animated: true,
            message: 'Confirma a exclusão desse anúncio?',
            buttons: [
              {
                text: 'Não',
                cssClass: 'secondary',
                role: 'cancel',
                handler: () => {
                  return;
                }
              },
              {
                text: 'Sim',
                handler: () => {
                  console.log(anuncio);
                  this.anuncioService.delete(anuncio)
                  .then(resp => {
                    console.log(resp);
                    this.carregarAnuncios();
                  })
                  .catch(err => {
                    console.log(err);
                  })
                }
              } 
            ]
          }).then(alert => {
            alert.present();
          })        
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
