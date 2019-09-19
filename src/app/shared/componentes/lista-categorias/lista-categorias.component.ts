import { Component, Input } from '@angular/core';

import * as $ from 'jquery';
import { Eventos } from '../../models/eventos/eventos';
import { EventosService } from '../../services/eventos/eventos.service';
import { ModalController } from '@ionic/angular';
import { EventoDetalhePage } from '../../../shared/telas/eventos/evento-detalhe/evento-detalhe.page';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent  {
  
  @Input() categorias: string[];
  eventos: Eventos[];
  erro: string = "";
  
  slidesOpts = {
    slidesPerView: 4, 
  }

  constructor(
    private modalController: ModalController,
    private eventoService: EventosService
    ) {
    // this.filtrarCategorias('show');
   }

  ativarItem(event){
    this.erro = '';
    this.eventos = [];
    $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
    $('.lista-categorias').find('.ativo').toggleClass('ativo');
    
    $(event.target).removeClass('desabilitado');
    $(event.target).addClass('ativo');

    var categoria = $(event.target).text();
    // $('.lds-ripple').removeClass('ion-hide');
    // setTimeout(() =>{
    //   this.filtrarCategorias(categoria);
    //   $('.lds-ripple').addClass('ion-hide');
    // }, 500);
  }

  // filtrarCategorias(categoria:string){
  //   this.eventos = this.eventoService.getEventoByCategorias(categoria);

  //   if(this.eventos.length > 0){
  //     this.erro = '';
  //     console.log(this.eventos);
  //     $('.lista').show();
  //   }else{
  //     $('.lista').hide();
  //     this.erro = `Ops! Sem eventos para essa categoria`;
  //   } 
  // }

  async exibirDetalhes(evento){
    const modal = await this.modalController.create({
      component: EventoDetalhePage,
      componentProps: {
        'eventoSelecionado': evento
      }
    });
    return await modal.present();
  }
}
