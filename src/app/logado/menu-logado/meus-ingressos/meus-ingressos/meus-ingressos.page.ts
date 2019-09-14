import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { Tickets } from 'src/app/shared/models/tickets/tickets';
import * as $ from 'jquery';

@Component({
  selector: 'app-meus-ingressos',
  templateUrl: './meus-ingressos.page.html',
  styleUrls: ['./meus-ingressos.page.scss'],
})
export class MeusIngressosPage implements OnInit {

  private tickets: Tickets[] = [];

  constructor(
    private statusBar: StatusBar,
    private ticketService: TicketsService,
    private navCtrl: NavController
  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.tickets = this.ticketService.tickets;
    this.tirarStyleIcone()
  }

  tirarStyleIcone(){
    $('ion-icon').find('style').remove();
  }

}
