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

  _eventosFiltrados: Eventos[] = [];
  erro: boolean;


  constructor(private _eventoService:EventosService) { }

  ngOnInit() {
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
    this._eventosFiltrados = [];
    $('.melhor-resultado').removeClass('ion-hide');
    $('.melhor-resultado-card').removeClass('ion-hide');
    this._eventoService = new EventosService();
    // console.log(this._eventosFiltrados = this._eventoService.getEventoByQuery(event.target.value));
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
