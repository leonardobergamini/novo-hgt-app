import { Injectable } from '@angular/core';

import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Carteiras } from '../../models/carteiras/carteiras';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CartaoCreditoService } from '../cartao-credito/cartao-credito.service';
import { Utils } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  constructor(
    private loadingController: LoadingController,
    private cartaoCreditoService: CartaoCreditoService
  ) { }

  private id: number = 1;
  private arrayAllFormasPagamento: FormasPagamento[] = [];
  private cartaoCredito: CartoesCredito[] = [];
  private carteira: Carteiras;
  private formasPagamento: FormasPagamento[] = [];
  
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
      codSeguranca: 456,
      dtVencimento: '09/23',
      nomeTitular: 'leonardo bergamini',
      usuario: this.usuario,
      bandeira: 'VISA',
      cartaoFormatado: 8765
    }
  ];

  // formasPagamento: FormasPagamento[] = [
  //   {
  //     cartao: this.cartoes[0],
  //     carteira: new Carteiras(),
  //     idFormaPg: this.id++,
  //     usuario: this.usuario
  //   }
  // ];

  create(cartao: CartoesCredito, idUsuario: string, idCarteira: string): Promise<FormasPagamento>{
    return new Promise(async (resolve, reject) => {
      debugger;
      let obj = {
        bandeira: cartao.bandeira,
        cartaoFormatado: Number(Utils.escondeNroCartao(cartao)),
        codSegurancao: cartao.codSeguranca,
        dtVencimento: cartao.dtVencimento,
        nomeTitular: cartao.nomeTitular,
        nroCartao: cartao.nroCartao,
        idUsuario: 'api/usuarios/1'
      }
      let loading = await this.loadingController.create({
        message: 'Cadastrando forma de pagamento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      // let obj = {
      //   "idCartao": idCartao,
      //   "idCarteira": 'api/carteiras/1',
      //   "idUsuario": 'api/usuarios/1'
      // }
      
      this.cartaoCreditoService.create(cartao)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      })

      // fetch('https://hgt-events.herokuapp.com/api/formas_pagamentos', {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(obj)
      // })
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(err => reject(err))
      // .finally(() => loading.dismiss());
    });
  }

  getAll(): Promise<FormasPagamento[]>{
    return new Promise(async (resolve, reject) => {
      
      let loading = await this.loadingController.create({
        message: 'Buscando suas formas de pagamento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        debugger;
        fetch('https://hgt-events.herokuapp.com/api/formas_pagamentos')
        .then(resp => resp.json())
        .then(json => {
          debugger;
          this.formasPagamento = json['hydra:member'];
          this.formasPagamento.forEach((item:any) => {
            
            fetch(`https://hgt-events.herokuapp.com${item.idCartao}`)
            .then(resp => resp.json())
            .then(jsonCartao => {            
              let idCarteira = json['hydra:member'][0].idCarteira;
              fetch(`https://hgt-events.herokuapp.com${idCarteira}`)
              .then(resp => resp.json())
              .then(json => {
                this.carteira = json;
                this.cartaoCredito.push(jsonCartao);
                let obj = {
                  idFormaPg: item.id,
                  cartao: this.cartaoCredito[0],
                  carteira: this.carteira,
                  usuario: this.usuario
                }
                this.arrayAllFormasPagamento = [];
                this.arrayAllFormasPagamento.push(obj);
                resolve(this.arrayAllFormasPagamento);
                loading.dismiss();
              })
              .catch(err => {
                console.log(err);
                reject('Erro ao consultar sua carteira.');
              });
            })
            .catch(err => {
              console.log(err);
              reject('Erro ao consultar seus cartões');
            })
          });         
        })
        .catch(err =>{
          loading.dismiss();
          reject('Erro ao consultar formas de pagamento');
          console.log(err);
        })
      });
    });
  }

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
