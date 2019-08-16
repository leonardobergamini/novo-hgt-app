import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { Eventos } from '../../../shared/models/eventos/eventos';
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
  
    this.eventosService = new EventosService();
    this.eventos = this.eventosService.getAllEventos();
  }

}  

