import { Locais } from '../locais/locais';
import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';

export class Eventos {
    id: number;
    data_publicacao: string;
    imagem: string;
    artista: string;
    classificacao_etaria: string;
    data_inicio_evento: string;
    data_fim_evento: string;
    data_inicio_vendas: string;
    data_inicio_evento_formatada: string;
    data_fim_evento_formatada: string;
    hora_inicio_evento: string;
    hora_fim_evento: string;
    descricao: string;
    local: Locais;
    produtor: Produtores;
    categorias: Categorias[];
}



