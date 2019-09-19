import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './deslogado/menu/menu.page';
import { MenuPageModule } from './deslogado/menu/menu.module';
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
            loadChildren: './deslogado/menu/explorar/explorar.module#ExplorarPageModule',
          }
        ]
      },
      {
        path: 'pesquisar',
        children: [
          {
            path: '',
            loadChildren: './deslogado/menu/pesquisar/pesquisar.module#PesquisarPageModule',
          }
        ]
      },
      {
        path: 'login', 
        children: [
          {
            path: '',
            loadChildren: './deslogado/menu/login/login.module#LoginPageModule',
          },
          // { 
          //   path: 'cadastrar', 
          //   loadChildren: './deslogado/menu/login/cadastrar/cadastrar.module#CadastrarPageModule' 
          // }
        ]
      }
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
          },
          { 
            path: 'editar-perfil', 
            loadChildren: './logado/menu-logado/perfil/itens-perfil/editar-perfil/editar-perfil.module#EditarPerfilPageModule' 
          },
          { 
            path: 'formas-pagamento', 
            children: [
              {
                path: '',
                loadChildren: './shared/telas/formas-pagamento/formas-pagamento.module#FormasPagamentoPageModule' 
              },
              {
                path: 'cartao-credito', 
                loadChildren: './shared/telas/formas-pagamento/cartao-credito/cartao-credito.module#CartaoCreditoPageModule'                 
              }
            ]
          },
          { 
            path: 'atendimento', 
            loadChildren: './logado/menu-logado/perfil/itens-perfil/atendimento/atendimento.module#AtendimentoPageModule' 
          },
          {
            path: 'termos-uso', 
            loadChildren: './logado/menu-logado/perfil/itens-perfil/termos-uso/termos-uso.module#TermosUsoPageModule' 
          },
          { 
            path: 'politicas-privacidade', 
            loadChildren: './logado/menu-logado/perfil/itens-perfil/politicas-privacidade/politicas-privacidade.module#PoliticasPrivacidadePageModule' 
          },
        ]
      },
      {
        path: 'explorar',
        children: [
          {
            path: '',
            loadChildren: './logado/menu-logado/explorar/explorar.module#ExplorarPageModule',

          },
          {
            path: 'detalhe-evento/:idEvento',
            loadChildren: './shared/telas/eventos/evento-detalhe/evento-detalhe.module#EventoDetalhePageModule'                 

          }
        ]
      },
      {
        path: 'pesquisar',
        children: [
          {
            path: '',
            loadChildren: './logado/menu-logado/pesquisar/pesquisar.module#PesquisarPageModule',
          }
        ]
      },
      { 
        path: 'efetuar-compra', 
        loadChildren: './logado/efetuar-compra/efetuar-compra.module#EfetuarCompraPageModule' 
      },
      { 
        path: 'meus-ingressos', 
        children: [
          {
            path: '',
            loadChildren: './logado/menu-logado/meus-ingressos/meus-ingressos/meus-ingressos.module#MeusIngressosPageModule' 
          },
          { 
            path: 'detalhe-pedido', 
            children: [
              {
                path: ':idPedido',
                loadChildren: './logado/menu-logado/meus-ingressos/detalhe-pedido/detalhe-pedido.module#DetalhePedidoPageModule' 
              },
              {
                path: 'presentear', 
                loadChildren: './logado/menu-logado/meus-ingressos/detalhe-pedido/presentear/presentear.module#PresentearPageModule'
              },
              { 
                path: 'revender/:idPedido', 
                loadChildren: './logado/menu-logado/meus-ingressos/detalhe-pedido/revender/revender.module#RevenderPageModule' 
              },
            ]
          },
        ]
      },

    ]
  },

  // { path: 'editar-perfil', loadChildren: './logado/menu-logado/perfil/itens-perfil/editar-perfil/editar-perfil.module#EditarPerfilPageModule' },

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
