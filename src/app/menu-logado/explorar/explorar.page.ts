import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { Eventos } from '../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, OnDestroy {

  eventosService: EventosService;
  eventos: Eventos[];
  categorias: string[] = ["show", "teatro", "palestra", "stand-up", "infantil"];
  usuarioLogado: any;

  constructor() { }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    this.msgBoasVindas();
    this.eventosService = new EventosService();
    this.eventos = this.eventosService.getAllEventos();
  }

  msgBoasVindas() {
    var data = new Date();
    if(data.getHours() < 12 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>bom dia, ${this.usuarioLogado.primeiro_nome}</h2>`);
    }
    if (data.getHours() >= 12){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa tarde, ${this.usuarioLogado.primeiro_nome}</h2>`);
    }
    if(data.getHours() >= 18 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa noite, ${this.usuarioLogado.primeiro_nome}</h2>`);
    }
  }

  ngOnDestroy(): void {
    this.usuarioLogado = null;

  }

}  

