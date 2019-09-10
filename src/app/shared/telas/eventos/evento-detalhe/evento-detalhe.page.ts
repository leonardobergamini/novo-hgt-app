import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Setores } from 'src/app/shared/models/setores/setores';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  private contador: number = 0;
  evento: Eventos = null;
  ativarBtn: boolean = false;
  @Input() eventos: Eventos;


  constructor(
    private activeRoute: ActivatedRoute, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router
  ){
    this.evento = navParams.get('eventoSelecionado');
  }

  ngOnInit() {
    $('#favorito').click(() => {
      $('#favorito').toggleClass('favoritoClicado');
    });
  }

  reset(){
    $('#favorito').removeClass('favoritoClicado');
  }

  adicionaBotaoComprar(){
    $('ion-tabs').find('ion-button').removeClass('ion-hide');
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  validarCompra(evento, event){
    this.fecharModal();
    this.router.navigate(['/menu-logado/efetuar-compra']);
    console.log(event.target);
  }

  selecionaSetor(setor, event){
    let iconeClicado = $(event.target).attr('name');
    let contador = Number($('#contador').text());
    let setoresSelecionados: Setores[] = [];

    if(iconeClicado === 'add-circle'){
      setoresSelecionados.push(setor);
    }else if(iconeClicado === 'remove-circle'){
      if(contador === 0){
        setoresSelecionados.pop();
      }
    }else{
      return;
    }

    console.log(setoresSelecionados);
  }
}
