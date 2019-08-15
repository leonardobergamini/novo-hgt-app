import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu/menu.page';
import { MenuPageModule } from './menu/menu.module';
import { MenuLogadoPage } from './logado/menu-logado/menu-logado.page';
import { MenuLogadoPageModule } from './logado/menu-logado/menu-logado.module';

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
            loadChildren: './logado/menu-logado/perfil/perfil.module#PerfilPageModule'
          },
          { 
            path: 'meus-favoritos', 
            loadChildren: './logado/menu-logado/perfil/itens-perfil/meus-favoritos/meus-favoritos.module#MeusFavoritosPageModule' 
          }
        ]
      },
      {
        path: 'explorar',
        children: [
          {
            path: '',
            loadChildren: './logado/menu-logado/explorar/explorar.module#ExplorarPageModule',

          }
        ]
      }
    ]
  },
  // { path: 'editar-perfil', loadChildren: './logado/menu-logado/perfil/itens-perfil/editar-perfil/editar-perfil.module#EditarPerfilPageModule' },
  // { path: 'meus-favoritos', loadChildren: './logado/menu-logado/perfil/itens-perfil/meus-favoritos/meus-favoritos.module#MeusFavoritosPageModule' }

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
