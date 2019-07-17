import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  TOKEN: string = '';
  ATIVO: boolean = false;
  
  constructor(private activeRoute: ActivatedRoute, private router: Router){

    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.TOKEN = this.router.getCurrentNavigation().extras.state.token;      
        this.ATIVO = this.router.getCurrentNavigation().extras.state.ativo;      
        console.log(this.ATIVO);
        console.log(this.TOKEN);
      }
    });  

  }

  ngOnInit() {}

  removeBtnComprar(){
    $('ion-tabs').find('#btnComprar').addClass('ion-hide');
  }
}
