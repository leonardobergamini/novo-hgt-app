import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastController } from '@ionic/angular';

import * as $ from 'jquery';
import { LoginService } from './login.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    email: new FormControl(''),
    senha: new FormControl('')
  });

  toast: any;

  constructor(private afAuth: AngularFireAuth, private toastController: ToastController, private loginService: LoginService ) { }

  ngOnInit() { }

  onSubmitLogin(){
    let formValues = this.formularioLogin.value;

    const loginUser = this.afAuth.auth.signInWithEmailAndPassword(formValues.email, formValues.senha);
    loginUser.then(resp => {
      resp.user.getIdToken(true).then(token => localStorage['token'] = token).catch(err => console.log(err));
    }).catch(err => console.log(err));
    
  }

  onSubmitCadastro(){
    let formValues = this.formularioCadastro.value;    
    const novoUser = this.afAuth.auth.createUserWithEmailAndPassword(formValues.email, formValues.senha);
    this.loginService.createUser(this.formularioCadastro.value)
    .then(resp => {
      console.log(resp);
      console.log(novoUser);
      this.exibirToast('Usuário criado com sucesso.');
      $('#formularioCadastro').trigger('reset');
      this.voltar();
    })
    .catch(err => {
      console.log(err);
      this.exibirToast('Algo deu errado. Tente novamente.');
    });
  }

  logOut(){
    this.afAuth.auth.signOut();
    localStorage['token'] = null;
  }

  async novaConta(){
    // const novoUser = this.afAuth.auth.sign(this.formularioCadastro.value);
    // console.log(novoUser);
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
