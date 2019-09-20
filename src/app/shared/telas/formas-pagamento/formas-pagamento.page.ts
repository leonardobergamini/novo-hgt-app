import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormaPagamentoService } from '../../services/formas-pagamento/forma-pagamento.service';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { NavController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.page.html',
  styleUrls: ['./formas-pagamento.page.scss'],
})
export class FormasPagamentoPage implements OnInit {
  
  public formasPagamento: FormasPagamento[] = [];
  private toast;
  public efetuarCompraLink;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    debugger;
    this.efetuarCompraLink = JSON.parse(localStorage.getItem('efetuar-compra-back'));
    if(this.efetuarCompraLink){
      console.log(this.efetuarCompraLink);
    }
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();

    this.formaPagamentoService.getAll()
    .then(resp => {
      debugger;
      console.log(resp);
      this.formasPagamento = resp;
      this.formasPagamento.forEach(forma => {
        forma.cartao = Utils.escondeNroCartao(forma.cartao);
      });
      console.log(this.formasPagamento);
    })
    .catch(err => {
      this.formasPagamento = [];
      console.log(err);
    })

    // this.formaPagamentoService.consultar()
    // .then(resp => {
    //   if(resp.length === 0){
    //     this.formasPagamento = null;
    //   }else{
    //     this.formasPagamento = resp;
    //   }
    // })
    // .catch(err => {
    //   this.formasPagamento = new Array<FormasPagamento>();
    // });
  }

  ionViewDidLeave(){
    localStorage.removeItem('efetuar-compra-back');
  }

  excluirForma(event){
    let idForma = $(event.target).parent().parent().find('ion-item').find('ion-input').val();
    this.formaPagamentoService.remover(idForma)
    .then(resp => {
      this.exibirToast(resp, 'checkmark-circle');
    });
  }

  exibirToast(msg: string, icone: string){
    this.toast = this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: msg,
      closeButtonText: 'fechar',
      showCloseButton: true,
      buttons: [
        {
          side: 'start',
          icon: icone
        }
      ]
    }).then(toastData => {
      toastData.present();
    });  
  }
}
