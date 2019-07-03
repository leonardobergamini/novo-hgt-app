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
  erro: string;
  
  slidesOpts = {
    slidesPerView: 4,  
  }

  constructor() { }
  
  ngOnInit() {    
    var categoriaSelecionada;
    $('.lista-categorias').click(function(event){
      this.ativarItem(event.target);
      categoriaSelecionada = $(event.target).text();
      

      //this.filtrarCategorias(categoriaSelecionada);
    });
  }

  ativarItem(item){
    $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
    $('.lista-categorias').find('.ativo').toggleClass('ativo');
    
    $(item).removeClass('desabilitado');
    $(item).addClass('ativo');
  }
  filtrarCategorias(categoria: string){
    // this.eventosService = new EventosService();

    // this.eventosService.getEventoByCategorias(categoria)
    //                   .then((result) => console.log(result))
    //                   .catch((err) => {
    //                     console.log(err);
    //                     this.erro = 'Ops! Nenhum evento encontrado.';
    //                   });

    console.log(categoria)
  
  }
}
