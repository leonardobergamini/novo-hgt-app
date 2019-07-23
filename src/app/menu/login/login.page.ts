import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastController, AlertController } from '@ionic/angular';

import * as $ from 'jquery';
import { LoginService } from '../../shared/services/login/login.service';
import { Router, NavigationExtras } from '@angular/router';
import { MenuPage } from '../menu.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private toast: any;

  formularioCadastro = new FormGroup({
    primeiroNome: new FormControl(),
    sobrenome: new FormControl(),
    email: new FormControl(),
    usuario: new FormControl(),
    senha: new FormControl()
  });

  formularioLogin = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  });

  constructor(private router: Router, 
    private afAuth: AngularFireAuth, 
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController) {}

  ngOnInit() { }

  onSubmitLogin(){
    let formValues = this.formularioLogin.value;
    // $('ion-progress-bar').removeClass('ion-hide');
    this.exibirAlert();
    this.loginService.login(formValues.email, formValues.senha)
        .then(resp => {
          console.log(('entrando'));

          
        })
        .catch(err => {
          console.log(err);
          if(err.code == 'auth/wrong-password') this.exibirToast('Usuário ou senha inválidos. Tente novamente.');
          if(err.code == 'auth/user-not-found') this.exibirToast('Usuário não encontrado. Faça seu cadastro.');
          
        })
        .finally(() => {
          this.fecharAlert();

          // $('ion-progress-bar').addClass('ion-hide');
        })
  }

  onSubmitCadastro(){
    let formValues = this.formularioCadastro.value;    
    this.afAuth.auth.createUserWithEmailAndPassword(formValues.email, formValues.senha);
    this.loginService.createUser(this.formularioCadastro.value)
    .then(resp => {
      // $('ion-progress-bar').removeClass('ion-hide');
      this.exibirAlert();
      this.exibirToast('Usuário criado com sucesso.');
      $('#formularioCadastro').trigger('reset');
      this.voltar();
    })
    .catch(err => {
      console.log(err);
      this.exibirToast('Algo deu errado. Tente novamente.');
    })
    .finally(() => {
      this.fecharAlert();
      // $('ion-progress-bar').addClass('ion-hide');
    });
  }

  exibirToast(mensagem){
    this.toast = this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: `${mensagem}`,
      closeButtonText: 'fechar',
      showCloseButton: true
    }).then(toastData => {
      toastData.present();
    });    
  }

  exibirAlert(){
    this.alertController.create({
      animated: true,
      mode: 'ios',
      message: 'Carregando...',
      cssClass: ''
    }).then(alert => {
      alert.present();
    }).catch(err => {
      console.log(err);
      this.exibirToast('Erro');
    });
  }

  fecharAlert(){
    this.alertController.dismiss();
  }

  abrirNovaConta(){
    $('.box-login').addClass('ion-hide');
    $('.box-cadastrar').removeClass('ion-hide');
    $('#btnEntrar').addClass('ion-hide');
    $('#btnCadastrar').removeClass('ion-hide');

  }

  voltar(){
    $('.box-login').removeClass('ion-hide');
    $('.box-cadastrar').addClass('ion-hide');
    $('#btnEntrar').removeClass('ion-hide');
    $('#btnCadastrar').addClass('ion-hide');
  }
}
