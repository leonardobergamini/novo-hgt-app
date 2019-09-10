import { Locais } from '../locais/locais';
import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';
import { Atracoes } from '../atracoes/atracoes';
import { FaixasEtarias } from '../faixas-etarias/faixas-etarias';

export class Eventos {
    id: number;
    dtPublicacao: string;
    imagem: string;
    dtInicioEvento: string;
    dtFimEvento: string;
    dtInicioVendas: string;
    dtInicioEventoFormatada: string;
    dtFimEventoFormatada: string;
    horaInicioEvento: string;
    horaFimEvento: string;
    descricao: string;
    visualizacoes: string;
    local: Locais;
    produtor: Produtores;
    categorias: Categorias[];
    faixaEtaria: FaixasEtarias;
    atracao: Atracoes;
}



