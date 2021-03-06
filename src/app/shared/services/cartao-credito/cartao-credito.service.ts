import { Injectable } from '@angular/core';
import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { LoadingController } from '@ionic/angular';
import { FormaPagamentoService } from '../formas-pagamento/forma-pagamento.service';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  public quantidadeCartoesCredito: number = 0;
  public arrayCartoesCredito: CartoesCredito[] = [];
  private usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  constructor(
    private loadingController: LoadingController,
  ) { }

  create(cartao: CartoesCredito): Promise<CartoesCredito>{
    return new Promise(async (resolve, reject) => {
      this.usuarioLogado = null;
      this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      let obj = {
        bandeira: cartao.bandeira,
        codSeguranca: Number(cartao.codSeguranca),
        dtVencimento: cartao.dtVencimento,
        nomeTitular: cartao.nomeTitular.toLowerCase(),
        nroCartao: cartao.nroCartao,
        idUsuario: this.usuarioLogado['@id']
      }

      fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/cartoes_creditos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => {
        if(response.status == 201){
          this.getLast()
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
        }else{
          reject('Erro ao cadastrar cartão de crédido.');
        }
      })
      .catch(err => reject(err))
    });
  }

  getLast(): Promise<CartoesCredito>{
    return new Promise((resolve, reject) => {
      fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/cartoes_creditos')
      .then(resp => resp.json())
      .then(json => {
        let cartoesCredito = json['hydra:member'];
        resolve(cartoesCredito[cartoesCredito.length - 1]);
      })
      .catch(err => {
        reject(err);
        console.log(err);
      })
    })
  }

  update(id:number, cartao: CartoesCredito): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let obj = {
        bandeira: cartao.bandeira,
        codSeguranca: Number(cartao.codSeguranca),
        dtVencimento: cartao.dtVencimento,
        nomeTitular: cartao.nomeTitular,
        nroCartao: cartao.nroCartao,
        idUsuario: this.usuarioLogado['@id']
      }
      fetch(`https://hgt-events.herokuapp.com/api/cartoes_creditos/${id}` ,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => {
        if(response.status === 200){
          console.log(response);
          resolve('Cartão alterado com sucesso.');
        }else{
          reject('Erro ao editar cartão de crédito.');
        }
      })
      .catch(err => reject(err))
    });
  }

  delete(param): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Excluindo cartão de crédito...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });
      loading.present()
      .then(() => {
        fetch(`https://hgt-events.herokuapp.com/api/cartoes_creditos/${param.cartao.idCartao}` ,{
          method: 'delete'
        })
        .then(response => {
          if(response.status === 200){
            console.log(response);
            resolve('Cartão excluído com sucesso.');
            loading.dismiss();
          }else{
            reject('Erro ao excluir cartão');
            loading.dismiss();
          }
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    })
  }

  getById(id: number): Promise<CartoesCredito>{
    return new Promise((resolve, reject) => {
      fetch(`https://hgt-events.herokuapp.com/api/cartoes_creditos/${id}`)
      .then(resp => resp.json())
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }

  getAll(): Promise<CartoesCredito[]>{
    return new Promise((resolve, reject) => {
      fetch('https://hgt-events.herokuapp.com/api/cartoes_creditos')
      .then(resp => resp.json())
      .then(json => {
        this.arrayCartoesCredito = [];
        this.arrayCartoesCredito = json['hydra:member'];
        this.quantidadeCartoesCredito = this.arrayCartoesCredito.length;
      })
    })
  }
}
