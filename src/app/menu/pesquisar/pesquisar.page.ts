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

  constructor(private _eventoService:EventosService) { }

  ngOnInit() {
  }

  verificarInput(event){
    let _eventosFiltrados;
    if(event.target.value == "")
    {
      $('.melhor-resultado').addClass('ion-hide');
      $('.descricao-busca').show() 
    }else{
      this._eventoService = new EventosService();
      _eventosFiltrados = this._eventoService.getEventoByArtista(event.target.value);
      $('.descricao-busca').hide();
      $('.melhor-resultado').removeClass('ion-hide');
      $('#busca').text(event.target.value);
      
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

  // verificarClear(){
  //   $('.descricao-busca').show();
  // }

}
