import { Locais } from '../locais/locais';
import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';
import { Atracoes } from '../atracoes/atracoes';
import { FaixasEtarias } from '../faixas-etarias/faixas-etarias';

export class Eventos {
    id_evento: number;
    data_publicacao: string;
    imagem: string;
    dt_inicio_evento: string;
    dt_fim_evento: string;
    dt_inicio_vendas: string;
    dt_inicio_evento_formatada: string;
    dt_fim_evento_formatada: string;
    hora_inicio_evento: string;
    hora_fim_evento: string;
    descricao: string;
    visualizações: number;
    local: Locais;
    produtor: Produtores;
    categorias: Categorias[];
    faixa_etaria: FaixasEtarias;
    atracao: Atracoes;
}



