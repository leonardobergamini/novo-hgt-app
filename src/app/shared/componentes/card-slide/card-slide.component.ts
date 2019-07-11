import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent implements OnInit{

  @Input() eventos: Eventos[];
  @Input() novidades: boolean;
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

  constructor(private router: Router, private eventoService: EventosService) {}

  ngOnInit(){
    if(!this.novidades){
      return;
    }else{
      this.getNovosEventos();
    }
  }

  exibirDetalhes(evento){
    let navigationExtras: NavigationExtras = {
      state: {
        evento: evento,
        ativarBtn: true
      }
    };
    this.router.navigate(['menu/evento-detalhe'], navigationExtras);
  }

  getNovosEventos(){
    this.eventoService = new EventosService();
    this.eventosNovos = this.eventoService.getNovosEventos();
  }

}
