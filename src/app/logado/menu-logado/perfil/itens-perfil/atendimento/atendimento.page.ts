import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }  

}
