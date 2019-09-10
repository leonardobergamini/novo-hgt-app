import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'contador-hgt',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss'],
})
export class ContadorComponent implements OnInit {

  public contador: number = 0;
  @Input() max: number = 5;
  @Input() min: number = 0;
  //@Output() clickAdicionar = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  adicionar(){
    if(this.contador === Number(this.max)){
      //this.clickAdicionar.emit(this.contador.toString());
      return this.contador;
    }else{
      //this.clickAdicionar.emit(this.contador.toString());
      return this.contador++;
    }
  }

  subtrair(){
    if(this.contador === Number(this.min)){
      return this.contador;
    }else{
      return this.contador--;
    }
  }

}
