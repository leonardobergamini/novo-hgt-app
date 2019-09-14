import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';
import { FormaPagamentoService } from 'src/app/shared/services/formas-pagamento/forma-pagamento.service';
import { EventoSetoresSelecionado } from 'src/app/shared/interfaces/evento-setor-selecionado/evento-setores-selecionado';
import { Pedidos } from 'src/app/shared/models/pedidos/pedidos';
import { PedidoService } from 'src/app/shared/services/pedidos/pedido.service';
import { Eventos } from 'src/app/shared/models/eventos/eventos';

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

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.getStoragePedido();
    this.formaPagamento = this.formaPagamentoService.formasPagamento;
  }

  confirmarPedido(){
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

  getStoragePedido(){
    this.storage.get('eventoSelecionado')
    .then(resp => {
      this.eventoSelecionado = resp;
    });
  }

}
