import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {

  @Input() categorias: string[];

  slidesOpts = {
    slidesPerView: 4,  
  }
  constructor() { }

  ngOnInit() {
    // this.criarListaCategorias();

    console.log($('.lista-categorias>swiper-wrapper>ion-slide'));

    $('.lista-categorias').click(function(event){

      // console.log(event.target);
      $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
      $('.lista-categorias').find('.ativo').toggleClass('ativo');

      $(event.target).removeClass('desabilitado');
      $(event.target).addClass('ativo');

    });
  }

  criarListaCategorias(){
    $.each(this.categorias, function(index, categoria){
      $('.lista-categorias').append(
        `<ion-slide class="desabilitado" id="${categoria}">${categoria}</ion-slide>`
      );
    });
  }

}
