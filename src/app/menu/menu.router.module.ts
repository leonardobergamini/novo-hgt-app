import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu.page';
import { MenuPageModule } from './menu.module';

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
        redirectTo: '123',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/explorar',
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
