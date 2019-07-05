import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';
import { EventosService } from '../../service/eventos/eventos.service';
import { Eventos } from '../../models/eventos/eventos';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {
  
  @Input() categorias: string[];
  eventos: Eventos[];
  eventosService: EventosService;
  erro: string = "";
  
  slidesOpts = {
    slidesPerView: 4,  
  }

  constructor() {
    this.filtrarCategorias('show');
   }
  
  ngOnInit() {    
  }

  ativarItem(event){
    
    $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
    $('.lista-categorias').find('.ativo').toggleClass('ativo');
    
    $(event.target).removeClass('desabilitado');
    $(event.target).addClass('ativo');

    var categoria = $(event.target).text();
    this.filtrarCategorias(categoria);
  }

  filtrarCategorias(categoria:string){
    this.eventosService = new EventosService();
    this.eventos = this.eventosService.getEventoByCategorias(categoria);

    if(this.eventos.length > 0){
      this.erro = '';
      console.log(this.eventos);
    }else{
      this.erro = `Ops! Sem eventos para essa categoria`;
    }
    
    
  }
}
