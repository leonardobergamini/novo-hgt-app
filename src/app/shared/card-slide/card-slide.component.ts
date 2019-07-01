import { Component, Input } from '@angular/core';
import { Eventos } from '../models/eventos/eventos';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent {

  @Input() eventos: Eventos[];

  slidesOpts = {
    slidesPerView: 1.4,
    spaceBetween: 10,
    breakpoints: {
      // <= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // <= 480px
      480: {
        slidesPerView: 1.4,
        spaceBetween: 10
      },
      // <= 640px
      640: {
        slidesPerView: 1.4,
        spaceBetween: 10
      },
      // <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
      }
    }
  };

  constructor() { }

}
