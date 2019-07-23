import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuLogadoPage } from './menu-logado.page';

const routes: Routes = [
  {
    path: '',
    component: MenuLogadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuLogadoPage],
  exports: [MenuLogadoPage]
})
export class MenuLogadoPageModule {}
