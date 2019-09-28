import { Injectable } from '@angular/core';
import { Anuncios } from '../../models/anuncios/anuncios';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RevenderService {

  constructor(
    private loadingController: LoadingController
  ) { }

  create(anuncio): Promise<string>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Criando anúncio...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true,
        duration: 2000
      });

      loading.present()
      .then(() => {
        let obj = {
            preco: anuncio.preco,
            idUsuario: "api/usuarios/1",
            idTicket: `api/tickets/${anuncio.ticket.id}`,
            isVendido: false
        }

        fetch('https://hgt-events.herokuapp.com/api/anuncios',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          if(resp.status == 201 || resp.status == 200 || resp.status == 204){
            resolve('Anúncio criado com sucesso.');
            loading.dismiss();
          }else{
            reject('Não foi possível criar o anúncio.');
            loading.dismiss();
          }
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        });
      })
    });
  }
}
