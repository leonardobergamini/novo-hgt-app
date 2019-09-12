import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';

@Component({
  selector: 'app-efetuar-compra',
  templateUrl: './efetuar-compra.page.html',
  styleUrls: ['./efetuar-compra.page.scss'],
})
export class EfetuarCompraPage implements OnInit {
  private eventoSelecionado = {};
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
  }

  ionViewDidEnter(){
    this.storage.get('eventoSelecionado')
    .then(resp => {
      this.eventoSelecionado = resp;
      this.formatarIngressos(this.eventoSelecionado);
      this.eventoSelecionado = this.calcularValorTotal(this.eventoSelecionado);
      console.log(this.eventoSelecionado);
    });
  }

  formatarIngressos(eventos){
    let novoArray = [];

  // novoArray = eventos.setores.map(value => {
  //   if(value.)
  // });
  }

  calcularValorTotal(eventos){
    debugger;
    let tmp: number = 0;
    let arrayRetorno = [];
    
    return arrayRetorno = {...eventos.setores, valorTotal: tmp};
  }

}
