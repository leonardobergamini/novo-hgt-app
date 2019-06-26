import { Component } from '@angular/core';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent {

  slidesOpts = {
    spaceBetween: 10,
    slidesPerView: 1,
    autoplay: true
  };

  constructor() { }

}
