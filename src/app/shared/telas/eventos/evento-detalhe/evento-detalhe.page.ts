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
        setores: this.arraySetoresSelecionados
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
        value = {
          setor: value.setor, 
          contador: Number(contador),
          preco: setor.preco,
          valorTotal: (setor.preco * contador)
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
    console.log(this.arraySetoresSelecionados);
    console.log(this.calcularValorTotal(this.arraySetoresSelecionados));
  }

  calcularValorTotal(setores): number{
    return this.valorTotal = this.arraySetoresSelecionados.reduce((prevVal, elem) => {
      if(prevVal.valorTotal)
      console.log(prevVal.valorTotal);
      // return prevVal + elem.valorTotal;
    });
  }


}
