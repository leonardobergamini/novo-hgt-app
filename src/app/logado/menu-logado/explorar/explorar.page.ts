import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';

import { Eventos } from '../../../shared/models/eventos/eventos';
import { EventosService } from 'src/app/shared/services/eventos/eventos.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { NavController } from '@ionic/angular';
import { ListaCategoriasComponent } from 'src/app/shared/componentes/lista-categorias/lista-categorias.component';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  @ViewChild(ListaCategoriasComponent) listaCategoriasPage: ListaCategoriasComponent;
  private eventos: Eventos[];
  private categorias: string[] = ["música", "teatro", "palestra", "stand-up", "infantil"];
  private usuarioLogado: any;

  constructor(
    private statusBar: StatusBar,
    private storage: Storage,
    private eventoService: EventosService
    ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#FF6700');    
    this.carregarEventos();
  }

  async recarregarEventos(event){
    await this.carregarEventos();
    event.target.complete();
  }

  IonViewDidLeave(){
    // this.usuarioLogado = null;
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#FF6700');
    // this.storage.get('usuario').then(resp => this.usuarioLogado = resp)
    // console.log(this.usuarioLogado);
    
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    this.msgBoasVindas();
  }

  carregarEventos(){
    this.eventoService.getAllEventos()
    .then(resp => {
      this.storage.remove('eventos')
      .then(() => {
        this.listaCategoriasPage.filtrarCategorias('música');
        this.storage.set('eventos', resp);
        this.eventos = resp;
      })
    });
  }

  msgBoasVindas() {
    var data = new Date();
    if(data.getHours() < 12 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>bom dia, ${this.usuarioLogado.primeironome.toLowerCase()}</h2>`);
    }
    if (data.getHours() >= 12){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa tarde, ${this.usuarioLogado.primeironome.toLocaleLowerCase()}</h2>`);
    }
    if(data.getHours() >= 18 ){
      $('.bem-vindo').find('h2').remove();
      $('.bem-vindo').append(`<h2>boa noite, ${this.usuarioLogado.primeironome.toLocaleLowerCase()}</h2>`);
    }
  }

}  

