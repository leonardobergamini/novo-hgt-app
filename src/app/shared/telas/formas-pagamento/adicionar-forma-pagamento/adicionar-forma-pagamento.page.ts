import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as $ from 'jquery';
import { FormasPagamento } from 'src/app/shared/models/formas-pagamento/formas-pagamento';
import { AdicionarFormasPagamentoService } from 'src/app/shared/services/formas-pagamento/adicionar-formas-pagamento.service';
import { Utils } from 'src/app/shared/utils/utils';
import { CartoesCredito } from 'src/app/shared/models/cartoes-credito/cartoes-credito';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';

@Component({
  selector: 'app-adicionar-forma-pagamento',
  templateUrl: './adicionar-forma-pagamento.page.html',
  styleUrls: ['./adicionar-forma-pagamento.page.scss'],
})
export class AdicionarFormaPagamentoPage implements OnInit {

  formCadastrarFormaPg: FormGroup;

  mensagensValidacao = {
    'nroCartao': [
      {type: 'minlength', message: 'O número do cartão não pode ser menor que 16 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece de informar o número do cartão.'}
    ],

    'dtValidade': [
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
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private toastController: ToastController,
    private statusBar: StatusBar,
    private adicionarFormaPagamento: AdicionarFormasPagamentoService
  ) { 
    this.formCadastrarFormaPg = formBuilder.group({
      nroCartao: ['', Validators.compose([Validators.required, Validators.minLength(16)])],
      dtValidade: ['', Validators.required],
      codSeguranca: ['', Validators.compose([Validators.maxLength(3), Validators.required])],
      nomeTitular: ['', Validators.compose([Validators.maxLength(20), Validators.required, Validators.pattern('[a-zA-Z ]*')])]
    });
  }

  ngOnInit() {
    this.statusBar.styleDefault();
  }

  setDadosNroCartao(event){
    let valor: string = event.target.value;
    $('#txtNroCartao').text(valor.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
  }

  setDadosDtValidade(event){
    let data: string = event.target.value;
    $('#txtDtValidade').text(Utils.formatarDataDiaMes(data.slice(0, 10)));
    //this.formCadastrarFormaPg.get('dtValidade').setValue(Utils.formatarDataDiaMes(data.slice(0, 10)));
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
      this.adicionarFormaPagamento.adicionar(new Usuarios(), cartao)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
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
