import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {  
  
  public autenticado: boolean = false;

  constructor(){ }

  ngOnInit() {
    this.isAutenticado();
  }

  removeBtnComprar(){
    $('ion-tabs').find('#btnComprar').addClass('ion-hide');
  }

  isAutenticado(){
    if(localStorage.getItem('loginValido') == 'true'){
      // this.trocaLoginParaPerfil();
      this.autenticado = true;
    }else{
      this.autenticado = false;
    }
  }

  trocaLoginParaPerfil(){
    $('#tabLogin').remove();    

    let novaAba = 
    `
    <ion-tab-button id="tabPerfil" tab="perfil" (click)="removeBtnComprar()">
      <ion-label>Perfil</ion-label>
      <ion-icon src="../../assets/menu-icons/perfil.svg"></ion-icon>
    </ion-tab-button>
    `;

    $('ion-tab-bar').append(novaAba);
  }
}
