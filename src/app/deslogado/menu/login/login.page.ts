import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import * as $ from 'jquery';
import { LoginService } from '../../../shared/services/login/login.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { EmailValidator } from '../../../shared/validators/email-validator/email-validator'
import { SenhaValidator } from '../../../shared/validators/senha-validator/senha-validator'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('formSlides') formSlides;

  usuario: Usuarios = new Usuarios;
  private toast: any;
  private erro: boolean;

  public formLogin: FormGroup;
  public formCadastro: FormGroup;

  mensagensValidacao = {
    'primeiro_nome': [
      {type: 'maxlength', message: 'Nome maior que 30 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece de informar seu nome.'},
      {type: 'pattern', message: 'Seu nome só pode conter letras.' }
    ],

    'sobrenome': [
      {type: 'maxlength', message: 'Sobrenome maios que 50 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece que informar o seu sobrenome.'},
      {type: 'pattern', message: 'Seu sobrenome só pode conter letras.'},
    ],

    'email': [
      {type: 'required', message: 'Ops! Não esquece que informar o seu e-mail.'},
      {type: 'emailinvalido', message: 'Informe um e-mail válido.'},
    ],

    'senha': [
      {type: 'required', message: 'Ops! Não esquece de informar a sua senha.'},
      {type: 'minlength', message: 'Sua senha deve ser maior que 6 caracteres.'},
    ],

    'senhaConfirmacao': [
      {type: 'required', message: 'Ops! Não esquece de confirmar sua senha.'},
      {type: 'minlength', message: 'Sua senha deve ser maior que 6 caracteres.'},
      {type: 'senhasdiferentes', message: 'As senhas devem ser iguais.'}
    ]
  }

  sliderOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 400,
    preventInteractionOnTransition: true,
  }

  constructor(private router: Router, 
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController) {

      this.formCadastro = formBuilder.group({
        primeiro_nome: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        sobrenome: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        email: ['', Validators.required, EmailValidator.verificarEmail],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        senhaConfirmacao: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: SenhaValidator.areSenhasIguais});

      this.formLogin = formBuilder.group({
        email: ['', Validators.required, EmailValidator.verificarEmail],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      })

    }

  ngOnInit() { }

  ionViewDidLeave(){
    $('#progressoLogin').addClass('ion-hide');
    $('#progressoCadastro').addClass('ion-hide');
  }

  next(){
    this.formSlides.slideNext();
  }

  prev(){
    this.formSlides.slidePrev();
  }

  formLoginIsValid(){
    return this.formLogin.valid;
  }

  formCadastroIsValid(){
    return this.formCadastro.valid;
  }

  onSubmitLogin(){

    if(!this.formLogin.valid){
      console.log('Há erros no form de login');
      this.exibirToast('Há erros no formulário. Verique-o e tente novamente.');
      this.formSlides.slideTo(0);
    }else{
      $('#progressoLogin').removeClass('ion-hide');
      this.loginService.login(this.formLogin.get('email').value, this.formLogin.get('senha').value)
          .then(resp => {
            console.log(('entrando'));          
          })
          .catch(err => {
            console.log(err);
            $('#progressoLogin').addClass('ion-hide');
            if(err.code) this.exibirToast('Usuário ou senha inválidos. Tente novamente.');
          })
    }
  }

  onSubmitCadastro(){      
    if(!this.formCadastro.valid){
      console.log('Há erros no form cadastro');
      this.exibirToast('Há erros no formulário. Verique-o e tente novamente.');
      this.formSlides.slideTo(1);
    }else{
      $('#progressoCadastro').removeClass('ion-hide');
      this.usuario = this.formCadastro.value;      
      this.loginService.createUser(this.usuario)
      .then(resp => {
        this.exibirToast(resp);
        $('#formularioCadastro').trigger('reset');
        this.prev();
      })
      .catch(err => {
        $('#progressoCadastro').addClass('ion-hide');
        console.log(err.code);
        if(err.code == 'auth/email-already-in-use'){
          this.exibirAlert();
          return;
        }else{
          this.exibirToast('Algo deu errado. Tente novamente.');
        }
      });
    }
  }

  verificarValidacao(event){
    let campo = event.target;

    if($(campo).val() == '' || $(campo).val() == null){
      console.log(event.target);
      $(campo).parent().addClass('invalido');
      $(campo).parent().parent().find('.validacao').removeClass('ion-hide');
      $(campo).parent().removeClass('valido');
      $(campo).parent().find('.icone-ok').addClass('ion-hide');
      this.erro = true;
    }else{
      console.log(event.target);
      $(campo).parent().removeClass('invalido');
      $(campo).parent().parent().find('.validacao').addClass('ion-hide');
      $(campo).parent().addClass('valido');
      $(campo).parent().find('.icone-ok').removeClass('ion-hide');
      this.erro = false;
    }
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
      header: 'E-mail já cadastro no sistema.',
      animated: true,
      message: 'Esqueceu sua senha?',
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
      this.exibirToast('Erro');
    });
  }

  fecharAlert(){
    this.alertController.dismiss();
  }

}
