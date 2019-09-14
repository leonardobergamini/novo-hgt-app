import { Eventos } from '../../models/eventos/eventos';
import { Setores } from '../../models/setores/setores';
import { QuantidadeIngressoSetor } from '../quantidade-ingresso-setor/quantidade-ingresso-setor';

export interface EventoSetoresSelecionado {
    evento: Eventos;
    setores: QuantidadeIngressoSetor[];
    valorTotal: number;
    qtdIngressos: number;
}
