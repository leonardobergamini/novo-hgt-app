import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CardSlideComponent } from './card-slide.component';

@NgModule({
  declarations: [CardSlideComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [CardSlideComponent]
})
export class CardSlideModule { }
