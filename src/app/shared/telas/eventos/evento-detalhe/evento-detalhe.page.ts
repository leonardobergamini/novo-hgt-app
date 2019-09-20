import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavController } from '@ionic/angular';
import { Setores } from 'src/app/shared/models/setores/setores';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';
import { Storage } from '@ionic/storage';
import { EventoSetoresSelecionado } from 'src/app/shared/interfaces/evento-setor-selecionado/evento-setores-selecionado';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  private id: number = 0;
  private contador: number = 0;
  private evento: Eventos = null;
  private ativarBtn: boolean = false;
  private valorTotal: number = 0;
  private qtdIngressos: number = 0;
  private arraySetoresSemQuantidade = [];
  private arraySetoresSelecionados = [];
  private arraySomenteSetoresSelecionados: QuantidadeIngressoSetor[] = [];
  @Input() eventos: Eventos;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    private statusBar: StatusBar,
    private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit() {
    this.evento = JSON.parse(localStorage.getItem('detalhe-evento'))
    this.evento.setores.sort((a,b) => {
      return Number(a.preco) - Number(b.preco);
    });
    this.evento.setores.forEach((value, i) => {
      this.arraySetoresSemQuantidade.push({setor: value.nome, contador: 0});
    });
  }

  ionViewDidEnter(){ 
    this.removerValorTotalNoBotao();
    this.arraySomenteSetoresSelecionados = [];
  }

  ionViewDidLeave(){ }

  adicionaBotaoComprar(){
    $('ion-tabs').find('ion-button').removeClass('ion-hide');
  }

  voltar(){
    localStorage.removeItem('evento-detalhe');
    this.navCtrl.navigateBack('menu-logado/explorar');
  }

  validarCompra(evento){
    if(this.arraySetoresSelecionados.length > 0 && this.contador){
      this.somenteSetoresSelecionados(this.arraySetoresSelecionados);
      this.getQuantidadeIngressos(this.arraySetoresSelecionados);
      
      this.storage.remove('eventoSelecionado')
      .then(resp => {console.log('Excluindo storage...');});

      let eventoComSetoresSelecionado: EventoSetoresSelecionado = {
        evento: evento,
        setores: this.arraySomenteSetoresSelecionados,
        valorTotal: this.valorTotal,
        qtdIngressos: this.qtdIngressos
      }
      this.storage.set('eventoSelecionado', eventoComSetoresSelecionado);
      this.router.navigate(['/menu-logado/efetuar-compra']);
    }else{
      console.log('Contador zerado');
    }
  }

  selecionarSetor(setor: Setores, contador: number){
    this.contador = Number(contador);
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

  somenteSetoresSelecionados(arraySetores){
    arraySetores.forEach((value, i) => {
      if(value.contador > 0){
        this.arraySomenteSetoresSelecionados.push(value);
      }
    });
  }

  getQuantidadeIngressos(setores){
    let valorTmp: number = 0;
    this.arraySomenteSetoresSelecionados.forEach((setor, i) => {
      if(setor.contador > 0){
        valorTmp += setor.contador;
      }
    });
    return this.qtdIngressos = valorTmp;
  }

  adicionarValorTotalNoBotao(){
    $('.btnComprar').attr('color', 'success').html(`<strong>Valor da compra: R$ ${this.valorTotal}</strong>`);
  }

  removerValorTotalNoBotao(){
    $('.btnComprar').attr('color', 'primary').text('garanta seu ingresso');
  }


}
