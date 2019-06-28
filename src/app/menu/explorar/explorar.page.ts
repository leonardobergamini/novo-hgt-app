import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  slidesOpts = {
    slidesPerView: 4
  }

  constructor() { }

  ngOnInit() {  
    $('.lista-categorias').find('#shows').addClass('ativo');

    $('.lista-categorias').click(function(event){
      $('.lista-categorias').find('.desabilitado').toggleClass('desabilitado');
      $('.lista-categorias').find('.ativo').toggleClass('ativo');

      $(event.target).removeClass('desabilitado');
      $(event.target).addClass('ativo');
    });

  }

}
