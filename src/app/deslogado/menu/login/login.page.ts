import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ToastController, AlertController } from '@ionic/angular';

import * as $ from 'jquery';
import { LoginService } from '../../../shared/services/login/login.service';
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
  private erro: boolean;

  formularioCadastro = new FormGroup({
    primeiro_nome: new FormControl(),
    sobrenome: new FormControl(),
    email: new FormControl(),
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

    if(JSON.stringify(usuarioForm).trim().includes('null')){
      if(usuarioForm.primeiro_nome == null || usuarioForm.primeiro_nome == '') this.campoInvalido('.primeiro_nome');
      if(usuarioForm.sobrenome == null || usuarioForm.sobrenome == '') this.campoInvalido('.sobrenome');
      if(usuarioForm.email == null || usuarioForm.email == '') this.campoInvalido('.email');
      if(usuarioForm.senha == null || usuarioForm.senha == '') this.campoInvalido('.senha');
      if($('.senhaConf').find('input').val() == null || $('.senhaConf').find('input').val() == '') this.campoInvalido('.senhaConf');

    }else{
      this.usuario.primeiro_nome = usuarioForm.primeiro_nome;
      this.usuario.sobrenome = usuarioForm.sobrenome;
      this.usuario.email = usuarioForm.email;
      this.usuario.senha = usuarioForm.senha;

      if(!this.erro){
        this.loginService.createUser(this.usuario)
        .then(resp => {
          this.exibirToast(resp);
          $('#formularioCadastro').trigger('reset');
          this.voltar();
        })
        .catch(err => {
          console.log(err.code);
          if(err.code == 'auth/email-already-in-use'){
            this.exibirToast('E-mail já cadastrado no sistema.');  
            $('.email').find('.input').find('input').focus();
            $('.email').find('.input').removeClass('valido');
            $('.email').find('.icone-ok').addClass('ion-hide');
            $('.email').find('.input').addClass('invalido');
            return;
          }else{
            this.exibirToast('Algo deu errado. Tente novamente.');
          }
        });
      }
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

  verificarSenha(event){
    let campo = event.target;
    let senha = $('.senhaConf').find('input').val();


    // if(campo.value == '' || campo.value == null){
    //   this.campoInvalido('.senha');
    //   this.erro = true;
    //   return;
    // }

    if(campo.value.length < 6){
      console.log('menor que 6');
      $(campo).parent().parent().find('.validacao').removeClass('ion-hide');
      $(campo).parent().parent().find('.validacao').text('*A senha deve ser maior que 6 caracteres.');
      $(campo).parent().addClass('invalido');
      $(campo).parent().removeClass('valido');
      $(campo).parent().find('.icone-ok').addClass('ion-hide');
      this.erro = true;
      return;
    }    
    
    else{
      $(campo).parent().find('.icone-ok').removeClass('ion-hide');
      $(campo).parent().removeClass('invalido');
      $(campo).parent().addClass('valido');
      $(campo).parent().parent().find('.validacao').addClass('ion-hide');
      $('.senhaConf').find('input').removeClass('invalido');
      $('.senhaConf').find('.validacao').addClass('ion-hide');
      this.erro = false;
    }
  }

  verificarSenhaIgual(event){
    let campo = event.target;
    let senha = $('.senha').find('input').val();
    console.log(campo.value != senha);
    console.log(campo.value + ' - ' + senha);

    if(campo.value == null || campo.value == ''){
      $(campo).parent().addClass('invalido');
      $(campo).parent().parent().find('.validacao').removeClass('ion-hide');
      this.erro = true;
      return;
    }
    if(campo.value != senha){
      $(campo).parent().parent().find('.validacao').removeClass('ion-hide');
      $(campo).parent().parent().find('.validacao').text('*As senhas devem ser iguais.');
      $(campo).parent().addClass('invalido');
      $(campo).parent().removeClass('valido');
      $(campo).parent().find('.icone-ok').addClass('ion-hide');
      this.erro = true;
      return;
    }else{
      $(campo).parent().find('.icone-ok').removeClass('ion-hide');
      $(campo).parent().addClass('valido');
      $(campo).parent().removeClass('invalido');
      $(campo).parent().parent().find('.validacao').addClass('ion-hide');
      this.erro = false;
    }
  }

  campoInvalido(classeCss: string){
    $('#formularioCadastro').focus();
    $(classeCss).find('.input').addClass('invalido');
    $(classeCss).find('.validacao').removeClass('ion-hide');
    $(classeCss).find('.validacao').text('*Ops! Não esquece desse campo.');
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
      message: 'Carregando...'
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

  onKeyCadastro(event){
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if(!regex.test(event.target.value)){
      console.log('inválido');  
      $(event.target).parent().removeClass('ion-hide');
      $(event.target).parent().removeClass('valido');
      $(event.target).parent().addClass('invalido');
      $(event.target).parent().parent().find('.validacao').removeClass('ion-hide');
      $(event.target).parent().parent().find('.validacao').text('Insira um e-mail válido.');
      $(event.target).parent().find('.icone-ok').addClass('ion-hide');
      this.erro = true;
    }else{
      console.log('válido');
      $(event.target).parent().removeClass('invalido');
      $(event.target).parent().addClass('valido');
      $(event.target).parent().find('.icone-ok').removeClass('ion-hide');
      $(event.target).parent().parent().find('.validacao').addClass('ion-hide');
      this.erro = false;
    }
  }
}
