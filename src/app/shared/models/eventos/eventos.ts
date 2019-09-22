import { Produtores } from '../produtores/produtores';
import { Categorias } from '../categorias/categorias';
import { Atracoes } from '../atracoes/atracoes';
import { FaixasEtarias } from '../faixas-etarias/faixas-etarias';
import { Setores } from '../setores/setores';

export class Eventos {
    id: number;
    nome
    datapublicacao: string;
    imagem: string;
    dtinicioevento: string;
    dtfimevento: string;
    dtiniciovenda: string;
    // dtinicioevento: string;
    // dtFimEventoFormatada: string;
    horainicioevento: string;
    horafimevento: string;
    descricao: string;
    visualizacoes: string;
    setores: Setores[];
    produtor: Produtores;
    idcategoria: Categorias;
    faixasetarias: FaixasEtarias;
    atracoes: Atracoes[];
}



