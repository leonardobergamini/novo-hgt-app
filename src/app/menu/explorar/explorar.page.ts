import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { ExplorarService } from './explorar.service';
import { Eventos } from 'src/app/shared/models/eventos/eventos';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  explorarService: ExplorarService;
  eventos: Eventos[];
  categorias: string[] = ["show", "teatro", "palestra", "stand-up", "cristão"];

  constructor() { }

  ngOnInit() {
    this.msgBoasVindas();
    this.explorarService = new ExplorarService();
    this.eventos = this.explorarService.getAllEventos();
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
    }else{
      $('.bem-vindo').find('h1').remove();
      $('.bem-vindo').append(`<h1 class="ion-text-left">boa noite, Leonardo</h1>`);
    }
  }
}  

