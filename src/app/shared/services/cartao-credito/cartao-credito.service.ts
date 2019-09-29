import { Injectable } from '@angular/core';
import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  public quantidadeCartoesCredito: number = 0;
  public arrayCartoesCredito: CartoesCredito[] = [];
  private usuarioLogado = JSON.parse(localStorage.get('usuarioLogado'));
  constructor(
    private loadingController: LoadingController,
  ) { }

  create(cartao: CartoesCredito): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let obj = {
        bandeira: cartao.bandeira,
        codSeguranca: Number(cartao.codSeguranca),
        dtVencimento: cartao.dtVencimento,
        nomeTitular: cartao.nomeTitular,
        nroCartao: cartao.nroCartao,
        idUsuario: this.usuarioLogado['@id']
      }
      console.log(obj);
      fetch('https://hgt-events.herokuapp.com/api/cartoes_creditos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => {
        console.log(response);
        resolve('Cartão cadastrado com sucesso.');
      })
      .catch(err => reject(err))
    });
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
        debugger;
        fetch(`https://hgt-events.herokuapp.com/api/cartoes_creditos/${param.cartao.idCartao}` ,{
          method: 'delete'
        })
        .then(response => {
          debugger;
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
