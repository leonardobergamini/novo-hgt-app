import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EfetuarCompraPage } from './efetuar-compra.page';

const routes: Routes = [
  {
    path: '',
    component: EfetuarCompraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EfetuarCompraPage]
})
export class EfetuarCompraPageModule {}
