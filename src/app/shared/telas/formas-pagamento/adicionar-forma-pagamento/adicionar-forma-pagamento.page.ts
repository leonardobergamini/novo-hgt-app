import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormasPagamento } from 'src/app/shared/models/formas-pagamento/formas-pagamento';
import { AdicionarFormasPagamentoService } from 'src/app/shared/services/formas-pagamento/adicionar-formas-pagamento.service';

@Component({
  selector: 'app-adicionar-forma-pagamento',
  templateUrl: './adicionar-forma-pagamento.page.html',
  styleUrls: ['./adicionar-forma-pagamento.page.scss'],
})
export class AdicionarFormaPagamentoPage implements OnInit {

  formCadastrarFormaPg: FormGroup;

  constructor(formBuilder: FormBuilder) { 
    this.formCadastrarFormaPg = formBuilder.group({
      nroCartao: ['', Validators.required],
      dtValidade: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      codSeguranca: [''],
      nomeTitular: ['']
    });
  }

  ngOnInit() {
  }

  setDadosNroCartao(event){
    let valor: string = event.target.value;
    $('#txtNroCartao').text(valor.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
  }

  setDadosDtValidade(event){
    $('#txtDtValidade').text(event.target.value);
  }

  setDadosCodSeguranca(event){
    $('#txtCodSeguranca').text(event.target.value);
  }

  setDadosNomeTitular(event){
    $('#txtNomeTitular').text(event.target.value);
  }

  onSubmit(){
    
  }

}
