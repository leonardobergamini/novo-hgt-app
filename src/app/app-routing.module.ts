import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu/menu.page';
import { MenuPageModule } from './menu/menu.module';
import { MenuLogadoPageModule } from './menu-logado/menu-logado.module';


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
            loadChildren: './menu/explorar/explorar.module#ExplorarPageModule'
          }
        ]
      },
      {
        path: 'pesquisar',
        children: [
          {
            path: '',
            loadChildren: './menu/pesquisar/pesquisar.module#PesquisarPageModule'
          }
        ]
      },
      {
        path: 'login', 
        children: [
          {
            path: '',
            loadChildren: './menu/login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'evento-detalhe', 
        children: [
          {
            path: '',
            loadChildren: './eventos/evento-detalhe/evento-detalhe.module#EventoDetalhePageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu/explorar',
  }
];

@NgModule({
  imports: [
    MenuPageModule,
    MenuLogadoPageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
