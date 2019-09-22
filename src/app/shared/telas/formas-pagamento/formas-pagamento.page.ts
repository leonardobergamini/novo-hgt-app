import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormaPagamentoService } from '../../services/formas-pagamento/forma-pagamento.service';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { NavController, ToastController, ActionSheetController, AlertController, IonItemSliding } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';
import { Utils } from '../../utils/utils';
import { CartaoCreditoService } from '../../services/cartao-credito/cartao-credito.service';
import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.page.html',
  styleUrls: ['./formas-pagamento.page.scss'],
})
export class FormasPagamentoPage implements OnInit {
  
  public formaPagamento: FormasPagamento;
  private toast;
  public efetuarCompraLink;
  @ViewChild('itemCartaoCredito') itemSlide: IonItemSliding;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private toastController: ToastController,
    private alertController: AlertController,
    private cartaoCreditoService: CartaoCreditoService
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.efetuarCompraLink = JSON.parse(localStorage.getItem('efetuar-compra-back'));
    this.formaPagamentoService.getAll()
    .then(resp => {
      this.formaPagamento = resp;
      this.formaPagamento.cartao = Utils.escondeNroCartao(this.formaPagamento.cartao);
      console.log(this.formaPagamento);
    })
    .catch(err => {
      console.log(err);
      this.exibirToast('Erro ao exibir formas de pagamento. Tente novamente.', 'md-circle-check');
    });

    this.itemSlide.close();
  }

  ionViewDidLeave(){
    localStorage.removeItem('efetuar-compra-back');
  }

  editarCartao(cartao){
    this.navCtrl.navigateForward(`menu-logado/perfil/formas-pagamento/cartao-credito/${cartao.cartao.id}`);
  }

  excluirCartao(cartao: CartoesCredito){
    this.alertController.create({
      header: 'Editar cartão',
      message: 'Deseja realmente excluir esse cartão?',
      buttons: [
        {
          text: 'não',
          role: 'cancel',
          handler: () => {
            return;
          }
        }, {
          text: 'sim',
          handler: () => {
            console.log(cartao);
            this.cartaoCreditoService.delete(cartao)
            .then(resp => {
              this.alertController.dismiss();
              this.exibirToast('Cartão de crédito excluído com sucesso.', 'checkmark-circle');
            })
            .catch(err => {
              this.alertController.dismiss();
              this.exibirToast(err, 'md-md-close-circle');
            })
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
        // let idForma = $(event.target).parent().parent().find('ion-item').find('ion-input').val();
    // this.formaPagamentoService.remover(idForma)
    // .then(resp => {
      // this.exibirToast(resp, 'checkmark-circle');
    // });
  }

  selecionarForma(forma: FormasPagamento, event, index: number){
    // let copyFormas: FormasPagamento[] = [];
    // this.formasPagamento = [];
    // this.formasPagamento = copyFormas;
    // console.log(this.formasPagamento)
    let elemento = event.target;
    let elementos = $('ion-radio');


    if($(elemento).attr('aria-checked', 'true')){
      if(index === 0){
        //cartão
        forma.pagamento = true;
        elementos.forEach(item => {
          $(item).hasClass('radio-checked') ? $(item).removeClass('radio-checked') : $(item).addClass('radio-checked');
        })
      }else if(index === 1){
        //carteira

      }
      this.exibirToast('Forma de pagamento alterada com sucesso!', 'md-checkmark')
      forma.pagamento = true;
    }

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
