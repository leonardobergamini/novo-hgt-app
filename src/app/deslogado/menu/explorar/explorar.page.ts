import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';

import { Eventos } from '../../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ListaCategoriasComponent } from 'src/app/shared/componentes/lista-categorias/lista-categorias.component';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {
  
  @ViewChild(ListaCategoriasComponent) listaCategoriasPage: ListaCategoriasComponent;
  eventos: Eventos[];
  categorias: string[] = ["show", "rock", "teatro", "palestra", "stand-up", "infantil"];

  constructor(
    private statusBar: StatusBar,
    private eventoService: EventosService,
    private navCtrl: NavController,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#ecf0f1');
    this.eventoService.getAllEventos()
    .then(resp => {
      this.storage.remove('eventos')
      .then(() => {
        this.listaCategoriasPage.filtrarCategorias('show');
        this.storage.set('eventos', resp);
      })
    });
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#ecf0f1');
    this.statusBar.styleDefault();
  }
}  

