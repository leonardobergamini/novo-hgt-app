import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CardSlideModule } from './card-slide/card-slide.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CardSlideModule
  ],
  exports: [CardSlideModule]
})
export class SharedModule { }
