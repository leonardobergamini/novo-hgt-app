import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ToastController, NavController, IonItemSliding } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';
import { FormasPagamento } from 'src/app/shared/models/formas-pagamento/formas-pagamento';
import { FormaPagamentoService } from 'src/app/shared/services/formas-pagamento/forma-pagamento.service';
import { Utils } from 'src/app/shared/utils/utils';
import { CartoesCredito } from 'src/app/shared/models/cartoes-credito/cartoes-credito';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { ActivatedRoute } from '@angular/router';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito/cartao-credito.service';

@Component({
  selector: 'cartao-credito-page',
  templateUrl: './cartao-credito.page.html',
  styleUrls: ['./cartao-credito.page.scss'],
})
export class CartaoCreditoPage implements OnInit {

  private formCadastrarFormaPg: FormGroup;
  private cartaoCredito: CartoesCredito;
  private paramId: number = 0;
  @ViewChild('itemCartaoCredito') ionSliding: IonItemSliding;

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
    private activatedRoute: ActivatedRoute,
    private cartaoCreditoService: CartaoCreditoService
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
    this.paramId = this.activatedRoute.snapshot.params.idCartao;
    if(this.paramId > 0){
      this.cartaoCreditoService.getById(this.paramId)
      .then(resp => {
        this.cartaoCredito = resp;
        this.formCadastrarFormaPg.get('nroCartao').setValue(this.cartaoCredito.nroCartao);
        this.formCadastrarFormaPg.get('bandeira').setValue(this.cartaoCredito.bandeira);
        this.formCadastrarFormaPg.get('nomeTitular').setValue(this.cartaoCredito.nomeTitular);
        this.formCadastrarFormaPg.get('codSeguranca').setValue(this.cartaoCredito.codSeguranca);
        this.formCadastrarFormaPg.get('dtVencimento').setValue(this.cartaoCredito.dtVencimento);
        this.setDadosCodSeguranca(null, this.cartaoCredito.codSeguranca.toString());
        this.setDadosDtVencimento(null, this.cartaoCredito.dtVencimento.toString());
        this.setDadosNomeTitular(null, this.cartaoCredito.nomeTitular.toString());
        this.setDadosNroCartao(null, this.cartaoCredito.nroCartao.toString());
      })
      .catch(err => {
        this.exibirToast('Não foi possível encontrar seu cartão de crédito', 'close-circle');
        this.ionSliding.closeOpened()
        .then(() => {
          this.navCtrl.back();
        });
      })
    }
  }

  ionDidViewEnter(){
    this.statusBar.backgroundColorByHexString('#fff');
    this.statusBar.styleDefault();
  }

  setDadosNroCartao(event, value?: string){
    if(value){
      $('#txtNroCartao').text(value.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
    }else{
      let valor: string = event.target.value;
      $('#txtNroCartao').text(valor.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
    }
  }

  setDadosDtVencimento(event, value?: string){
    if(value){
      $('#txtDtVencimento').text(Utils.formatarDataDiaMes(value.slice(0, 10)));
    }else{
      let data: string = event.target.value;
      $('#txtDtVencimento').text(Utils.formatarDataDiaMes(data.slice(0, 10)));
    }
  }

  setDadosCodSeguranca(event, value?: string){
    if(value){
      $('#txtCodSeguranca').text(value);
    }else{
      $('#txtCodSeguranca').text(event.target.value);
    }
  }

  setDadosNomeTitular(event, value?: string){
    if(value){
      $('#txtNomeTitular').text(value);
    }else{
      $('#txtNomeTitular').text(event.target.value);
    }
  }

  onSubmit(){
    if(!this.formCadastrarFormaPg.valid){                      
      console.log(this.formCadastrarFormaPg.value);         
      this.exibirToast('Há erros no formulários. Tente novamente', 'close-circle');
    }else{
      let cartao: CartoesCredito = this.formCadastrarFormaPg.value;
      console.log(cartao);
      this.keyboard.hide();
      this.cartaoCreditoService.update(this.paramId, cartao)
      .then(resp => {
        console.log(resp);
        this.exibirToast('Cartão alterado com sucesso!', 'checkmark-circle');
      })
      .catch(err => {
        console.log(err);
        this.exibirToast(err, 'close-circle');  
      })
      this.navCtrl.navigateBack('menu-logado/perfil/formas-pagamento');
      
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
