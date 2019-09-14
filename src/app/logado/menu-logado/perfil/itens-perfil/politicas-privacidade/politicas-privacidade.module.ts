import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PoliticasPrivacidadePage } from './politicas-privacidade.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasPrivacidadePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoliticasPrivacidadePage]
})
export class PoliticasPrivacidadePageModule {}
