import { ToastController, LoadingController } from '@ionic/angular';

import { Usuarios } from '../models/usuarios/usuarios';
import { Enderecos } from '../models/enderecos/enderecos';
import { CartoesCredito } from '../models/cartoes-credito/cartoes-credito';

export class Utils {
  private static toastController: ToastController;
    
  static formatarDataEUA(data: string): string{
    let _d: string[] = data.split('/');
    return `${_d[1]}-${_d[0]}-${_d[2]}`;
  }

  static formatarDataBR(data: string): string{
    let _d: string[] = data.split('-');
    return `${_d[2]}/${_d[1]}/${_d[0]}`;
  }

  static formatarDataDiaMes(data: string): string{
    let _d = this.formatarDataBR(data).split('/');
    return `${_d[1]}/${_d[2]}`;
  }

  static inicializaUsuario(user: any){
    debugger;
    let usuarioFormatado: any;
    return usuarioFormatado = {
      primeiroNome: user.primeiro_nome.toLowerCase(),
      sobrenome: user.sobrenome.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.senha,
      dtNascimento: "1994-12-15",
      cpf: "00000000000",
      telefone: "00000000000",
      logradouro: "null",
      numero: "0",
      complemento: "null",
      cep: "00000000",
      cidade: "null",
      uf: "null"
    }
  }

  static buscarEndereco(cep: string): Promise<Enderecos>{
    cep = cep.replace(/\D/g, '');
    return new Promise((resolve, reject) => {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(resp => resp.json())
      .then(json => {
        let endereco: Enderecos = json;
        resolve(endereco);
      })
      .catch(err => reject(err))
    });
  }

  static exibirToast(mensagem: string, icone: string){
    let toast;
    toast = this.toastController.create({
      color: 'dark',
      duration: 4000,
      message: `${mensagem}`,
      position: 'top',
      buttons: [
        {
          side: 'end',
          icon: `${icone}`,
          cssClass: 'success'
        }
      ]
    });    
    toast.present();
  }

  static escondeNroCartao(cartao: CartoesCredito){
    cartao.cartaoFormatado = Number(cartao.nroCartao.toString().substr(12, 4));
    return cartao;
  }
}
