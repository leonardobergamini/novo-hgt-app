import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  verificarInput(event){
    console.log(event.target.value);
    if(event.target.value == "")
    {
      $('.melhor-resultado').addClass('ion-hide');
      $('.descricao-busca').show() 
    }else{
      $('.descricao-busca').hide();
      setTimeout(() => {
        $('.descricao-busca').hide();
        $('.melhor-resultado').removeClass('ion-hide');
        $('#busca').text(event.target.value);
      }, 1000);
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
