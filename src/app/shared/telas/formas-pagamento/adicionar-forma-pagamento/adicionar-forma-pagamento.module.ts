import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdicionarFormaPagamentoPage } from './adicionar-forma-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarFormaPagamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarFormaPagamentoPage]
})
export class AdicionarFormaPagamentoPageModule {}
