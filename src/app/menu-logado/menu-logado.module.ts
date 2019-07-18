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
  exports: [MenuLogadoPage],
  declarations: [MenuLogadoPage]
})
export class MenuLogadoPageModule {}
