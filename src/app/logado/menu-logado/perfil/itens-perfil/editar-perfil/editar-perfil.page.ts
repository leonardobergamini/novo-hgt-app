import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, ModalController, ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Eventos } from 'src/app/shared/models/eventos/eventos';
import * as $ from 'jquery';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit, OnDestroy {

  usuario: Usuarios = {...this.navParams.get('usuario')};
  erro: boolean = false;
  toast: any;

  validation_messages = {
    'primeiro_nome': [
        { type: 'required', message: 'Ops! Não esqueça do seu primeiro nome.' }
      ],
    'sobrenome': [
      { type: 'required', message: 'Ops! Não esqueça do seu sobrenome.' }
    ],
  }

  constructor(private navParams: NavParams, 
    private modalCtrl: ModalController,
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController) { }

  formularioCadastro = new FormGroup({
    primeiro_nome: new FormControl(this.usuario.primeiro_nome),
    sobrenome: new FormControl(this.usuario.sobrenome),
    email: new FormControl(this.usuario.email),
    senha: new FormControl(this.usuario.senha)
  });

  ngOnInit() {
    this.inicializarCampos(this.usuario);

  }
  
  ngOnDestroy(): void {
    this.usuario = null;
  }

  inicializarCampos(usuario: Usuarios){
    if(this.formularioCadastro.value.primeiro_nome != null || this.formularioCadastro.value.primeiro_nome != '' || this.formularioCadastro.value.primeiro_nome != undefined){
      $('.primeiro_nome').find('.input').find('.icone-ok').removeClass('ion-hide');
      $('.primeiro_nome').find('.input').addClass('valido');
    }
    if(this.formularioCadastro.value.sobrenome != null || this.formularioCadastro.value.sobrenome != '' || this.formularioCadastro.value.sobrenome != undefined){
      $('.sobrenome').find('.input').find('.icone-ok').removeClass('ion-hide');
      $('.sobrenome').find('.input').addClass('valido');
    }
    if(this.formularioCadastro.value.email != null || this.formularioCadastro.value.email != '' || this.formularioCadastro.value.email != undefined){
      $('.email').find('.input').find('.icone-ok').removeClass('ion-hide');
      $('.email').find('.input').addClass('valido');
    }
    if(this.formularioCadastro.value.senha != null || this.formularioCadastro.value.senha != '' || this.formularioCadastro.value.senha != undefined){
      $('.senha').find('.input').find('.icone-ok').removeClass('ion-hide');
      $('.senha').find('.input').addClass('valido');
    }
  }

  fecharModal(){
    this.modalCtrl.dismiss();
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
