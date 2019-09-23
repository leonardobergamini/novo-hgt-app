import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';
import { FormaPagamentoService } from 'src/app/shared/services/formas-pagamento/forma-pagamento.service';
import { EventoSetoresSelecionado } from 'src/app/shared/interfaces/evento-setor-selecionado/evento-setores-selecionado';
import { Pedidos } from 'src/app/shared/models/pedidos/pedidos';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import * as $ from 'jquery';
import { FormasPagamento } from 'src/app/shared/models/formas-pagamento/formas-pagamento';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-efetuar-compra',
  templateUrl: './efetuar-compra.page.html',
  styleUrls: ['./efetuar-compra.page.scss'],
})
export class EfetuarCompraPage implements OnInit {
  private eventoSelecionado: EventoSetoresSelecionado = null;
  private formaPagamentoSelecionada: FormasPagamento;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private formaPagamentoService: FormaPagamentoService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    localStorage.removeItem('efetuar-compra-back');
    this.setBotaoConfirmar();
    this.getStoragePedido()
    .then(resp => {
      this.eventoSelecionado = resp;
      this.formaPagamentoService.getFormaPagamentoAtiva()
      .then(resp => {
        this.formaPagamentoSelecionada = resp;
        this.formaPagamentoSelecionada.cartao = Utils.escondeNroCartao(this.formaPagamentoSelecionada.cartao);
      })
      .catch(err => {
        console.log(err);
      })
      // this.formaPagamentoSelecionada = this.formaPagamentoService.formasPagamento;
    });
  }

  confirmarPedido(){
    let pedidoConfirmado = {
      evento: this.eventoSelecionado.evento,
      setores: this.eventoSelecionado.setores,
      valorTotal: this.eventoSelecionado.valorTotal,
      formaPagamento: this.formaPagamentoSelecionada,
      qtdIngressos: this.eventoSelecionado.qtdIngressos
    };
    console.log(pedidoConfirmado);
    // this.pedidoService.novoPedido(pedidoConfirmado)
    this.pedidoService.create(pedidoConfirmado)
    .then(resp => {

    })
    .catch(err => {
      console.log(err);
    })
  }

  getStoragePedido(): Promise<EventoSetoresSelecionado>{
    return new Promise((resolve, reject) => {
      this.storage.get('eventoSelecionado')
      .then(resp => {
        resolve(resp);
      });
    })
  }

  setBotaoConfirmar(){
    $('.btnComprar').attr('color', 'success').html(`confirmar`);
  }

  voltar(){
    this.navCtrl.navigateBack(`menu-logado/explorar/detalhe-evento/${this.eventoSelecionado.evento.id}`);
  }

  abrirFormaPagamentoPage(){
    localStorage.setItem('efetuar-compra-back', JSON.stringify({rota:'menu-logado/efetuar-compra'}));
    this.navCtrl.navigateForward('menu-logado/perfil/formas-pagamento');
  }
}
