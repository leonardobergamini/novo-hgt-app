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
    let usuarioFormatado: any;
    return usuarioFormatado = {
      id: 0,
      primeiroNome: user.primeiro_nome,
      sobrenome: user.sobrenome,
      email: user.email,
      senha: user.senha,
      cep: 'null',
      cidade: 'null',
      complemento: 'null',
      cpf: 'null',
      dtNascimento: '1900-01-01',
      imgPerfil: 'null',
      logradouro: 'null',
      numero: 'null',
      telefone: 'null',
      uf: 'null',
      usuario: 'null'
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
    cartao.bandeiraCartao = 'MASTERCARD';
    cartao.cartaoFormatado = Number(cartao.nroCartao.toString().substr(12, 4));
    return cartao;
  }
}
