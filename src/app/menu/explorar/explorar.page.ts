import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { Eventos } from '../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  eventosService: EventosService;
  eventos: Eventos[];
  categorias: string[] = ["show", "teatro", "palestra", "stand-up", "infantil"];

  constructor() { }

  ngOnInit() {
    
    this.msgBoasVindas();
    this.eventosService = new EventosService();
    this.eventos = this.eventosService.getAllEventos();
  }

  msgBoasVindas() {
    var data = new Date();
    if(data.getHours() >= 0 || data.getHours() < 12){
      $('.bem-vindo').find('h1').remove();
      $('.bem-vindo').append(`<h1 class="ion-text-left">bom dia, Leonardo</h1>`);
    }
    if (data.getHours() >= 12 || data.getHours() < 18){
      $('.bem-vindo').find('h1').remove();
      $('.bem-vindo').append(`<h1 class="ion-text-left">boa tarde, Leonardo</h1>`);
    }
    if(data.getHours() >= 18 ){
      $('.bem-vindo').find('h1').remove();
      $('.bem-vindo').append(`<h1 class="ion-text-left">boa noite, Leonardo</h1>`);
    }
  }
}  

