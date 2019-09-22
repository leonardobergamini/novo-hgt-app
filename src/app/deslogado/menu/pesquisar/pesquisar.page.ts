import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { Eventos } from 'src/app/shared/models/eventos/eventos';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  _eventosVistos: Eventos[] = [];
  _eventosFiltrados: Eventos[] = [];
  erro: boolean;

  constructor(
    private eventoService: EventosService,
    private statusBar: StatusBar,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#2d3436');
    this.statusBar.styleBlackOpaque();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#2d3436');
    this.statusBar.styleBlackOpaque();
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

    if(this.eventoService. getEventoByQuery(event.target.value).length == 0){
      this.erro = true;
      $('.melhor-resultado-card').addClass('ion-hide');
    }else{
      this._eventosFiltrados = this.eventoService. getEventoByQuery(event.target.value);
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
