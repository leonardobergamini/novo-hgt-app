import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {

  slidesOpts = {
    slidesPerView: 4,  
  }
  constructor() { }

  ngOnInit() {}

}
