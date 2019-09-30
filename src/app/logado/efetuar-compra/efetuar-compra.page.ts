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
  private eventoSelecionado = null;
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
    
    this.eventoSelecionado = JSON.parse(localStorage.getItem('eventoSelecionado'));
    this.formaPagamentoService.getAll()
    .then(resp => {
      this.formaPagamentoSelecionada = resp;
      this.formaPagamentoSelecionada.cartao = Utils.escondeNroCartao(this.formaPagamentoSelecionada.cartao);
    })
    .catch(err => {
      console.log(err);
    });
  }

  confirmarPedido(){
    debugger;
    if(this.eventoSelecionado.anuncio){
      let pedidoConfirmado = {
        evento: this.eventoSelecionado.evento,
        setores: this.eventoSelecionado.setores,
        valorTotal: this.eventoSelecionado.valorTotal,
        formaPagamento: this.formaPagamentoSelecionada,
        qtdIngressos: this.eventoSelecionado.qtdIngressos
      };
      console.log(pedidoConfirmado);
      this.pedidoService.create(pedidoConfirmado)
      .then(resp => {
        debugger;
        console.log(resp);
        this.navCtrl.navigateForward('menu-logado/meus-ingressos');
        
      })
      .catch(err => {
        console.log(err);
      })

    }else{
      let pedidoConfirmado = {
        evento: this.eventoSelecionado.evento,
        setores: this.eventoSelecionado.setores,
        valorTotal: this.eventoSelecionado.valorTotal,
        formaPagamento: this.formaPagamentoSelecionada,
        qtdIngressos: this.eventoSelecionado.qtdIngressos
      };
      console.log(pedidoConfirmado);
      this.pedidoService.create(pedidoConfirmado)
      .then(resp => {
        debugger;
        console.log(resp);
        this.navCtrl.navigateForward('menu-logado/meus-ingressos');
        
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  setBotaoConfirmar(){
    $('.btnComprar').attr('color', 'success').html(`confirmar`);
  }

  voltar(){
    this.navCtrl.navigateBack(`menu-logado/explorar/detalhe-evento/${this.eventoSelecionado.evento.id}`);
    localStorage.removeItem('eventoSelecionado');
  }

  abrirFormaPagamentoPage(){
    localStorage.setItem('efetuar-compra-back', JSON.stringify({rota:'menu-logado/efetuar-compra'}));
    this.navCtrl.navigateForward('menu-logado/perfil/formas-pagamento');
  }
}
