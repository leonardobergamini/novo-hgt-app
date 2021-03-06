import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Eventos } from '../../../models/eventos/eventos';
import * as $ from 'jquery';
import { ModalController, NavController } from '@ionic/angular';
import { Setores } from 'src/app/shared/models/setores/setores';
import { QuantidadeIngressoSetor } from 'src/app/shared/interfaces/quantidade-ingresso-setor/quantidade-ingresso-setor';
import { Storage } from '@ionic/storage';
import { EventoSetoresSelecionado } from 'src/app/shared/interfaces/evento-setor-selecionado/evento-setores-selecionado';
import { AnunciosService } from 'src/app/shared/services/anuncios/anuncios.service';
import { Anuncios } from 'src/app/shared/models/anuncios/anuncios';
import { AnunciosPage } from './anuncios/anuncios.page';

@Component({
  selector: 'evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  public temAnuncio: boolean = false;
  private arrayAnuncios: Anuncios[] = [];
  private isUsuarioLogado: boolean;
  private rotaVoltar: string;
  private id: number = 0;
  private contador: number = 0;
  private evento: Eventos = null;
  private ativarBtn: boolean = false;
  private valorTotal: number = 0;
  private qtdIngressos: number = 0;
  private arraySetoresSemQuantidade = [];
  private arraySetoresSelecionados = [];
  private arraySomenteSetoresSelecionados: QuantidadeIngressoSetor[] = [];
  @Input() eventos: Eventos;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private statusBar: StatusBar,
    private activatedRoute: ActivatedRoute,
    private anuncioService: AnunciosService,
    private modalController: ModalController
  ){ }

  ngOnInit() {
    this.removerValorTotalNoBotao();
    
    this.evento = JSON.parse(localStorage.getItem('detalhe-evento'))
    this.arrayAnuncios = [];
    this.anuncioService.getAllByEvento(this.evento.id)
    .then(resp => {
      console.log(resp);
      this.arrayAnuncios = resp;

      this.arrayAnuncios.forEach(anuncio => {
        anuncio.isvendido == false ? this.temAnuncio = true : null;
      });
    })
    .catch(err => {
      console.log(err);
    })
    this.evento.setores.sort((a,b) => {
      return Number(a.preco) - Number(b.preco);
    });
    this.evento.setores.forEach((value, i) => {
      this.arraySetoresSemQuantidade.push({setor: value.nome, contador: 0});
    });
    
  }

  ionViewDidEnter(){ 
    this.statusBar.styleBlackTranslucent();
    this.removerValorTotalNoBotao();
    this.arraySomenteSetoresSelecionados = [];
    // this.id = Number(this.activatedRoute.snapshot.paramMap.get('idEvento'));
    this.isUsuarioLogado = Boolean(localStorage.getItem('isUsuarioLogado'));
  }

  ionViewDidLeave(){ 
    console.log('saindo tela evento-detalhe...')
    localStorage.removeItem('detalhe-evento');
  }

  adicionaBotaoComprar(){
    $('ion-tabs').find('ion-button').removeClass('ion-hide');
  }

  voltar(){
    if(this.isUsuarioLogado){
      this.navCtrl.navigateBack('menu-logado/explorar');
    }else{
      this.navCtrl.navigateBack('menu/explorar');
    }
  }

  exibeAnuncios(evento){
    localStorage.setItem('anunciosPorEvento', JSON.stringify(this.arrayAnuncios));
    this.navCtrl.navigateForward(`menu-logado/explorar/detalhe-evento/${evento.id}/anuncios`);
  }

  validarCompra(evento){
    if(this.arraySetoresSelecionados.length > 0 && this.contador){
      this.somenteSetoresSelecionados(this.arraySetoresSelecionados);
      this.getQuantidadeIngressos(this.arraySetoresSelecionados);
      let eventoComSetoresSelecionado: EventoSetoresSelecionado = {
        evento: evento,
        setores: this.arraySomenteSetoresSelecionados,
        valorTotal: this.valorTotal,
        qtdIngressos: this.qtdIngressos
      }
      
      localStorage.setItem('eventoSelecionado', JSON.stringify(eventoComSetoresSelecionado));
      this.router.navigate(['/menu-logado/efetuar-compra']);
      
    }else{
      console.log('Contador zerado');
    }
  }

  selecionarSetor(setor: Setores, contador: number){
    this.contador = Number(contador);
    this.arraySetoresSelecionados = this.arraySetoresSemQuantidade;
      let novoArray = this.arraySetoresSemQuantidade.map((value: QuantidadeIngressoSetor) => {
      if(setor.nome === value.setor){
        return value = {
          setor: value.setor, 
          contador: Number(contador),
          preco: Number(setor.preco),
          valorTotal: (Number(setor.preco) * Number(contador))
        };
      }
      return value;
    });

    novoArray.forEach((value: QuantidadeIngressoSetor, i) => {
      if(value.setor === this.arraySetoresSelecionados[i].setor && (value.contador >= this.arraySetoresSelecionados[i].contador || value.contador <= this.arraySetoresSelecionados[i].contador)) {
        this.arraySetoresSelecionados[i].contador = value.contador;
        this.arraySetoresSelecionados[i].preco = value.preco;
        this.arraySetoresSelecionados[i].valorTotal = (value.preco * value.contador);
      }else{
        return;
      }
    });
    this.calcularValorTotal(this.arraySetoresSelecionados);
    this.valorTotal > 0 ? this.adicionarValorTotalNoBotao() : this.removerValorTotalNoBotao();
  }

  calcularValorTotal(setores){
    let valorTmp: number = 0;
    setores.forEach((setor, i) => {
      if(setor.valorTotal >= 0){
        valorTmp += setor.valorTotal;
      }
    });
    return this.valorTotal = valorTmp;
  }

  somenteSetoresSelecionados(arraySetores){
    arraySetores.forEach((value, i) => {
      if(value.contador > 0){
        this.arraySomenteSetoresSelecionados.push(value);
      }
    });
  }

  getQuantidadeIngressos(setores){
    let valorTmp: number = 0;
    this.arraySomenteSetoresSelecionados.forEach((setor, i) => {
      if(setor.contador > 0){
        valorTmp += setor.contador;
      }
    });
    return this.qtdIngressos = valorTmp;
  }

  adicionarValorTotalNoBotao(){
    $('.btnComprar').attr('color', 'success').html(`<strong>Valor da compra: R$ ${this.valorTotal}</strong>`);
  }

  removerValorTotalNoBotao(){
    $('.btnComprar').attr('color', 'primary').text('garanta seu ingresso');
  }

  redirecionaLogin(){
    this.navCtrl.navigateForward('menu/login');
  }

}
