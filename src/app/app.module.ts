import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventoDetalhePage } from './shared/telas/eventos/evento-detalhe/evento-detalhe.page';
import { EventoDetalhePageModule } from './shared/telas/eventos/evento-detalhe/evento-detalhe.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [EventoDetalhePage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    EventoDetalhePageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
