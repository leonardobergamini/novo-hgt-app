import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuLogadoPage } from './menu-logado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [MenuLogadoPage],
  exports: [MenuLogadoPage]
})
export class MenuLogadoPageModule {}
