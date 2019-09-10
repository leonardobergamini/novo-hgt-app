import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contador-hgt',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss'],
})
export class ContadorComponent implements OnInit {

  private contador: number = 0;
  constructor() { }

  ngOnInit() {}

  adicionar(){
    if(this.contador === 5){
      return this.contador;
    }else{
      return this.contador++;
    }
  }

  subtrair(){
    if(this.contador === 0){
      return this.contador;
    }else{
      return this.contador--;
    }
  }

}
