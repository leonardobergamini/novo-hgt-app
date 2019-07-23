import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisorComponent } from './divisor/divisor.component';
import { CardSlideModule } from './card-slide/card-slide.module';
import { ListaCategoriasModule } from './lista-categorias/lista-categorias.module';
import { HgtAlertComponent } from './hgt-alert/hgt-alert.component';

@NgModule({
  declarations: [DivisorComponent, HgtAlertComponent],
  imports: [
    CommonModule,
    CardSlideModule,
    ListaCategoriasModule
  ],
  exports: [CardSlideModule, 
            DivisorComponent, 
            ListaCategoriasModule, 
            HgtAlertComponent]
})
export class ComponentesModule { }
