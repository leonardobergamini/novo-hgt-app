import { Component, OnInit, ViewChild } from '@angular/core';
import { getInjectableDef } from '@angular/core/src/di/defs';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @ViewChild('menu') menu: IonTabs
  constructor() { }

  ngOnInit() {
    
  }
}
