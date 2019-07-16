import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisorComponent } from './divisor/divisor.component';
import { CardSlideModule } from './card-slide/card-slide.module';
import { ListaCategoriasModule } from './lista-categorias/lista-categorias.module';
import { HgtFormModule } from './hgt-form/hgt-form.module';

@NgModule({
  declarations: [DivisorComponent],
  imports: [
    CommonModule,
    CardSlideModule,
    ListaCategoriasModule,
    HgtFormModule
  ],
  exports: [CardSlideModule, DivisorComponent, HgtFormModule, ListaCategoriasModule]
})
export class ComponentesModule { }
