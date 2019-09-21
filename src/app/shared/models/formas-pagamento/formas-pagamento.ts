import { CartoesCredito } from '../cartoes-credito/cartoes-credito';
import { Usuarios } from '../usuarios/usuarios';
import { Carteiras } from '../carteiras/carteiras';

export class FormasPagamento {
    idFormaPg: number;
    cartao: CartoesCredito;
    carteira: Carteiras;
    usuario: Usuarios
    pagamento: boolean;
}
