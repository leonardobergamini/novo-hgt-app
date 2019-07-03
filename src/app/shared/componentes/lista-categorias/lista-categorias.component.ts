import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';
import { EventosService } from '../../service/eventos/eventos.service';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {
  
  @Input() categorias: string[];
  
  eventoService: EventosService;
  slidesOpts = {
    slidesPerView: 4,  
  }
  constructor() { }
  
  ngOnInit() {    
    this.filtrarCategorias('internacional');
    $('.lista-categorias').click(function(event){
      
      // console.log(event.target);
      $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
      $('.lista-categorias').find('.ativo').toggleClass('ativo');
      
      $(event.target).removeClass('desabilitado');
      $(event.target).addClass('ativo');
      
    });
  }

  filtrarCategorias(categoria: string){
    this.eventoService = new EventosService();
    this.eventoService.getEventoByCategorias(categoria);

  }
}
