import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  private contador: number = 0;
  evento: Eventos = null;
  ativarBtn: boolean = false;
  @Input() eventos: Eventos;


  constructor(private activeRoute: ActivatedRoute, 
              private navParams: NavParams,
              private modalCtrl: ModalController){

    this.evento = navParams.get('eventoSelecionado');
  }

  ngOnInit() {
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
}
