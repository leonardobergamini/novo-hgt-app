import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent {

  @Input() eventos: Eventos[];
  @Input() novidades: boolean;
  eventosNovos: Eventos[] = [];

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

  constructor(private router: Router, private eventoService: EventosService) { 
    this.getNovosEventos()
  }

  exibirDetalhes(evento){
    let navigationExtras: NavigationExtras = {
      state: {
        evento: evento
      }
    };
    this.router.navigate(['menu/evento-detalhe'], navigationExtras);
  }

  getNovosEventos(){
    this.eventoService = new EventosService();
    this.eventosNovos = this.eventoService.getNovosEventos();
  }

}
