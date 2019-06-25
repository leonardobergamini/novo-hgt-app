import { Component } from '@angular/core';

@Component({
  selector: 'card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.scss'],

})
export class CardSlideComponent {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

}
