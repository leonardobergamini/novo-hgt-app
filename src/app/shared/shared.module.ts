import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CardSlideModule } from './componentes/card-slide/card-slide.module';
import { ListaCategoriasComponent } from './componentes/lista-categorias/lista-categorias.component';
import { DivisorComponent } from './componentes/divisor/divisor.component';

@NgModule({
  declarations: [ListaCategoriasComponent, DivisorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CardSlideModule
  ],
  exports: [CardSlideModule, ListaCategoriasComponent, DivisorComponent]
})
export class SharedModule { }
