import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  novaConta(){
    // $('.box-login').addClass('animated bounceInRight');
    $('.box-login').addClass('ion-hide');
    $('.box-cadastrar').removeClass('ion-hide');
    $('.box-cadastrar').addClass('animated bounceInRight');
  }

}
