import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExplorarService {

  eventos: any[];
  constructor() { }

  getAllEventos(){
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
        data_publicacao: "29/06/2019",
        descricao: "É uma cantora brasileira de música cristã contemporânea.",
        produtor:{
          id: 1,
          nome: "Nome Produtor",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "12.234.432/0001-09"
        },
        categorias: ["show", "gospel", "cristã"]
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
        data_publicacao: "29/06/2019",
        descricao: "Foo Fighters, é uma banda de rock dos Estados Unidos formada pelos ex-Nirvana Dave Grohl e Pat Smear em 1994.",
        produtor:{
          id: 1,
          nome: "Nome Produtor",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "12.234.432/0001-09"
        },
        categorias: ["show", "rock", "internacional"]
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
        data_publicacao: "29/06/2019",
        descricao: "Luccas Neto com Os Aventureiros.",
        produtor:{
          id: 2,
          nome: "Eda Shows e Eventos Ltda",
          cidade: "São Paulo",
          uf: "SP",
          cnpj: "13.180.837/0001-01"
        },
        categorias: ["stand-up", "infantil"]
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
      data_publicacao: "01/06/2019",
      descricao: "Marcos & Belutti é uma dupla sertaneja formada pelos amigos Leonardo Prado de Souza, mais conhecido como Marcos, e Bruno Belucci Pereira, mais conhecido como Belutti.",
      produtor:{
        id: 1,
        nome: "Nome Produtor",
        cidade: "São Paulo",
        uf: "SP",
        cnpj: "12.234.432/0001-09"
      },
      categorias: ["show", "sertanejo", "universitário"]
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
    data_publicacao: "29/06/2019",
    descricao: "Devido ao grande sucesso e procura de fãs, a Live Nation, junto de Sandy e Junior Lima, informam que a cidade de São Paulo irá receber mais dois extras da turnê “Nossa História”.",
    produtor:{
      id: 1,
      nome: "Nome Produtor",
      cidade: "São Paulo",
      uf: "SP",
      cnpj: "12.234.432/0001-09"
    },
    categorias: ["show", "pop"]
  }
  ]
  }
}
