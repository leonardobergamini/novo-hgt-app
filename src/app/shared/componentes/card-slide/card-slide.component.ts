import { Component, Input } from '@angular/core';
import { Eventos } from '../../models/eventos/eventos';
import { NavController } from '@ionic/angular';
import { EventoDetalhePage } from 'src/app/eventos/evento-detalhe/evento-detalhe.page';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent {

  @Input() eventos: Eventos[];

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
        // spaceBetween: 10
      },
      // <= 480px
      480: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
        // spaceBetween: 10
      },
      // <= 640px
      640: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
        // spaceBetween: 10
      },
      // <= 768px
      768: {
        slidesPerView: 1,
        speed:500,
        autoplay: {
          delay: 5000
        }
        // spaceBetween: 0,
      }
    }
  };

  constructor(private router: Router) { }

  exibirDetalhes(evento){
    let navigationExtras: NavigationExtras = {
      state: {
        evento: evento
      }
    };
    this.router.navigate(['menu/evento-detalhe'], navigationExtras);
  }
}
