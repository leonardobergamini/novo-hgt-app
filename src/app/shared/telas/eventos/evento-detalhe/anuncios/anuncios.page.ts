import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Anuncios } from 'src/app/shared/models/anuncios/anuncios';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from 'src/app/shared/services/anuncios/anuncios.service';
import { Storage } from '@ionic/storage';
import { EventoSetoresSelecionado } from 'src/app/shared/interfaces/evento-setor-selecionado/evento-setores-selecionado';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {

  private anuncios: Anuncios[] = [];
  private id: number;

  constructor(
    private modalController: ModalController,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private anuncioService: AnunciosService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('idEvento'));
    this.anuncios = [];
    
    
    this.anuncios = JSON.parse(localStorage.getItem('anunciosPorEvento'));
    // console.log(this.anuncios);
  }

  comprar(anuncio){
    if(anuncio.usuario === '/api/usuarios/1'){
      this.exibirToast('Esse ingresso já é seu.', null);
    }else{
      console.log(anuncio);
      this.storage.remove('eventoSelecionado')
      .then(resp => {console.log('Excluindo storage...');});
      let eventoComSetoresSelecionado: EventoSetoresSelecionado = {
        evento: anuncio.ticket.idevento,
        qtdIngressos: 1,
        setores: anuncio.setor,
        valorTotal: anuncio.preco
      }
      this.storage.set('eventoSelecionado', eventoComSetoresSelecionado);
      this.router.navigate(['/menu-logado/efetuar-compra']);
      // this.exibirToast('Ingresso comprado com sucesso.', 'md-checkmark');
    }
  }

  exibirToast(msg: string, icone: string){
    const toast = this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: msg,
      closeButtonText: 'fechar',
      showCloseButton: true,
      buttons: [
        {
          side: 'start',
          icon: icone
        }
      ]
    }).then(toastData => {
      toastData.present();
    });
  }  

  voltar(){
    localStorage.removeItem('anunciosPorEvento');
    this.navCtrl.back();
  }

}
