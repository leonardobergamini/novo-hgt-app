import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusIngressosPage } from './meus-ingressos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusIngressosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusIngressosPage]
})
export class MeusIngressosPageModule {}
