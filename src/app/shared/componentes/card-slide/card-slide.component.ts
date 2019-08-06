import { Component, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';
import { EventEmitter } from 'events';
import { ModalController } from '@ionic/angular';
import { EventoDetalhePage } from 'src/app/eventos/evento-detalhe/evento-detalhe.page';

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

  constructor(private eventoService: EventosService,
              private modalController: ModalController) {}

  ngOnInit(){
    if(!this.novidades){
      return;
    }else{
      this.getNovosEventos();
    }
  }

  eventoClick(evento){
    this.eventoClicado.emit(evento);
    this.exibirDetalhes(evento);
  }

  async exibirDetalhes(evento){
    const modal = await this.modalController.create({
      component: EventoDetalhePage,
      componentProps: {
        'eventoSelecionado': evento
      }
    });
    return await modal.present();
  }

  getNovosEventos(){
    this.eventoService = new EventosService();
    this.eventosNovos = this.eventoService.getNovosEventos();
  }

}
