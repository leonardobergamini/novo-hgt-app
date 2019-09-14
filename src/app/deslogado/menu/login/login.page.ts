import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as $ from 'jquery';
import { EmailValidator } from '../../../shared/validators/email-validator/email-validator'
import { SenhaValidator } from '../../../shared/validators/senha-validator/senha-validator'
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Utils } from 'src/app/shared/utils/utils';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('formSlides') formSlides;

  private toast: any;
  private loading: any;
  private formLogin: FormGroup;
  private formCadastro: FormGroup;

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
  };

  sliderOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 400,
    preventInteractionOnTransition: true,
  }

  constructor(
    private toastController: ToastController, 
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private storage: Storage,
    private statusBar: StatusBar
  ) {
      this.formCadastro = formBuilder.group({
        primeiro_nome: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        sobrenome: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        email: ['', Validators.required, EmailValidator.verificarEmail],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        senhaConfirmacao: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      }, {validator: SenhaValidator.areSenhasIguais});

      this.formLogin = formBuilder.group({
        email: ['', Validators.required, EmailValidator.verificarEmail],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

    }

  ngOnInit() { }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#ecf0f1');
    this.statusBar.styleDefault();
  }

  next(){
    this.formSlides.slideNext();
  }

  prev(){
    this.formSlides.slidePrev();
  }

  async onSubmitLogin(){
    if(!this.formLogin.valid){
      console.log('Há erros no form de login');
      this.exibirErro('Há erros no formulário. Verique-o e tente novamente.', 'md-close-circle');
      this.formSlides.slideTo(0);
    }else{
      this.usuarioService.login(this.formLogin.get('email').value, this.formLogin.get('senha').value)
      .then(resp => {
        console.log(resp);     
      })
      .catch(err => {
        console.log(err);
        if(err.code) this.exibirErro('Usuário ou senha inválidos. Tente novamente.', 'md-close-circle');
      });
    }
  }

  onSubmitCadastro(){      
    console.log(this.formCadastro.value);
    if(!this.formCadastro.valid){
      this.exibirErro('Há erros no formulário. Verique-o e tente novamente.', 'md-close-circle');
      this.formSlides.slideTo(1);
    }else{
      this.usuarioService.createUser(Utils.inicializaUsuario(this.formCadastro.value))
      .then(resp => {
        if(resp.status == 200 || resp.status == 201){
          this.storage.set('usuario', JSON.stringify(Utils.inicializaUsuario(this.formCadastro.value)));
          this.exibirErro('Cadastro feito com sucesso!', 'md-mark-circle');
          $('#formularioCadastro').trigger('reset');
          this.prev();
        }else{
          this.exibirErro('Algo deu errado. Tente novamente.', 'md-close-circle');
          return;
        }
      })
      .catch(err => {
        if(err){
          this.exibirErro('Algo deu errado. Tente novamente.', 'md-close-circle');
          return;
        }
      });
    }
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
    });
  }

  fecharAlert(){
    this.alertController.dismiss();
  }

  exibirErro(msg: string, icone: string){
    this.toast = this.toastController.create({
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

}
