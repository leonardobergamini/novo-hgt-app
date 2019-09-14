import { Injectable } from '@angular/core';

import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Carteiras } from '../../models/carteiras/carteiras';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  constructor(
    private loadingController: LoadingController
  ) { }

  private id: number = 1;
  
  usuario: Usuarios = {
    id: 1,
    primeiroNome: 'leonardo',
    sobrenome: 'bergamini',
    cpf: '36980235800',
    cep: '02326000',
    cidade: 'são paulo',
    complemento: '',
    dtNascimento: '24/04/1995',
    email: 'leonardo@gmail.com',
    imgPerfil: '',
    logradouro: 'rua arley gilberto de araujo',
    numero: '04',
    senha: 'leonardo',
    telefone: '11940040876',
    uf: 'sp',
    usuario: 'berganardo'
  }
  
  cartoes: CartoesCredito[] = [
    {
      idCartao: 1,
      nroCartao: 1234432114568765,
      codSegurancao: 456,
      dtVencimento: '09/23',
      nomeTitular: 'leonardo bergamini',
      usuario: this.usuario,
      bandeiraCartao: 'VISA',
      cartaoFormatado: 8765
    }
  ];

formasPagamento: FormasPagamento[] = [
  {
    cartao: this.cartoes[0],
    carteira: new Carteiras(),
    idFormaPg: this.id++,
    usuario: this.usuario
  }
];

  adicionar(usuario: Usuarios, cartaoCredito: CartoesCredito, carteira?: Carteiras): Promise<FormasPagamento[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Cadastrando...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });
      loading.present()
      .then(() => {
        let cartaoFormatado = {...cartaoCredito, cartaoFormatado: Number(cartaoCredito.nroCartao.toString().slice(-4))};
          try{
            this.formasPagamento.push({
              cartao: cartaoFormatado,
              carteira: carteira,
              idFormaPg: this.id++,
              usuario: this.usuario
            });
            resolve(this.formasPagamento)
            loading.dismiss();
          }catch(err){
            loading.dismiss();
            reject('Erro ao cadastrar nova forma de pagamento. Tente novamente.');
          }
        });
    });
  }

  consultar(): Promise<FormasPagamento[]>{
    return new Promise((resolve, reject) => {
      if(this.formasPagamento){
        resolve(this.formasPagamento);
      }else{
        reject(new Array<FormasPagamento>());
      }
    });
  }

  remover(id: number): Promise<string>{
    return new Promise((resolve, reject) => {
      this.formasPagamento.forEach((value, i) => {
        this.formasPagamento.splice(i, 1);
      });
      resolve('Forma de pagamento excluida com sucesso.');
    });
  }

  ocultaNroCartao(nro: number): string{
    console.log(nro.toString().trim().slice(-4));
    // return nro.substring(12,16);
    return '';
  }
}
