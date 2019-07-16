import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastController } from '@ionic/angular';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioCadastro = new FormGroup({
    primeiroNome: new FormControl(),
    sobrenome: new FormControl(),
    email: new FormControl(),
    usuario: new FormControl(),
    senha: new FormControl()
  });

  formularioLogin = new FormGroup({
    usuario: new FormControl(''),
    senha: new FormControl('')
  });

  toast: any;

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController) { }

  ngOnInit() { }

  onSubmitLogin(){

    console.log(this.formularioLogin.value);

    this.toast = this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: `Usuário logado`,
      closeButtonText: 'fechar',
      showCloseButton: true
    }).then(toastData => {
      toastData.present();
    });    

  }

  onSubmitCadastro(){
    console.log(this.formularioCadastro.value);
  }

  async novaConta(){
    // const novoUser = this.afAuth.auth.createUserWithEmailAndPassword('leonardo@gmail.com', 'leonardo123');
    // console.log(novoUser);
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
