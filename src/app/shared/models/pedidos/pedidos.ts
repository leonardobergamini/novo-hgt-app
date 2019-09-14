import { FormasPagamento } from '../formas-pagamento/formas-pagamento';

export class Pedidos {
    id: number;
    formaPagamento: FormasPagamento;
    isValido: boolean;
}
