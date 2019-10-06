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

  private id: number = 1;
  private arrayAllFormasPagamento: FormasPagamento[] = [];
  private cartaoCredito: CartoesCredito;
  private carteira: Carteiras;
  // private formasPagamento: FormasPagamento[] = [];
  private formaPagamentoAtiva: FormasPagamento;
  public quantidadeFormasPagamento: number = 0;
  private usuarioLogado;
  
  constructor(
    private loadingController: LoadingController,
    private cartaoCreditoService: CartaoCreditoService
  ) { }

  // private usuario: Usuarios = {
  //   id: 1,
  //   primeiroNome: 'leonardo',
  //   sobrenome: 'bergamini',
  //   cpf: '36980235800',
  //   cep: '02326000',
  //   cidade: 'são paulo',
  //   complemento: '',
  //   dtNascimento: '24/04/1995',
  //   email: 'leonardo@gmail.com',
  //   imgPerfil: '',
  //   logradouro: 'rua arley gilberto de araujo',
  //   numero: '04',
  //   senha: 'leonardo',
  //   telefone: '11940040876',
  //   uf: 'sp',
  //   usuario: 'berganardo'
  // }
  
  private cartoes: CartoesCredito[] = [
    {
      id: 1,
      nroCartao: 1234432114568765,
      codSeguranca: 456,
      dtVencimento: '09/23',
      nomeTitular: 'leonardo bergamini',
      usuario: this.usuarioLogado,
      bandeira: 'VISA',
      cartaoFormatado: 8765
    }
  ];

  public formasPagamento: FormasPagamento[] = [
    {
      cartao: this.cartoes[0],
      carteira: null,
      idFormaPg: this.id++,
      usuario: this.usuarioLogado,
      pagamento: true
    },
    {
      cartao: null,
      carteira: {
        idCarteira: 1,
        saldo: 300,
        usuario: this.usuarioLogado
      },
      idFormaPg: this.id++,
      usuario: this.usuarioLogado,
      pagamento: false
    }
  ];

  // getFormaPagamentoAtiva(): Promise<FormasPagamento>{
  //   return new Promise(async (resolve, reject) => {
  //     let loading = await this.loadingController.create({
  //       message: 'Carregando...',
  //       keyboardClose: true,
  //       showBackdrop: true,
  //       animated: true
  //     });

  //     loading.present()
  //     .then(() => {
  //       let idUsuario = this.usuarioLogado['@id'];
  //       fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idUsuario}`)
  //       .then(resp => resp.json())
  //       .then(todasFormas => {
  //         let formaPagamento = todasFormas['hydra:member'][0];

  //         fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${formaPagamento.idCartao}`)
  //         .then(resp => resp.json())
  //         .then(json => {
  //           this.cartaoCredito = json;
  //           let obj: FormasPagamento = {
  //             idFormaPg: formaPagamento.id,
  //             cartao: this.cartaoCredito,
  //             carteira: null,
  //             usuario: this.usuarioLogado,
  //             pagamento: true
  //           }
  //           resolve(obj);
  //           loading.dismiss();
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         })          
  //       })
  //       .catch(err =>{
  //         loading.dismiss();
  //         reject('Erro ao consultar forma de pagamento ativa.');
  //         console.log(err);
  //       })
  //     });
  //   });
  // }

  update(cartao: CartoesCredito): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Alterando forma de pagamento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        let obj = {
          bandeira: cartao.bandeira,
          codSeguranca: Number(cartao.codSeguranca),
          dtVencimento: cartao.dtVencimento,
          nomeTitular: cartao.nomeTitular.toLocaleLowerCase(),
          nroCartao: cartao.nroCartao,
          idUsuario: this.usuarioLogado['@id']
        }
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${cartao['@id']}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          if(resp.status == 200){
            debugger;
            resolve('Cartão de crédito alterado com sucesso.');
            loading.dismiss();

          }else{
            debugger;
            reject('Não foi possível alterar cartão de crédito.');
            loading.dismiss();

          }
        })
        .catch(err => {
          reject(err);
          console.log(err);
          loading.dismiss();
        })
        
      });
    });
  }

  create(cartao: any): Promise<string>{
    return new Promise(async (resolve, reject) => {
      // let obj = {
      //   bandeira: cartao.bandeira,
      //   cartaoFormatado: Number(Utils.escondeNroCartao(cartao)),
      //   codSegurancao: cartao.codSeguranca,
      //   dtVencimento: cartao.dtVencimento,
      //   nomeTitular: cartao.nomeTitular,
      //   nroCartao: cartao.nroCartao,
      //   idUsuario: this.usuarioLogado['@id']
      // }
      let loading = await this.loadingController.create({
        message: 'Cadastrando forma de pagamento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        this.cartaoCreditoService.create(cartao)
        .then(resp => {
          let obj = {
            idCartao: resp['@id'],
            idCarteira: 'api/carteiras/1',
            idUsuario: this.usuarioLogado['@id']
          }
          console.log(resp);
          fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/formas_pagamentos', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(obj)
          })
          .then(response => {
            console.log(response);
            resolve('Forma de pagamento cadastrada com sucesso');
            loading.dismiss();
          })
          .catch(err => {
            reject(err);
            loading.dismiss();
          })
        })
        .catch(err => {
          console.log(err);
          loading.dismiss()
        });
      });
    });
  }

  getAll(): Promise<any>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Buscando suas formas de pagamento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        this.usuarioLogado = null;
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        let idUsuario = this.usuarioLogado['@id'];
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idUsuario}`)
        .then(resp => resp.json())
        .then(json => {
          let formasPagamento = json['formaspagamento'];

          if(formasPagamento.length > 0){
            let idForma = formasPagamento[0]['@id'];
            fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idForma}`)
            .then(resp => resp.json())
            .then(json => {
              let idCartao = json['idCartao'];

              fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idCartao}`)
              .then(resp => resp.json())
              .then(json => {
                let cartao = json;
                let obj = {
                  usuario: this.usuarioLogado,
                  id: idForma,
                  cartao: cartao,
                  carteira: null,
                  pagamento: true
                }
                resolve(obj);
                loading.dismiss();
              })
            })
            .catch(err => {
              console.log(err);
              loading.dismiss();
            })
          }else{
            let formaPagamentoVazia;
            resolve(formaPagamentoVazia);
            loading.dismiss();
          }

          // this.formasPagamento = todasFormas['hydra:member'];
          // let formaPagamento = todasFormas['hydra:member'][0];

          // fetch(`https://hgt-events.herokuapp.com${formaPagamento.idCartao}`)
          // .then(resp => resp.json())
          // .then(json => {
          //   this.cartaoCredito = json;
          //   let obj: FormasPagamento = {
          //     idFormaPg: formaPagamento.id,
          //     cartao: this.cartaoCredito,
          //     carteira: null,
          //     usuario: this.usuarioLogado,
          //     pagamento: true
          //   }
          //   // this.arrayAllFormasPagamento = [];
          //   // this.arrayAllFormasPagamento.push(obj);
          //   resolve(obj);
          //   loading.dismiss();
          // })
          // .catch(err => {
          //   console.log(err);
          // })          
        })
        .catch(err =>{
          console.log(err);
          reject('Erro ao consultar formas de pagamento');
          loading.dismiss();
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
              carteira: {
                idCarteira: 1,
                saldo: 300,
                usuario: this.usuarioLogado
              },
              idFormaPg: this.id++,
              usuario: this.usuarioLogado,
              pagamento: false
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
