import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu/menu.page';
import { MenuPageModule } from './menu/menu.module';
import { MenuLogadoPage } from './menu-logado/menu-logado.page';
import { MenuLogadoPageModule } from './menu-logado/menu-logado.module';

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: usuarioLogado ? 'menu-logado/explorar' : 'menu/explorar'
  },
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'explorar',
        children: [
          {
            path: '',
            loadChildren: './menu/explorar/explorar.module#ExplorarPageModule',
          }
        ]
      },
      {
        path: 'pesquisar',
        children: [
          {
            path: '',
            loadChildren: './menu/pesquisar/pesquisar.module#PesquisarPageModule',
          }
        ]
      },
      {
        path: 'login', 
        children: [
          {
            path: '',
            loadChildren: './menu/login/login.module#LoginPageModule',
          }
        ]
      },
      {
        path: 'evento-detalhe/:id',
        children: [
          {
            path: '',
            loadChildren: './eventos/evento-detalhe/evento-detalhe.module#EventoDetalhePageModule'
          }
        ]
      }
      // {
      //   path: 'evento-detalhe', 
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: './eventos/evento-detalhe/evento-detalhe.module#EventoDetalhePageModule',
      //     }
      //   ]
      // }
    ],
  },
  { 
    path: 'menu-logado', 
    component: MenuLogadoPage,
    children: [
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: './menu-logado/perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: 'explorar',
        children: [
          {
            path: '',
            loadChildren: './menu-logado/explorar/explorar.module#ExplorarPageModule',

          }
        ]
      }
    ]
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
