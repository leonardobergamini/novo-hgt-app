import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastController, AlertController } from '@ionic/angular';

import * as $ from 'jquery';
import { LoginService } from '../../shared/services/login/login.service';
import { Router, NavigationExtras } from '@angular/router';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuarios = new Usuarios;
  private toast: any;

  formularioCadastro = new FormGroup({
    primeiro_nome: new FormControl(),
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
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController) {}

  ngOnInit() { }

  onSubmitLogin(){
    let formValues = this.formularioLogin.value;

    if(!formValues.senha){
      $('#senha').focus();
      this.exibirToast('Informe a senha');
    }else{
      // $('ion-progress-bar').removeClass('ion-hide');
      this.exibirAlert();
      this.loginService.login(formValues.email, formValues.senha)
          .then(resp => {
            console.log(('entrando'));          
          })
          .catch(err => {
            console.log(err);
            if(err.code) this.exibirToast('Usuário ou senha inválidos. Tente novamente.');
          })
          .finally(() => {
            this.fecharAlert();
  
            // $('ion-progress-bar').addClass('ion-hide');
          });
    }
  }

  onSubmitCadastro(){      
    let usuarioForm = this.formularioCadastro.value;

    this.usuario.primeiro_nome = usuarioForm.primeiro_nome;
    this.usuario.sobrenome = usuarioForm.sobrenome;
    this.usuario.email = usuarioForm.email;
    this.usuario.senha = usuarioForm.senha;
    
    console.log(this.usuario);
    
    this.loginService.createUser(this.usuario)
    .then(resp => {
      this.exibirToast(resp);
      $('#formularioCadastro').trigger('reset');
      this.voltar();
    })
    .catch(err => {
      console.log(err);
      this.exibirToast('Algo deu errado. Tente novamente.');
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

  onKeyLogin(event){
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if(!regex.test(event.target.value)){
      console.log('inválido');  
      $('#btnEntrar').prop('disabled', 'true');
    }else{
      console.log('válido');
      $('#btnEntrar').prop('disabled', 'false');
    }
  }

  onKeyCadastro(){

  }
}
