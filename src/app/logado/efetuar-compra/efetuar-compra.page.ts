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

@Component({
  selector: 'app-efetuar-compra',
  templateUrl: './efetuar-compra.page.html',
  styleUrls: ['./efetuar-compra.page.scss'],
})
export class EfetuarCompraPage implements OnInit {
  private eventoSelecionado: EventoSetoresSelecionado = null;
  private formaPagamento = [];

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
    this.setBotaoConfirmar();
    this.getStoragePedido()
    .then(resp => {
      this.eventoSelecionado = resp;
      this.formaPagamento = this.formaPagamentoService.formasPagamento;
    });
  }

  confirmarPedido(){
    debugger;
    let pedidoConfirmado = {
      evento: this.eventoSelecionado.evento,
      setores: this.eventoSelecionado.setores,
      valorTotal: this.eventoSelecionado.valorTotal,
      formaPagamento: this.formaPagamento,
      qtdIngressos: this.eventoSelecionado.qtdIngressos
    };
    console.log(pedidoConfirmado);
    this.pedidoService.novoPedido(pedidoConfirmado)
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
}
