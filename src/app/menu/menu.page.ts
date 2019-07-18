import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {  
  constructor(){ }

  ngOnInit() {}

  removeBtnComprar(){
    $('ion-tabs').find('#btnComprar').addClass('ion-hide');
  }
}
