import { Injectable } from '@angular/core';
import { Eventos } from '../../models/eventos/eventos';
// import moment from 'moment';
var moment = require('moment');

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
  

  getEventoByCategorias(categoria){
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
        id: 1,
        imagem: "../../../assets/events/gabriela-rocha/gabriela-rocha.png",
        artista: "Gabriela Rocha",
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
        classificacao_etaria: "livre",
        data_inicio_evento: "24/07/2019",
        data_fim_evento: "24/07/2019",
        data_inicio_vendas: "30/06/2019",
        data_inicio_evento_formatada: 'quarta-feira, 24 de julho de 2019',
        data_fim_evento_formatada: 'quarta-feira, 24 de julho de 2019',
        hora_inicio_evento: '19h',
        hora_fim_evento: '22h',
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
        id: 2,
        imagem: "../../../assets/events/foo-fighters/foo-fighters.png",
        artista: "Foo Fighters",
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
        classificacao_etaria: "14",
        data_inicio_evento: "20/11/2019",
        data_fim_evento: "20/11/2019",
        data_inicio_vendas: "01/09/2019",
        data_inicio_evento_formatada: 'quarta-feira, 20 de novembro de 2019',
        data_fim_evento_formatada: 'quarta-feira, 20 de novembro de 2019',
        hora_inicio_evento: '20h',
        hora_fim_evento: '23h',
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
        id: 3,
        imagem: "../../../assets/events/luccas-neto-os-aventureiros/luccas-neto-os-aventureiros.png",
        artista: "Luccas Neto com Os Aventureiros",
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
        classificacao_etaria: "livre",
        data_inicio_evento: "20/07/2019",
        data_fim_evento: "20/07/2019",
        data_inicio_vendas: "01/07/2019",
        data_inicio_evento_formatada: 'quarta-feira, 20 de junho de 2019',
        data_fim_evento_formatada: 'quarta-feira, 20 de julho de 2019',
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
      id: 4,
      imagem: "../../../assets/events/marcos-e-belluti/marcos-e-belluti.png",
      artista: "Marcos e Belutti",
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
      classificacao_etaria: "16",
      data_inicio_evento: "29/06/2019",
      data_fim_evento: "29/06/2019",
      data_inicio_vendas: "01/06/2019",
      data_inicio_evento_formatada: 'sábado, 26 de junho de 2019',
      data_fim_evento_formatada: 'sábado, 26 de junho de 2019',
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
      id: 5,
      imagem: "../../../assets/events/sandy-e-junior/sandy-e-junior.png",
      artista: "Sandy & Junior",
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
      classificacao_etaria: "16",
      data_inicio_evento: "12/10/2019",
      data_fim_evento: "12/10/2019",
      data_inicio_vendas: "01/07/2019",
      data_inicio_evento_formatada: 'sábado, 12 de outubro de 2019',
      data_fim_evento_formatada: 'sábado, 12 de outubro de 2019',
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
      id: 6,
      imagem: "../../../assets/events/improvavel/improvavel.jpeg",
      artista: "Improvável",
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
      classificacao_etaria: "14",
      data_inicio_evento: "23/08/2019",
      data_fim_evento: "24/06/2019",
      data_inicio_vendas: "01/07/2019",
      data_inicio_evento_formatada: 'sexta, 23 de agosto de 2019',
      data_fim_evento_formatada: 'sábado, 24 de agosto de 2019',
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
