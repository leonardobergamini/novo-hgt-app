import { Injectable } from '@angular/core';
import { Anuncios } from '../../models/anuncios/anuncios';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RevenderService {

  private usuarioLogado;

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
        debugger;
        this.usuarioLogado = null;
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        let obj = {
            preco: anuncio.preco,
            idUsuario: this.usuarioLogado['@id'],
            idTicket: `api/tickets/${anuncio.ticket.id}`,
            isVendido: false,
        }

        fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/anuncios',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          if(resp.status == 201 || resp.status == 200 || resp.status == 204){
            let obj = {
              isanunciado: true
            }
            fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/tickets/${anuncio.ticket.id}`, 
            {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)
            })
            .then(resp => {
              if(resp.status == 200){
                resolve('Anúncio criado com sucesso.');
                loading.dismiss();
              }else{
                reject('Não conseguimos criar seu anúncio.');
                loading.dismiss();
              }
            })
            .catch(err => {
              reject(err);
              loading.dismiss();
            })
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
