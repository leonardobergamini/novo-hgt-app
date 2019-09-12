import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Setores } from 'src/app/shared/models/setores/setores';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  private contador: number = 0;
  private evento: Eventos = null;
  private ativarBtn: boolean = false;
  private valorTotal: number = 0;
  private arraySetoresSemQuantidade = [];
  private arraySetoresSelecionados = [];
  @Input() eventos: Eventos;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage
  ){
    this.evento = navParams.get('eventoSelecionado');
  }

  ngOnInit() {
    this.evento.setores.forEach((value, i) => {
      this.arraySetoresSemQuantidade.push({setor: value.nome, contador: 0});
    });
    $('#favorito').click(() => {
      $('#favorito').toggleClass('favoritoClicado');
    });
  }

  reset(){
    $('#favorito').removeClass('favoritoClicado');
  }

  adicionaBotaoComprar(){
    $('ion-tabs').find('ion-button').removeClass('ion-hide');
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  validarCompra(evento){
    if(this.arraySetoresSelecionados.length > 0){
      this.storage.remove('eventoSelecionado');
      let eventoComSetoresSelecionado = {
        evento: evento,
        setores: this.arraySetoresSelecionados,
        valorTotal: this.valorTotal
      }
      this.storage.set('eventoSelecionado', eventoComSetoresSelecionado);
      this.fecharModal();
      this.router.navigate(['/menu-logado/efetuar-compra']);
    }
  }

  selecionarSetor(setor: Setores, contador: number){
    this.arraySetoresSelecionados = this.arraySetoresSemQuantidade;
     let novoArray = this.arraySetoresSemQuantidade.map((value: QuantidadeIngressoSetor) => {
      if(setor.nome === value.setor){
        return value = {
          setor: value.setor, 
          contador: Number(contador),
          preco: Number(setor.preco),
          valorTotal: (Number(setor.preco) * Number(contador))
        };
      }
      return value;
    });

    novoArray.forEach((value: QuantidadeIngressoSetor, i) => {
      if(value.setor === this.arraySetoresSelecionados[i].setor && (value.contador >= this.arraySetoresSelecionados[i].contador || value.contador <= this.arraySetoresSelecionados[i].contador)) {
        this.arraySetoresSelecionados[i].contador = value.contador;
        this.arraySetoresSelecionados[i].preco = value.preco;
        this.arraySetoresSelecionados[i].valorTotal = (value.preco * value.contador);
      }else{
        return;
      }
    });
    this.calcularValorTotal(this.arraySetoresSelecionados);
    this.valorTotal > 0 ? this.adicionarValorTotalNoBotao() : this.removerValorTotalNoBotao();

  }

  calcularValorTotal(setores){
    let valorTmp: number = 0;
    this.arraySetoresSelecionados.forEach((setor, i) => {
      if(setor.valorTotal >= 0){
        valorTmp += setor.valorTotal;
      }
    });
    return this.valorTotal = valorTmp;
  }

  adicionarValorTotalNoBotao(){
    $('ion-button').attr('color', 'success').html(`<strong>Valor da compra: R$ ${this.valorTotal}</strong>`);
  }

  removerValorTotalNoBotao(){
    $('ion-button').attr('color', 'primary').text('garanta seu ingresso');
  }


}
