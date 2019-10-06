import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';
import { EventEmitter } from 'events';
import { ModalController, NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import * as $ from 'jquery';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent implements OnInit{

  @Input() eventos: Eventos[];
  @Input() novidades: boolean;
  @Input() opcoes;
  @Output() eventoClicado = new EventEmitter();
  eventosNovos: Eventos[] = [];
  erro:string;

  slidesOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: true,
    breakpoints: {
      // <= 320px
      320: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
      },
      // <= 480px
      480: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
      },
      // <= 640px
      640: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
      },
      // <= 768px
      768: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
      }
    }
  };

  constructor(
    private eventoService: EventosService,
    private keyboard: Keyboard,
    private navCtrl: NavController
  ) {}

  ngOnInit(){
    this.carregarEventos();    

    if(!this.novidades){
      return;
    }else{
      this.getNovosEventos();
    }
  }

  carregarEventos(){
    this.eventoService.getAllEventos()
    .then(resp => {
      this.eventos = resp;
      $('#música').click();
    })
    .catch(err => {
      console.log(err);
    });
  }

  async exibirDetalhes(evento){
    this.keyboard.hide();
    localStorage.setItem('detalhe-evento', JSON.stringify(evento));
    this.navCtrl.navigateForward(`menu-logado/explorar/detalhe-evento/${evento.id}`);
  }

  getNovosEventos(){
    // this.eventosNovos = this.eventoService.getNovosEventos();
  }

}
