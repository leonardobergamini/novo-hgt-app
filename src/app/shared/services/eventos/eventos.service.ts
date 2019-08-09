import { Injectable } from '@angular/core';
import { Eventos } from '../../models/eventos/eventos';
import * as moment from 'moment';
// var moment = require('moment');

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  eventos: Eventos[];
  eventosFiltrados: Eventos[] = [];
  eventoNovos: Eventos[] = [];
  
  constructor() { }

  formatarData(data: string): string{
    let _d: string[] = data.split('/');
    return `${_d[1]}-${_d[0]}-${_d[2]}`;
  }

  getEventoByArtista(artista: string){
    this.eventos = this.getAllEventos();
  
    if(artista){
      return this.eventos.filter((evento: Eventos) =>{
          return evento.atracao.nome.trim().toLowerCase().includes(artista.trim().toLowerCase());
      });
    }else{
      throw new Error('Informe um artista para pesquisar.');
    }
  }

  getEventoByQuery(query: string): Eventos[]{
    this.eventos = this.getAllEventos();

    if(query){
      return this.eventos.filter((evento) =>{ 
        return  JSON.stringify(evento.atracao.nome + JSON.stringify(evento.categorias)).trim().toLowerCase().includes(query.trim().toLowerCase())
      });
    }else{
      throw new Error('Informe um termo para pesquisar.');
    }
  }

  getEventoByCategorias(categoria:string){
      this.eventos = this.getAllEventos();
  
      this.eventos.filter((evento: Eventos) =>{
        evento.categorias.forEach((value, i) =>{
          value.nome == categoria ? this.eventosFiltrados.push(evento) : null;
        });
      });

      return this.eventosFiltrados; 
  }

  getNovosEventos(){
    this.eventoNovos = new Array();
    this.eventos = this.getAllEventos();
    
    this.eventos.filter((evento: Eventos) =>{
      let hoje = moment().locale('pt-br');
      let dataPublicacao = moment(this.formatarData(evento.data_publicacao)).locale('pt-br');
      hoje.isBetween(dataPublicacao.format(), dataPublicacao.add(15, 'day').format())
      ? this.eventoNovos.push(evento) : null;   
    });
    
    return this.eventoNovos;
  }

  getAllEventos(): Eventos[]{
    return this.eventos = [
      {
        id_evento: 1,
        imagem: "../../../assets/events/gabriela-rocha/gabriela-rocha.png",
        atracao: {
          id_atracao: 1,
          nome: "Gabriela Rocha",
          rede_sociais: `
          facebook: 'www.facebook.com.br',
          instagram: 'www.instagram.com',
          youtube: 'www.youtube.com.br'
          `
        },
        local: {
          id: 1,
          nome: "Teatro Riachuelo",
          uf: "RN",
          cidade: "Natal",
          endereco: "Av. Arnaldo Antunes, 905",
          bairro: "Centro",
          cep: "09876-900",
          capacidade_max: 10000        
        },
        faixa_etaria: {
          id_faixa_etaria: 1,
          nome: "livre",
          descricao: ""
        },
        dt_inicio_evento: "24/07/2019",
        dt_fim_evento: "24/07/2019",
        dt_inicio_vendas: "30/06/2019",
        dt_inicio_evento_formatada: 'quarta-feira, 24 de julho de 2019',
        dt_fim_evento_formatada: 'quarta-feira, 24 de julho de 2019',
        hora_inicio_evento: '19h',
        hora_fim_evento: '22h',
        visualizações: 0,
        data_publicacao: "10/06/2019",
        descricao: "É uma cantora brasileira de música cristã contemporânea.",
        produtor:{
          id: 1,
          nome: "Nome Produtor",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "12.234.432/0001-09"
        },
        categorias: [
          {
            id: 1,
            nome: "show"
          },
          {
            id: 2,
            nome: "cristão"
          },
          {
            id: 3,
            nome: "gospel"
          }
        ]
      },
      {
        id_evento: 2,
        imagem: "../../../assets/events/foo-fighters/foo-fighters.png",
        atracao: {
          id_atracao: 2,
          nome:  "Foo Fighters",
          rede_sociais: `
          facebook: 'www.facebook.com.br',
          instagram: 'www.instagram.com',
          youtube: 'www.youtube.com.br'
          `
        },
        local: {
          id: 3,
          nome: "Allianz Parque",
          uf: "SP",
          cidade: "São Paulo",
          endereco: "Av. Francisco Matarazzo, 1705",
          bairro: "Água Branca",
          cep: "05001-200",
          capacidade_max: 50000        
        },
        faixa_etaria: {
          id_faixa_etaria: 2,
          nome: "14",
          descricao: ''
        },
        dt_inicio_evento: "20/11/2019",
        dt_fim_evento: "20/11/2019",
        dt_inicio_vendas: "01/09/2019",
        dt_inicio_evento_formatada: 'quarta-feira, 20 de novembro de 2019',
        dt_fim_evento_formatada: 'quarta-feira, 20 de novembro de 2019',
        hora_inicio_evento: '20h',
        hora_fim_evento: '23h',
        visualizações: 0,
        data_publicacao: "30/06/2019",
        descricao: "Foo Fighters, é uma banda de rock dos Estados Unidos formada pelos ex-Nirvana Dave Grohl e Pat Smear em 1994.",
        produtor:{
          id: 1,
          nome: "Nome Produtor",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "12.234.432/0001-09"
        },
        categorias: [
          {
            id: 1,
            nome: "show"
          },
          {
            id: 4,
            nome: "rock"
          },
          {
            id: 5,
            nome: "internacional"
          }
        ]
      },
      {
        id_evento: 3,
        imagem: "../../../assets/events/luccas-neto-os-aventureiros/luccas-neto-os-aventureiros.png",
        atracao: {
          id_atracao: 3,
          nome: "Luccas Neto com Os Aventureiros",
          rede_sociais: `
          facebook: 'www.facebook.com.br',
          instagram: 'www.instagram.com',
          youtube: 'www.youtube.com.br'
          `
        },
        local: {
          id: 2,
          nome: "Espaço das Américas",
          uf: "SP",
          cidade: "São Paulo",
          endereco: "R. Tagipuru, 795",
          bairro: "Barra Funda",
          cep: "01156-000",
          capacidade_max: 30000   
        },
        faixa_etaria: {
          id_faixa_etaria: 1,
          nome: "livre",
          descricao: ''
        },
        dt_inicio_evento: "20/07/2019",
        dt_fim_evento: "20/07/2019",
        dt_inicio_vendas: "01/07/2019",
        dt_inicio_evento_formatada: 'quarta-feira, 20 de junho de 2019',
        dt_fim_evento_formatada: 'quarta-feira, 20 de julho de 2019',
        visualizações: 0,
        hora_inicio_evento: '18h',
        hora_fim_evento: '20h',
        data_publicacao: "20/06/2019",
        descricao: "Luccas Neto com Os Aventureiros.",
        produtor:{
          id: 2,
          nome: "Eda Shows e Eventos Ltda",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "13.180.837/0001-01"
        },
        categorias: [
        {
          id: 6,
          nome: "teatro"
        },
        {
          id: 7,
          nome: "infantil"
        }
      ]
    },
    {
      id_evento: 4,
      imagem: "../../../assets/events/marcos-e-belluti/marcos-e-belluti.png",
      atracao: {
        id_atracao: 4,
        nome: "Marcos e Belutti",
        rede_sociais: `
        facebook: 'www.facebook.com.br',
        instagram: 'www.instagram.com',
        youtube: 'www.youtube.com.br'
        `
      },
      local: {
        id: 5,
        nome: "Casa Brasil",
        uf: "RJ",
        cidade: "Rio de Janeiro",
        endereco: "Av. Francisco Rodrigues, 705",
        bairro: "Leblon",
        cep: "02000-320",
        capacidade_max: 20000        
      },
      faixa_etaria: {
        id_faixa_etaria: 3,
        nome: "16",
        descricao: ''
      },
      dt_inicio_evento: "29/06/2019",
      dt_fim_evento: "29/06/2019",
      dt_inicio_vendas: "01/06/2019",
      dt_inicio_evento_formatada: 'sábado, 26 de junho de 2019',
      dt_fim_evento_formatada: 'sábado, 26 de junho de 2019',
      visualizações: 0,
      hora_inicio_evento: '21h',
      hora_fim_evento: '00h',
      data_publicacao: "01/07/2019",
      descricao: "Marcos & Belutti é uma dupla sertaneja formada pelos amigos Leonardo Prado de Souza, mais conhecido como Marcos, e Bruno Belucci Pereira, mais conhecido como Belutti.",
      produtor:{
        id: 1,
        nome: "Nome Produtor",
        cidade: "São Paulo",
        uf: "SP",
        cnpj: "12.234.432/0001-09"
      },
      categorias: [
        {
          id: 1,
          nome: "show"
        },
        {
          id: 8,
          nome: "sertanejo"
        },
        {
          id: 9,
          nome: "universitário"
        }
      ]
    },
    {
      id_evento: 5,
      imagem: "../../../assets/events/sandy-e-junior/sandy-e-junior.png",
      atracao: {
        id_atracao: 5,
        nome: "Sandy & Junior",
        rede_sociais: `
        facebook: 'www.facebook.com.br',
        instagram: 'www.instagram.com',
        youtube: 'www.youtube.com.br'
        `
      },
      local: {
        id: 3,
        nome: "Allianz Parque",
        uf: "SP",
        cidade: "São Paulo",
        endereco: "Av. Francisco Matarazzo, 1705",
        bairro: "Água Branca",
        cep: "05001-200",
        capacidade_max: 50000          
      },
      faixa_etaria: {
        id_faixa_etaria: 3,
        nome: "16",
        descricao: ''
      },
      dt_inicio_evento: "12/10/2019",
      dt_fim_evento: "12/10/2019",
      dt_inicio_vendas: "01/07/2019",
      dt_inicio_evento_formatada: 'sábado, 12 de outubro de 2019',
      dt_fim_evento_formatada: 'sábado, 12 de outubro de 2019',
      visualizações: 0,
      hora_inicio_evento: '19h',
      hora_fim_evento: '23h',
      data_publicacao: "08/07/2019",
      descricao: "Devido ao grande sucesso e procura de fãs, a Live Nation, junto de Sandy e Junior Lima, informam que a cidade de São Paulo irá receber mais dois extras da turnê “Nossa História”.",
      produtor:{
        id: 1,
        nome: "Nome Produtor",
        cidade: "São Paulo",
        uf: "SP",
        cnpj: "12.234.432/0001-09"
      },
      categorias: [
        {
          id: 1,
          nome: "show"
        },
        {
          id: 10,
          nome: "pop"
        }
      ]
    },
    {
      id_evento: 6,
      imagem: "../../../assets/events/improvavel/improvavel.jpeg",
      atracao: {
        id_atracao: 6,
        nome: "Improvável",
        rede_sociais: `
        facebook: 'www.facebook.com.br',
        instagram: 'www.instagram.com',
        youtube: 'www.youtube.com.br'
        `
      },
      local: {
        id: 4,
        nome: "Teatro SESC Casa do Comércio",
        uf: "BA",
        cidade: "Salvador",
        endereco: "Av. Tancredo Neves, 1109",
        bairro: "Centro",
        cep: null,
        capacidade_max: 10000          
      },
      faixa_etaria: {
        id_faixa_etaria: 4,
        nome: "14",
        descricao: ''
      },
      dt_inicio_evento: "23/08/2019",
      dt_fim_evento: "24/06/2019",
      dt_inicio_vendas: "01/07/2019",
      dt_inicio_evento_formatada: 'sexta, 23 de agosto de 2019',
      dt_fim_evento_formatada: 'sábado, 24 de agosto de 2019',
      visualizações: 0,
      hora_inicio_evento: '21h',
      hora_fim_evento: '23h',
      data_publicacao: "09/07/2019",
      descricao: `A Cia. Barbixas de Humor comemorou, em 2017, 10 anos de sucesso do IMPROVÁVEL, um espetáculo criado e apresentado pelo trio de humoristas Anderson Bizzocchi, Daniel Nascimento e Elidio Sanna (os Barbixas) que usa a improvisação como linguagem para a criação de jogos e de cenas artísticas de humor.
      Neste espetáculo teatral, um mestre de cerimônias apresenta as regras dos jogos, a plateia sugere os temas e os atores improvisam as cenas na hora e sem nenhuma preparação prévia. Assim, nunca uma apresentação é igual à outra - fazendo com que o público retorne sempre.`,
      produtor:{
        id: 1,
        nome: "Nome Produtor",
        cidade: "São Paulo",
        uf: "SP",
        cnpj: "12.234.432/0001-09"
      },
      categorias: [
        {
          id: 1,
          nome: "teatro"
        }
      ]
    }]
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

}
