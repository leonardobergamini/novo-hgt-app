import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Tickets } from 'src/app/shared/models/tickets/tickets';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-revender',
  templateUrl: './revender.page.html',
  styleUrls: ['./revender.page.scss'],
})
export class RevenderPage implements OnInit {

  private id: number = 0;
  private ticket: Tickets = null;
  private formRevender: FormGroup;

  constructor(
    private statusBar: StatusBar,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { 
    this.formRevender = this.formBuilder.group({
      preco: ['']
    })
  }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('idPedido'));
    this.ticket = JSON.parse(localStorage.getItem('ticket'));

    console.log(this.ticket);
  }

  fecharModal(){
    localStorage.removeItem('ticket');
    this.navCtrl.navigateBack(`menu-logado/meus-ingressos/detalhe-pedido/${this.id}`);
    // this.modalController.dismiss();
  }

  exibirAlert(){
    this.alertController.create({
      header: 'Confirmação de revenda',
      animated: true,
      message: 'Confirma a revenda do ingresso selecionado?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
          role: 'cancel',
          handler: () => {
            return false;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            // return true;
            console.log('recuperar senha');
          }
        } 
      ]
    }).then(alert => {
      alert.present();
    }).catch(err => {
      console.log(err);
    });
  }
}
