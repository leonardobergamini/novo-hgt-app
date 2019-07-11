import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eventos } from 'src/app/shared/models/eventos/eventos';
import * as $ from 'jquery';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  evento: Eventos;
  ativarBtn: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router){
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.evento = this.router.getCurrentNavigation().extras.state.evento;      

        this.router.getCurrentNavigation().extras.state.ativarBtn ? this.adicionaBotaoComprar() : this.ativarBtn = false;
      }
      this.reset();
    });  
  }

  ngOnInit() {
    $('#favorito').click(() => {
      $('#favorito').toggleClass('favoritoClicado');
    });
  }

  reset(){
    $('#favorito').removeClass('favoritoClicado');
  }

  adicionaBotaoComprar(){
    $('ion-tabs').find('ion-button').removeClass('ion-hide');
    
  }
}
