import { Injectable } from '@angular/core';
import { Anuncios } from '../../models/anuncios/anuncios';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(
    private loadingController: LoadingController
  ) { }

  getAllByEvento(idEvento: number){
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Carregando...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        let arrayAnuncios: Anuncios[] = [];
        fetch(`https://hgt-events.herokuapp.com/api/anuncios`)
        .then(resp => resp.json())
        .then(json => {
          let allAnuncios = json['hydra:member'];
          for(const anuncio of allAnuncios){
            fetch(`https://hgt-events.herokuapp.com${anuncio.idTicket}`)
            .then(resp => resp.json())
            .then(json => {
              let evento = json['idevento'];
              let ticket = json;
              if(evento.id === idEvento){
                let obj: Anuncios = {
                  id: anuncio.id,
                  isvendido: anuncio.isvendido,
                  preco: anuncio.preco,
                  ticket: ticket,
                  usuario: anuncio.idUsuario
                }

                arrayAnuncios.push(obj);
                resolve(arrayAnuncios);
                loading.dismiss();
                return;
              }
              loading.dismiss();
            })
            .catch(err => {
              reject(err);
              loading.dismiss();
            });
          }
        })
        .catch(err => {
          reject(err);
        })
      });

    });
  }

  getAll(): Promise<Anuncios[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Carregando seus anúncios...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        let idUsuario = 1;
        fetch(`https://hgt-events.herokuapp.com/api/usuarios/${idUsuario}`)
        .then(resp => resp.json())
        .then(json => {
  
          let response = json['anuncios'];
          resolve(response);
          loading.dismiss();
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        });
      })
    });
  }

  delete(anuncio): Promise<any>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Excluindo anúncio...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        fetch(`https://hgt-events.herokuapp.com/api/anuncios/${anuncio.id}`, {method: 'delete'})
        .then(resp => {
          resp.status == 204 || resp.status == 200 ? resolve(resp) : reject('Erro ao excluir anúncio.');
          loading.dismiss();
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    });
  }

  update(novoAnuncio): Promise<any>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Alterando anúncio...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        let obj = {
          preco: Number(novoAnuncio.novoValor)
        }
        fetch(`https://hgt-events.herokuapp.com/api/anuncios/${novoAnuncio.anuncio.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(resp => {
          resp.status == 204 || resp.status == 200 ? resolve(resp) : reject('Erro ao editar anúncio.');
          loading.dismiss();
        })
        .catch(err => {
          reject(err);
          loading.dismiss();
        })
      });
    });
  }
}
