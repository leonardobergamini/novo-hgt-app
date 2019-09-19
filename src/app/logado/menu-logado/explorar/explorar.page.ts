import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';

import { Eventos } from '../../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  // private eventos: Eventos[] = [];
  
  // eventosService: EventosService;
  eventos: Eventos[];
  categorias: string[] = ["show", "teatro", "palestra", "stand-up", "infantil"];
  usuarioLogado: any;

  constructor(
    private statusBar: StatusBar,
    private storage: Storage,
    private eventoService: EventosService
    ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#FF6700');
    // this.eventosService = new EventosService();
    
  }

  IonViewDidLeave(){
    this.usuarioLogado = null;
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#FF6700');
    // this.eventos = this.eventoService.getAllEventos();
    // this.storage.get('usuario').then(resp => this.usuarioLogado = resp)
    // console.log(this.usuarioLogado);

    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    this.msgBoasVindas();
  }

  msgBoasVindas() {
    var data = new Date();
    if(data.getHours() < 12 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>bom dia, ${this.usuarioLogado.primeiroNome.toLowerCase()}</h2>`);
    }
    if (data.getHours() >= 12){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa tarde, ${this.usuarioLogado.primeiroNome.toLocaleLowerCase()}</h2>`);
    }
    if(data.getHours() >= 18 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa noite, ${this.usuarioLogado.primeiroNome.toLocaleLowerCase()}</h2>`);
    }
  }

}  

