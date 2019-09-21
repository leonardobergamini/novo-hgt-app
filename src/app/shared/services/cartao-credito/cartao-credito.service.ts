import { Injectable } from '@angular/core';
import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  public quantidadeCartoesCredito: number = 0;
  public arrayCartoesCredito: CartoesCredito[] = [];

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
        idUsuario: 'api/usuarios/1'
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

//   getAll(): Promise<CartoesCredito[]>{
//     return new Promise((resolve, reject) => {
//       fetch('https://hgt-events.herokuapp.com/api/cartoes_creditos')
//       .then(resp => resp.json())
//       .then(json => {
//         debugger;
//         this.arrayCartoesCredito = json['hydra:member'];
//         this.arrayCartoesCredito = [];
//         this.quantidadeCartoesCredito = this.arrayCartoesCredito.length;
//       })
//     })
//   }
}
