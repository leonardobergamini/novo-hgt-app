import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contador-hgt',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss'],
})
export class ContadorComponent implements OnInit {

  public contador: number = 0;
  @Input() max: number = 5;
  @Input() min: number = 0;
  @Output() clickAdicionar = new EventEmitter();
  @Output() clickSubtrair = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  adicionar(){
    if(this.contador === Number(this.max)){
      this.clickAdicionar.emit(this.contador.toString());
      return this.contador;
    }else{
      this.contador++;
      this.clickAdicionar.emit(this.contador.toString());
      return this.contador;
    }
  }

  subtrair(){
    if(this.contador === Number(this.min)){
      this.clickSubtrair.emit(this.contador.toString());
      return this.contador;
    }else{
      this.contador--;
      this.clickSubtrair.emit(this.contador.toString());
      return this.contador;
    }
  }

}
