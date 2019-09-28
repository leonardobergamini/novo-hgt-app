import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusAnunciosPage } from './meus-anuncios.page';

const routes: Routes = [
  {
    path: '',
    component: MeusAnunciosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusAnunciosPage]
})
export class MeusAnunciosPageModule {}
