import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';
import { Atracoes } from '../atracoes/atracoes';
import { FaixasEtarias } from '../faixas-etarias/faixas-etarias';
import { Setores } from '../setores/setores';

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
    setores: Setores[];
    produtor: Produtores;
    categorias: Categorias[];
    faixaEtaria: FaixasEtarias;
    atracao: Atracoes;
}



