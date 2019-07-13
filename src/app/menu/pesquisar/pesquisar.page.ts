import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { Eventos } from 'src/app/shared/models/eventos/eventos';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  _eventosVistos: Eventos[] = [];
  _eventosFiltrados: Eventos[] = [];
  erro: boolean;

  constructor(private _eventoService:EventosService) { }

  ngOnInit() {
  }

  eventoClicadoEmit(event){
    // console.log(event);
  }

  verificarInput(event){
    
    if(event.target.value == "")
    {
      $('.melhor-resultado').addClass('ion-hide');
      $('.melhor-resultado-card').addClass('ion-hide');
      $('.descricao-busca').show() 
    }else{
      $('.descricao-busca').hide();
      this.melhorResultado(event);
      $('#busca').text(event.target.value);
    } 
  }

  melhorResultado(event){

    $('.melhor-resultado').removeClass('ion-hide');
    $('.melhor-resultado-card').removeClass('ion-hide');
    this._eventoService = new EventosService();

    if(this._eventoService.getEventoByQuery(event.target.value).length == 0){
      this.erro = true;
      $('.melhor-resultado-card').addClass('ion-hide');
    }else{
      this._eventosFiltrados = this._eventoService.getEventoByQuery(event.target.value);
      this.erro = false;
    }
  }
  
  verificarBlur(event){
    if(event.target.value == "")
    {
      $('.melhor-resultado').addClass('ion-hide');
      $('.descricao-busca').show() 
    }else{
      
      $('.descricao-busca').hide();
    } 
  }
}
