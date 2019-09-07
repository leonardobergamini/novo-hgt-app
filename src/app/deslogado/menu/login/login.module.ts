import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
