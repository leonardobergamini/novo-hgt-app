import { Injectable } from '@angular/core';
import { CartoesCredito } from '../../models/cartoes-credito/cartoes-credito';
import { LoadingController } from '@ionic/angular';
import { Utils } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  constructor(
    private loadingController: LoadingController
  ) { }

  create(cartao: CartoesCredito): Promise<CartoesCredito>{
    return new Promise(async (resolve, reject) => {
      let obj = {
        bandeira: cartao.bandeiraCartao,
        // cartaoFormatado: Number(Utils.escondeNroCartao(cartao)),
        codSeguranca: cartao.codSegurancao,
        dtVencimento: cartao.dtVencimento,
        nomeTitular: cartao.nomeTitular,
        nroCartao: cartao.nroCartao,
        idUsuario: 'api/usuarios/1'
      }
      console.log(obj);
      fetch('https://hgt-events.herokuapp.com/api/cartoes_creditos/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => reject(err))
    });
  }
}
