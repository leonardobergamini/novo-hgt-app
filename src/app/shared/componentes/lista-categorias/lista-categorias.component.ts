import { Component, Input } from '@angular/core';

import * as $ from 'jquery';
import { Router, NavigationExtras } from '@angular/router';
import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent  {
  
  @Input() categorias: string[];
  eventos: Eventos[];
  eventosService: EventosService;
  erro: string = "";
  
  slidesOpts = {
    slidesPerView: 4, 
  }

  constructor(private router: Router) {
    this.filtrarCategorias('show');
   }

  ativarItem(event){
    this.erro = '';
    this.eventos = [];
    $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
    $('.lista-categorias').find('.ativo').toggleClass('ativo');
    
    $(event.target).removeClass('desabilitado');
    $(event.target).addClass('ativo');

    var categoria = $(event.target).text();
    $('.lds-ripple').removeClass('ion-hide');
    setTimeout(() =>{
      this.filtrarCategorias(categoria);
      $('.lds-ripple').addClass('ion-hide');
    }, 500);
  }

  filtrarCategorias(categoria:string){
    this.eventosService = new EventosService();
    this.eventos = this.eventosService.getEventoByCategorias(categoria);

    if(this.eventos.length > 0){
      this.erro = '';
      // console.log(this.eventos);
      $('.lista').show();
    }else{
      $('.lista').hide();
      this.erro = `Ops! Sem eventos para essa categoria`;
    } 
  }

  exibirDetalhes(evento){
    let navigationExtras: NavigationExtras = {
      state: {
        evento: evento
      }
    };
    this.router.navigate(['menu/evento-detalhe'], navigationExtras);
  }
}
