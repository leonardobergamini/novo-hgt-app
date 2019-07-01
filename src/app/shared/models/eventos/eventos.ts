import { Locais } from '../locais/locais';
import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';

export class Eventos {
    id: number;
    imagem: string;
    artista: string;
    classificacao_etaria: string;
    data_inicio_evento: string;
    data_fim_evento: string;
    data_inicio_vendas: string;
    data_publicacao: string;
    descricao: string;
    local: Locais;
    produtor: Produtores;
    categorias: Categorias[];
}



