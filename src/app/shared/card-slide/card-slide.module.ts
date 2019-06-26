import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CardSlideComponent } from './card-slide.component';
import { AppImgComponent } from '../app-img/app-img.component';

@NgModule({
  declarations: [CardSlideComponent, AppImgComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [CardSlideComponent]
})
export class CardSlideModule { }
