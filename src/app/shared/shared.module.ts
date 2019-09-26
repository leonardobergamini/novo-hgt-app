import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CardSlideModule } from './componentes/card-slide/card-slide.module';
import { ComponentesModule } from './componentes/componentes.module';
import { HideHeaderDirective } from './diretivas/hide-header/hide-header.directive';

@NgModule({
  declarations: [HideHeaderDirective],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CardSlideModule,
    ComponentesModule
  ],
  exports: [ComponentesModule, HideHeaderDirective]
})
export class SharedModule { }
