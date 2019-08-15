import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu-logado',
  templateUrl: './menu-logado.page.html',
  styleUrls: ['./menu-logado.page.scss'],
})
export class MenuLogadoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private removeBtnComprar(){
    $('ion-tabs').find('#btnComprar').addClass('ion-hide');
  }

}
