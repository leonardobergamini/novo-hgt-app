import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ChildActivationEnd } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'explorar',
        children: [
          {
            path: '',
            loadChildren: './explorar/explorar.module#ExplorarPageModule'
          }
        ]
      },
      {
        path: 'pesquisar',
        children: [
          {
            path: '',
            loadChildren: './pesquisar/pesquisar.module#PesquisarPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: './explorar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: './menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuPageRoutingModule { }
