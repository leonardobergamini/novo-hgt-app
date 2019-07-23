import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CardSlideModule } from '../card-slide/card-slide.module';
import { ListaCategoriasComponent } from './lista-categorias.component';


@NgModule({
  declarations: [ListaCategoriasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CardSlideModule
  ],
  exports: [ListaCategoriasComponent]
})
export class ListaCategoriasModule { }
