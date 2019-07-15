import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisorComponent } from './divisor/divisor.component';
import { HgtInputComponent } from './hgt-input/hgt-input.component';
import { CardSlideModule } from './card-slide/card-slide.module';
import { ListaCategoriasModule } from './lista-categorias/lista-categorias.module';

@NgModule({
  declarations: [DivisorComponent, HgtInputComponent],
  imports: [
    CommonModule,
    CardSlideModule,
    ListaCategoriasModule
  ],
  exports: [CardSlideModule, DivisorComponent, HgtInputComponent, ListaCategoriasModule]
})
export class ComponentesModule { }
