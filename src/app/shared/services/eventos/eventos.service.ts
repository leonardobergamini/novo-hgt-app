import { Injectable } from '@angular/core';

import { Eventos } from '../../models/eventos/eventos';
import { Utils } from '../../utils/utils'
import * as moment from 'moment';
import { Setores } from '../../models/setores/setores';
import { LoadingController } from '@ionic/angular';
import { Categorias } from '../../models/categorias/categorias';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private id: number = 0;
  private allEventos: Eventos[] = null;
  eventos: Eventos[];
  eventosFiltrados: Eventos[] = [];
  eventoNovos: Eventos[] = [];
  
  constructor(
    private loadingController: LoadingController
  ){ }
  
  // setores: Setores[] = [
  //   {
  //     id: this.id++,
  //     capacidadeMax: 200,
  //     local: {
  //       id: 1,
  //       nome: 'Teatro Riachuelo',
  //       uf: 'RN',
  //       cidade: 'Natal',
  //       endereco: 'Av. Arnaldo Antunes, 905',
  //       bairro: 'Centro',
  //       cep: '09876-900',
  //       capacidade_max: 10000
  //     },
  //     nome: 'SETOR A',
  //     preco: 20
  //   },
  //   {
  //     id: this.id++,
  //     capacidadeMax: 400,
  //     local: {
  //       id: 1,
  //       nome: 'Teatro Riachuelo',
  //       uf: 'RN',
  //       cidade: 'Natal',
  //       endereco: 'Av. Arnaldo Antunes, 905',
  //       bairro: 'Centro',
  //       cep: '09876-900',
  //       capacidade_max: 10000
  //     },
  //     nome: 'SETOR B',
  //     preco: 50
  //   },
  //   {
  //     id: this.id++,
  //     capacidadeMax: 300,
  //     local: {
  //       id: 1,
  //       nome: 'Teatro Riachuelo',
  //       uf: 'RN',
  //       cidade: 'Natal',
  //       endereco: 'Av. Arnaldo Antunes, 905',
  //       bairro: 'Centro',
  //       cep: '09876-900',
  //       capacidade_max: 10000
  //     },
  //     nome: 'SETOR C',
  //     preco: 60
  //   },
  //   {
  //     id: this.id++,
  //     capacidadeMax: 100,
  //     local: {
  //       id: 1,
  //       nome: 'Teatro Riachuelo',
  //       uf: 'RN',
  //       cidade: 'Natal',
  //       endereco: 'Av. Arnaldo Antunes, 905',
  //       bairro: 'Centro',
  //       cep: '09876-900',
  //       capacidade_max: 10000
  //     },
  //     nome: 'SETOR D',
  //     preco: 100
  //   }    
  // ];

  // getEventoByArtista(artista: string){
  //   this.eventos = this.getAllEventos();
  
  //   if(artista){
  //     return this.eventos.filter((evento: Eventos) =>{
  //         return evento.atracao.nome.trim().toLowerCase().includes(artista.trim().toLowerCase());
  //     });
  //   }else{
  //     throw new Error('Informe um artista para pesquisar.');
  //   }
  // }

  getEventoByQuery(query: string): Eventos[]{
    this.eventos = this.allEventos;
    if(query){
      return this.eventos.filter((evento) =>{ 
        debugger;
        return  JSON.stringify(evento.nome + JSON.stringify(evento.idcategoria)).trim().toLowerCase().includes(query.trim().toLowerCase())
      });
    }else{
      throw new Error('Informe um termo para pesquisar.');
    }
  }

  getEventoByCategorias(categoria:string){
    let todosEventos = this.allEventos;
    this.eventosFiltrados = [];

    todosEventos.filter((evento: Eventos) =>{
      evento.idcategoria.nome == categoria ? this.eventosFiltrados.push(evento) : null;
    });

    return this.eventosFiltrados;
  }

  // getNovosEventos(){
  //   this.eventoNovos = new Array();
  //   this.eventos = this.getAllEventos();
    
  //   this.eventos.filter((evento: Eventos) =>{
  //     let hoje = moment().locale('pt-br');
  //     let dtPublicacao = moment(Utils.formatarDataEUA(evento.dtPublicacao)).locale('pt-br');
  //     hoje.isBetween(dtPublicacao.format(), dtPublicacao.add(15, 'day').format())
  //     ? this.eventoNovos.push(evento) : null;   
  //   });
    
  //   return this.eventoNovos;
  // }

  getAllEventos(): Promise<Eventos[]>{
    return new Promise(async (resolve, reject) => {
      let loading = await this.loadingController.create({
        message: 'Buscando eventos...',
        keyboardClose: true,
        showBackdrop: true,
        animated: true
      });

      loading.present()
      .then(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://hgt-events.herokuapp.com/api/eventos')
        .then(resp => resp.json())
        .then(json => {
          loading.dismiss();
          this.allEventos = json['hydra:member'];
          resolve(this.allEventos);
        })
        .catch(err => {
          loading.dismiss();
          reject(err);
        })
      });
    });
  }

  // getCategoriaByEvento(id: string): Promise<Categorias>{
  //   return new Promise((resolve, reject) => {
  //     this.allEventos.forEach(value => {
  //       fetch(`https://hgt-events.herokuapp.com/api/categorias/${}`)
  //       .then(resp => {

  //       })
  //       .catch(err => {
  //         console.log(err);
  //         reject(err);
  //       })
  //     });
  //   });
  // }

  // getAllEventos(): Eventos[]{
  //   return this.eventos = [
  //     {
  //       id: 1,
  //       imagem: '../../../assets/events/gabriela-rocha/gabriela-rocha.png',
  //       atracao: {
  //         id_atracao: 1,
  //         nome: 'Gabriela Rocha',
  //         rede_sociais: `
  //         facebook: 'www.facebook.com.br',
  //         instagram: 'www.instagram.com',
  //         youtube: 'www.youtube.com.br'
  //         `
  //       },
  //       setores: this.setores,
  //       faixaEtaria: {
  //         id_faixa_etaria: 1,
  //         nome: 'livre',
  //         descricao: ''
  //       },
  //       dtInicioEvento: '24/07/2019',
  //       dtFimEvento: '24/07/2019',
  //       dtInicioVendas: '30/06/2019',
  //       dtInicioEventoFormatada: 'quarta-feira, 24 de julho de 2019',
  //       dtFimEventoFormatada: 'quarta-feira, 24 de julho de 2019',
  //       horaInicioEvento: '19h',
  //       horaFimEvento: '22h',
  //       visualizacoes: '0',
  //       dtPublicacao: '10/06/2019',
  //       descricao: 'É uma cantora brasileira de música cristã contemporânea.',
  //       produtor:{
  //         id: 1,
  //         nome: 'Nome Produtor',
  //         cidade: 'São Paulo',
  //         uf: 'SP',
  //         cnpj: '12.234.432/0001-09'
  //       },
  //       categorias: [
  //         {
  //           id: 1,
  //           nome: 'show'
  //         },
  //         {
  //           id: 2,
  //           nome: 'cristão'
  //         },
  //         {
  //           id: 3,
  //           nome: 'gospel'
  //         }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       imagem: '../../../assets/events/foo-fighters/foo-fighters.png',
  //       atracao: {
  //         id_atracao: 2,
  //         nome:  'Foo Fighters',
  //         rede_sociais: `
  //         facebook: 'www.facebook.com.br',
  //         instagram: 'www.instagram.com',
  //         youtube: 'www.youtube.com.br'
  //         `
  //       },
  //       setores: this.setores,
  //       faixaEtaria: {
  //         id_faixa_etaria: 2,
  //         nome: '14',
  //         descricao: ''
  //       },
  //       dtInicioEvento: '20/11/2019',
  //       dtFimEvento: '20/11/2019',
  //       dtInicioVendas: '01/09/2019',
  //       dtInicioEventoFormatada: 'quarta-feira, 20 de novembro de 2019',
  //       dtFimEventoFormatada: 'quarta-feira, 20 de novembro de 2019',
  //       horaInicioEvento: '20h',
  //       horaFimEvento: '23h',
  //       visualizacoes: '0',
  //       dtPublicacao: '30/06/2019',
  //       descricao: 'Foo Fighters, é uma banda de rock dos Estados Unidos formada pelos ex-Nirvana Dave Grohl e Pat Smear em 1994.',
  //       produtor:{
  //         id: 1,
  //         nome: 'Nome Produtor',
  //         cidade: 'São Paulo',
  //         uf: 'SP',
  //         cnpj: '12.234.432/0001-09'
  //       },
  //       categorias: [
  //         {
  //           id: 1,
  //           nome: 'show'
  //         },
  //         {
  //           id: 4,
  //           nome: 'rock'
  //         },
  //         {
  //           id: 5,
  //           nome: 'internacional'
  //         }
  //       ]
  //     },
  //     {
  //       id: 3,
  //       imagem: '../../../assets/events/luccas-neto-os-aventureiros/luccas-neto-os-aventureiros.png',
  //       atracao: {
  //         id_atracao: 3,
  //         nome: 'Luccas Neto com Os Aventureiros',
  //         rede_sociais: `
  //         facebook: 'www.facebook.com.br',
  //         instagram: 'www.instagram.com',
  //         youtube: 'www.youtube.com.br'
  //         `
  //       },
  //       setores: this.setores,
  //       faixaEtaria: {
  //         id_faixa_etaria: 1,
  //         nome: 'livre',
  //         descricao: ''
  //       },
  //       dtInicioEvento: '20/07/2019',
  //       dtFimEvento: '20/07/2019',
  //       dtInicioVendas: '01/07/2019',
  //       dtInicioEventoFormatada: 'quarta-feira, 20 de junho de 2019',
  //       dtFimEventoFormatada: 'quarta-feira, 20 de julho de 2019',
  //       visualizacoes: '0',
  //       horaInicioEvento: '18h',
  //       horaFimEvento: '20h',
  //       dtPublicacao: '20/06/2019',
  //       descricao: 'Luccas Neto com Os Aventureiros.',
  //       produtor:{
  //         id: 2,
  //         nome: 'Eda Shows e Eventos Ltda',
  //         cidade: 'São Paulo',
  //         uf: 'SP',
  //         cnpj: '13.180.837/0001-01'
  //       },
  //       categorias: [
  //       {
  //         id: 6,
  //         nome: 'teatro'
  //       },
  //       {
  //         id: 7,
  //         nome: 'infantil'
  //       }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     imagem: '../../../assets/events/marcos-e-belluti/marcos-e-belluti.png',
  //     atracao: {
  //       id_atracao: 4,
  //       nome: 'Marcos e Belutti',
  //       rede_sociais: `
  //       facebook: 'www.facebook.com.br',
  //       instagram: 'www.instagram.com',
  //       youtube: 'www.youtube.com.br'
  //       `
  //     },
  //     setores: this.setores,
  //     faixaEtaria: {
  //       id_faixa_etaria: 3,
  //       nome: '16',
  //       descricao: ''
  //     },
  //     dtInicioEvento: '29/06/2019',
  //     dtFimEvento: '29/06/2019',
  //     dtInicioVendas: '01/06/2019',
  //     dtInicioEventoFormatada: 'sábado, 26 de junho de 2019',
  //     dtFimEventoFormatada: 'sábado, 26 de junho de 2019',
  //     visualizacoes: '0',
  //     horaInicioEvento: '21h',
  //     horaFimEvento: '00h',
  //     dtPublicacao: '01/07/2019',
  //     descricao: 'Marcos & Belutti é uma dupla sertaneja formada pelos amigos Leonardo Prado de Souza, mais conhecido como Marcos, e Bruno Belucci Pereira, mais conhecido como Belutti.',
  //     produtor:{
  //       id: 1,
  //       nome: 'Nome Produtor',
  //       cidade: 'São Paulo',
  //       uf: 'SP',
  //       cnpj: '12.234.432/0001-09'
  //     },
  //     categorias: [
  //       {
  //         id: 1,
  //         nome: 'show'
  //       },
  //       {
  //         id: 8,
  //         nome: 'sertanejo'
  //       },
  //       {
  //         id: 9,
  //         nome: 'universitário'
  //       }
  //     ]
  //   },
  //   {
  //     id: 5,
  //     imagem: '../../../assets/events/sandy-e-junior/sandy-e-junior.png',
  //     atracao: {
  //       id_atracao: 5,
  //       nome: 'Sandy & Junior',
  //       rede_sociais: `
  //       facebook: 'www.facebook.com.br',
  //       instagram: 'www.instagram.com',
  //       youtube: 'www.youtube.com.br'
  //       `
  //     },
  //     setores: this.setores,
  //     faixaEtaria: {
  //       id_faixa_etaria: 3,
  //       nome: '16',
  //       descricao: ''
  //     },
  //     dtInicioEvento: '12/10/2019',
  //     dtFimEvento: '12/10/2019',
  //     dtInicioVendas: '01/07/2019',
  //     dtInicioEventoFormatada: 'sábado, 12 de outubro de 2019',
  //     dtFimEventoFormatada: 'sábado, 12 de outubro de 2019',
  //     visualizacoes: '0',
  //     horaInicioEvento: '19h',
  //     horaFimEvento: '23h',
  //     dtPublicacao: '08/07/2019',
  //     descricao: 'Devido ao grande sucesso e procura de fãs, a Live Nation, junto de Sandy e Junior Lima, informam que a cidade de São Paulo irá receber mais dois extras da turnê “Nossa História”.',
  //     produtor:{
  //       id: 1,
  //       nome: 'Nome Produtor',
  //       cidade: 'São Paulo',
  //       uf: 'SP',
  //       cnpj: '12.234.432/0001-09'
  //     },
  //     categorias: [
  //       {
  //         id: 1,
  //         nome: 'show'
  //       },
  //       {
  //         id: 10,
  //         nome: 'pop'
  //       }
  //     ]
  //   },
  //   {
  //     id: 6,
  //     imagem: '../../../assets/events/improvavel/improvavel.jpeg',
  //     atracao: {
  //       id_atracao: 6,
  //       nome: 'Improvável',
  //       rede_sociais: `
  //       facebook: 'www.facebook.com.br',
  //       instagram: 'www.instagram.com',
  //       youtube: 'www.youtube.com.br'
  //       `
  //     },
  //     setores: this.setores,
  //     faixaEtaria: {
  //       id_faixa_etaria: 4,
  //       nome: '14',
  //       descricao: ''
  //     },
  //     dtInicioEvento: '23/08/2019',
  //     dtFimEvento: '24/06/2019',
  //     dtInicioVendas: '01/07/2019',
  //     dtInicioEventoFormatada: 'sexta, 23 de agosto de 2019',
  //     dtFimEventoFormatada: 'sábado, 24 de agosto de 2019',
  //     visualizacoes: '0',
  //     horaInicioEvento: '21h',
  //     horaFimEvento: '23h',
  //     dtPublicacao: '09/07/2019',
  //     descricao: `A Cia. Barbixas de Humor comemorou, em 2017, 10 anos de sucesso do IMPROVÁVEL, um espetáculo criado e apresentado pelo trio de humoristas Anderson Bizzocchi, Daniel Nascimento e Elidio Sanna (os Barbixas) que usa a improvisação como linguagem para a criação de jogos e de cenas artísticas de humor.
  //     Neste espetáculo teatral, um mestre de cerimônias apresenta as regras dos jogos, a plateia sugere os temas e os atores improvisam as cenas na hora e sem nenhuma preparação prévia. Assim, nunca uma apresentação é igual à outra - fazendo com que o público retorne sempre.`,
  //     produtor:{
  //       id: 1,
  //       nome: 'Nome Produtor',
  //       cidade: 'São Paulo',
  //       uf: 'SP',
  //       cnpj: '12.234.432/0001-09'
  //     },
  //     categorias: [
  //       {
  //         id: 1,
  //         nome: 'teatro'
  //       }
  //     ]
  //   }]
  // }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

}
