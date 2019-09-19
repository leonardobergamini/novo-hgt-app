import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';

import { Eventos } from '../../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {
  eventos: Eventos[];
  categorias: string[] = ["show", "teatro", "palestra", "stand-up", "infantil"];

  constructor(
    private statusBar: StatusBar,
    private eventosService: EventosService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#ecf0f1');
    // this.eventos = this.eventosService.getAllEventos();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#ecf0f1');
    this.statusBar.styleDefault();
  }
}  

