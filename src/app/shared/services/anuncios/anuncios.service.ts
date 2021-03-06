import { Injectable } from '@angular/core';
import { Anuncios } from '../../models/anuncios/anuncios';
import { LoadingController } from '@ionic/angular';
import { Usuarios } from '../../models/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  public arrayAnuncios: Anuncios[] = [];
  private arrayAllAnuncios = [];
  private usuarioLogado: Usuarios = JSON.parse(localStorage.getItem('usuarioLogado'));

  constructor(
    private loadingController: LoadingController
  ) { }

  // temAnuncios(idTicket): Promise<boolean>{
  //   return new Promise((resolve, reject) => {
      
  //     fetch('https://hgt-events.herokuapp.com/api/anuncios')
  //     .then(resp => resp.json())
  //     .then(json => {
  //       debugger;
  //       let arrayAllAnuncios = [];
  //       arrayAllAnuncios = json['hydra:member'];

  //       for(const anuncio of arrayAllAnuncios){
  //         debugger;
  //         if(anuncio.idTicket === idTicket){
  //           resolve(true)
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       debugger;
  //       reject(err);
  //     })

  //   });
  // }

  getAllByEvento(idEvento: number): Promise<Anuncios[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Carregando...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        this.arrayAnuncios = [];
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/anuncios`)
        .then(resp => resp.json())
        .then(async json => {
          let allAnuncios = json['hydra:member'];

          try{

            for(const anuncio of allAnuncios){
              await fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${anuncio.idTicket}`)
              .then(resp => resp.json())
              .then(json => {
                let evento = json['idevento'];
                let ticket = json;
                if(evento.id === idEvento){
                  let obj: Anuncios = {
                    id: anuncio.id,
                    isvendido: anuncio.isVendido,
                    preco: anuncio.preco,
                    ticket: ticket,
                    usuario: anuncio.idUsuario
                  }
                  this.arrayAnuncios.push(obj);
                }
              })
              .catch(err => {
                reject(err);
                loading.dismiss();
              });
            }
            loading.dismiss();
            resolve(this.arrayAnuncios);
          }
          catch(err){
            reject(err);
          }
        })
        .catch(err => {
          reject(err);
        });
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
        this.usuarioLogado = null;
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        let idUsuario = this.usuarioLogado['@id'];
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com${idUsuario}`)
        .then(resp => resp.json())
        .then(json => {
          let response = json['anuncios'];
          this.arrayAllAnuncios = [];
          this.arrayAllAnuncios = response;
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
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/anuncios/${anuncio.id}`, {method: 'delete'})
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

  finalizarAnuncio(idAnuncio: number): Promise<string>{
    return new Promise((resolve, reject) => {
      let obj = {
        isVendido: true,
      }
      fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/anuncios/${idAnuncio}`, 
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(resp => {
        debugger;
        if(resp.status == 200){
          resolve('Anúncio finalizado com sucesso.');
        }
        else{
          reject('Erro ao finalizar anúncio.');
        }
      })
      .catch(err => {
        debugger;
        reject(err);
        console.log(err);
      })
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
        fetch(`https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/anuncios/${novoAnuncio.anuncio.id}`, {
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
