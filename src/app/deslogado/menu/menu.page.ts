import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(){ }

  ngOnInit() { }
  
  private removeBtnComprar(){
    $('ion-tabs').find('#btnComprar').addClass('ion-hide');
  }
}
