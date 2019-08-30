import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

import { EditarPerfilPage } from './editar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [EditarPerfilPage]
})
export class EditarPerfilPageModule {}
