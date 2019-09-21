import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';
import { FormasPagamento } from 'src/app/shared/models/formas-pagamento/formas-pagamento';
import { FormaPagamentoService } from 'src/app/shared/services/formas-pagamento/forma-pagamento.service';
import { Utils } from 'src/app/shared/utils/utils';
import { CartoesCredito } from 'src/app/shared/models/cartoes-credito/cartoes-credito';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';

@Component({
  selector: 'cartao-credito-page',
  templateUrl: './cartao-credito.page.html',
  styleUrls: ['./cartao-credito.page.scss'],
})
export class CartaoCreditoPage implements OnInit {

  formCadastrarFormaPg: FormGroup;

  mensagensValidacao = {
    'nroCartao': [
      {type: 'minlength', message: 'O número do cartão não pode ser menor que 16 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece de informar o número do cartão.'}
    ],

    'dtVencimento': [
      {type: 'required', message: 'Ops! Não esquece que informar a data de validade.'}
    ],

    'codSeguranca': [
      {type: 'required', message: 'Ops! Não esquece que informar o código de segurança.'},
      {type: 'maxlength', message: 'Código de segurança maior que 3 dígitos'}
    ],

    'nomeTitular': [
      {type: 'required', message: 'Ops! Não esquece de informar o nome do titular do cartão.'},
      {type: 'minlength', message: 'Nome do titular muito grande. Máximo permitido: 20 caracteres.'},
      {type: 'pattern', message: 'Somente letras no nome.' }
    ],

    'bandeira': [
      {type: 'required', message: 'Ops! Não esquece de informar a bandeira do cartão.'}
    ]
  };

  bandeiras = [
    {
      nome: 'VISA',
      icone: 'visa.svg'
    },
    {
      nome: 'MASTERCARD',
      icone: 'mastercard.svg'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private toastController: ToastController,
    private statusBar: StatusBar,
    private formaPagamentoService: FormaPagamentoService,
    private navCtrl: NavController,
  ) { 
    this.formCadastrarFormaPg = formBuilder.group({
      nroCartao: ['', Validators.compose([Validators.required, Validators.minLength(16)])],
      dtVencimento: ['', Validators.required],
      codSeguranca: ['', Validators.compose([Validators.maxLength(3), Validators.required])],
      nomeTitular: ['', Validators.compose([Validators.maxLength(20), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      bandeira: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.statusBar.styleDefault();
    console.log($('#txtDtVencimento'));
  }

  ionDidViewEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }

  setDadosNroCartao(event){
    let valor: string = event.target.value;
    $('#txtNroCartao').text(valor.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
  }

  setDadosDtVencimento(event){
    let data: string = event.target.value;
    $('#txtDtVencimento').text(Utils.formatarDataDiaMes(data.slice(0, 10)));
  }

  setDadosCodSeguranca(event){
    $('#txtCodSeguranca').text(event.target.value);
  }

  setDadosNomeTitular(event){
    $('#txtNomeTitular').text(event.target.value);
  }

  onSubmit(){
    if(!this.formCadastrarFormaPg.valid){                      
      console.log(this.formCadastrarFormaPg.value);         
      this.exibirToast('Há erros no formulários. Tente novamente', 'close-circle');
    }else{
      let cartao: CartoesCredito = this.formCadastrarFormaPg.value;
      console.log(cartao);
      this.keyboard.hide();
      this.formaPagamentoService.adicionar(null, cartao, null)
      .then(resp => {
        console.log(resp);
        this.exibirToast('Cartão cadastrado com sucesso!', 'checkmark-circle');
        this.navCtrl.back();
      })
      .catch(err => {
        console.log(err);
        this.exibirToast(err, 'close-circle');
      });
    }
  }

  exibirToast(msg: string, icone?: string){
    const toast = this.toastController.create({
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
