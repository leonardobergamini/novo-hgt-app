import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-termos-uso',
  templateUrl: './termos-uso.page.html',
  styleUrls: ['./termos-uso.page.scss'],
})
export class TermosUsoPage implements OnInit {

  constructor(
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }
  

}
