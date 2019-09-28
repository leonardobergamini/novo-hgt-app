import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventoDetalhePage } from './shared/telas/eventos/evento-detalhe/evento-detalhe.page';
import { EventoDetalhePageModule } from './shared/telas/eventos/evento-detalhe/evento-detalhe.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DetalhePedidoPageModule } from './logado/menu-logado/meus-ingressos/detalhe-pedido/detalhe-pedido.module';
import { QRCodeModule } from 'angularx-qrcode';
import { PresentearPageModule } from './logado/menu-logado/meus-ingressos/detalhe-pedido/presentear/presentear.module';
import { AnunciosPageModule } from './shared/telas/eventos/evento-detalhe/anuncios/anuncios.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [EventoDetalhePage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      swipeBackEnabled: false,
      hardwareBackButton: false
    }), 
    AppRoutingModule,
    ReactiveFormsModule,
    EventoDetalhePageModule,
    DetalhePedidoPageModule,
    PresentearPageModule,
    AnunciosPageModule,
    IonicStorageModule.forRoot({
      name: '___hgtdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }),
    QRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
    DatePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
