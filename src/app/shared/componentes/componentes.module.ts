import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisorComponent } from './divisor/divisor.component';
import { CardSlideModule } from './card-slide/card-slide.module';
import { ListaCategoriasModule } from './lista-categorias/lista-categorias.module';

@NgModule({
  declarations: [DivisorComponent],
  imports: [
    CommonModule,
    CardSlideModule,
    ListaCategoriasModule
  ],
  exports: [CardSlideModule, DivisorComponent, ListaCategoriasModule]
})
export class ComponentesModule { }
