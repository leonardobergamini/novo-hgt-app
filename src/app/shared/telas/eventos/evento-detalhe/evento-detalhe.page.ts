import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Setores } from 'src/app/shared/models/setores/setores';
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  private contador: number = 0;
  private evento: Eventos = null;
  private ativarBtn: boolean = false;
  private setoresSelecionados: Object[] = [];
  private novoArray;
  @Input() eventos: Eventos;

  constructor(
    private activeRoute: ActivatedRoute, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router
  ){
    this.evento = navParams.get('eventoSelecionado');
  }

  ngOnInit() {
    this.evento.setores.forEach((value, i) => {
      this.setoresSelecionados.push({setor: value.nome, contador: 0});
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

  validarCompra(evento, event){
    this.fecharModal();
    this.router.navigate(['/menu-logado/efetuar-compra']);
    console.log(event.target);
  }

  // selecionaSetor(setor, event){
  //   let iconeClicado = $(event.target).attr('name');
  //   let contador = Number($('.contador').text());
  //   let setoresSelecionados: Setores = null;

  //   if(iconeClicado === 'add-circle'){
  //     setoresSelecionados = {...setor, quantidade: contador};
  //   }else if(iconeClicado === 'remove-circle'){
  //     if(contador === 0){
  //       console.log('Nenhum setor selecionado.');
  //     }else{
  //       //setoresSelecionados = {setor: setor, quantidade: contador};
  //     }
  //   }else{
  //     return;
  //   }

  //   console.log(setoresSelecionados);
  // }

  exibirContador(setor: Setores, contador){
    this.novoArray = this.setoresSelecionados.map(value => {
      //console.log(value.setor === setor.nome);
      if(setor.nome === value.setor){
        let novoContador = Number(value.contador++);
        value = {setor: value.setor, contador: novoContador};
      }
      return value;
    });
    //this.setoresSelecionados.push();
    
    //console.log(setor.nome + ' qtd: ' + contador);
    console.log(this.novoArray);
  }
}
