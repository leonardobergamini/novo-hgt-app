import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavParams, ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Utils } from '../../../../../shared/utils/utils';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator/cpf-validator';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import * as $ from 'jquery';
import * as moment from 'moment';


@Component({
  selector: 'editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit, OnDestroy {

  public usuario: Usuarios = JSON.parse(localStorage.getItem('usuarioLogado'));
  public formEditar: FormGroup;

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
      {type: 'required', message: 'Ops! Não esquece de informar o seu e-mail.'},
      {type: 'emailinvalido', message: 'Informe um e-mail válido.'},
    ],

    'usuario': [
      {type: 'required', message: 'Ops! Não esquece de informar seu nome de usuário.'},
      {type: 'maxlength', message: 'O nome de usuário não pode ser maior que 20 caracteres.'}
    ],

    'cpf': [
      {type: 'required', message: 'Ops! Não esquece de informar o cpf.'},
      {type: 'cpfinvalido', message: 'CPF inválido.'},
      {type: 'maxlength', message: 'CPF muito grande.'}
    ],

    'telefone': [
      {type: 'required', message: 'Ops! Não esquece de informar seu telefone.'}
    ],

    'cep': [
      {type: 'required', message: 'Ops! Não esquece de informar o seu cep.'}
    ],

    'logradouro': [
      {type: 'required', message: 'Ops! Não esquece de informar seu logradouro.'}
    ],

    'numero': [
      {type: 'required', message: 'Ops! Não esquece de informar o número.'}
    ],

    'cidade': [
      {type: 'required', message: 'Ops! Não esquece de informar a cidade.'}
    ],

    'uf': [
      {type: 'required', message: 'Ops! Não esquece de informar a uf.'}
    ]
  }

  constructor(
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public loadingController: LoadingController
  ) { 
    this.formEditar = formBuilder.group({
      id_usuario: [this.usuario.id],
      primeiro_nome: [this.usuario.primeiroNome, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-z ]*')])],
      sobrenome: [this.usuario.sobrenome, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-z ]*')])],
      email: [this.usuario.email],
      usuario: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      dt_nascimento: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.maxLength(14), Validators.required, CpfValidator.validarCPF])],
      telefone: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      cep: ['', Validators.compose([Validators.maxLength(9), Validators.required])],
      logradouro: ['', Validators.required],
      numero: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')])],
      complemento: [''],
      cidade: ['', Validators.compose([Validators.required])],
      uf: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.getData();
    this.usuarioService.readUsers();
  }
  
  ngOnDestroy(): void {
    this.usuario = null;
  }

  onSubmitEditar(){
    if(!this.formEditar.valid){
      console.log('Há erros no form.');

    }else{

    }
  }

  setData(event){
    this.formEditar.get('dt_nascimento').setValue(event.target.value);
  }

  getData(): string{
    let hoje = moment().locale('pt-br');
    return Utils.formatarDataEUA(hoje.format('L'));
  }

  getEndereco(event){
    let cep = event.target.value;
    $('.loading').removeClass('ion-hide');
    $('#numero').focus();
    Utils.buscarEndereco(cep)
    .then(resp => {
      this.formEditar.get('logradouro').setValue(resp.logradouro);
      this.formEditar.get('cidade').setValue(resp.localidade);
      this.formEditar.get('uf').setValue(resp.uf);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => $('.loading').addClass('ion-hide'));
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();
  }


}
