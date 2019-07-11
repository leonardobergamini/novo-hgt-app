import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  addBtnComprar(){
    $('ion-tabs').find('ion-button').addClass('ion-hide');
  }
}
