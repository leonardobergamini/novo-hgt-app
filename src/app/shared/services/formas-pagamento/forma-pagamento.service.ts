import { Injectable } from '@angular/core';

import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Carteiras } from '../../models/carteiras/carteiras';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {


  constructor(
    private loadingController: LoadingController
  ) { }

  id: number = 1;

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
      bandeira_cartao: 'VISA'
    }
  ];

  formasPagamento: FormasPagamento[] = [];

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
          try{
            this.formasPagamento.push({
              cartao: cartaoCredito,
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

  // remover(id: number, formaPagamento?: FormasPagamento): Promise<string>{
  //   return Promise((resolve, reject) => {

  //   })
  // }
}
