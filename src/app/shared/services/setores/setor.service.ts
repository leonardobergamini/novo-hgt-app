import { Injectable } from '@angular/core';
import { Setores } from '../../models/setores/setores';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private allSetores: Setores[] = [];
  private allSetoresByEvento: Setores[] = [];
  private setoresById: Setores[] = [];
  constructor(
    private loadingController: LoadingController
  ) { }

  getAllSetores(): Promise<Setores[]>{
    return new Promise(async (resolve, reject) => {
      fetch('https://hgt-events.herokuapp.com/api/setores')
        .then(resp => resp.json())
        .then(json => {
          console.log(json['hydra:member'])
          this.allSetores = [];
          resolve(this.allSetores = json['hydra:member']);
        })
        .catch(err => {
          console.log(err);
          reject('Erro ao consultar todos os setores.');
        })
    });
  }

  getSetoresByEvento(id: string): Promise<Setores[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Buscando setores para esse evento...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        fetch('https://hgt-events.herokuapp.com/api/setores')
        .then(resp => resp.json())
        .then(json => {
          console.log(json['hydra:member'])
          this.allSetoresByEvento = [];
          let arrayTmp = json['hydra:member'];
          this.allSetoresByEvento = arrayTmp.filter(setor => {
            return setor['@id'] === id;
          });
          resolve(this.allSetoresByEvento);
          loading.dismiss();
        })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          reject('Erro ao consultar setores.');
        })
      })
    });
  }
}
