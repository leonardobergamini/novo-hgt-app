import { Component, Input, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';
import { ModalController, NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit  {
  
  @Input() categorias: string[];
  eventos: Eventos[];
  erro: string = "";
  
  slidesOpts = {
    slidesPerView: 4, 
  }
  
  constructor(
    private eventoService: EventosService,
    private keyboard: Keyboard,
    private navCtrl: NavController
    ) { }
    
  ngOnInit(){
    // this.filtrarCategorias('música');
  }

  ativarItem(event){
    // debugger;
    this.erro = '';
    this.eventos = [];
    let idElemento = "#"+$(event.target).attr('id');
    $('.lista-categorias ion-slide').removeClass('ativo');
    $('.lista-categorias ion-slide').addClass('desabilitado');
    $(idElemento).removeClass('desabilitado');
    $(idElemento).addClass('ativo');
    
    var categoria = $(event.target).text();
    $('.lds-ripple').removeClass('ion-hide');
    setTimeout(() =>{
      this.filtrarCategorias(categoria);
      $('.lds-ripple').addClass('ion-hide');
    }, 500);
    
  }

  filtrarCategorias(categoria:string){
    this.eventos = this.eventoService.getEventoByCategorias(categoria);
    if(this.eventos.length > 0){
      this.erro = '';
      $('.lista').show();
    }else{
      $('.lista').hide();
      this.erro = `Ops! Sem eventos para essa categoria`;
    } 
  }

  async exibirDetalhes(evento){
    this.keyboard.hide();
    localStorage.setItem('detalhe-evento', JSON.stringify(evento));
    if(!Boolean(localStorage.getItem('isUsuarioLogado'))){
      this.navCtrl.navigateForward(`menu/explorar/detalhe-evento/${evento.id}`);
    }else{
      this.navCtrl.navigateForward(`menu-logado/explorar/detalhe-evento/${evento.id}`);
    }
    // const modal = await this.modalController.create({
    //   component: EventoDetalhePage,
    //   componentProps: {
    //     'eventoSelecionado': evento
    //   }
    // });
    // return await modal.present();
  }
}
