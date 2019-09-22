import { Usuarios } from '../usuarios/usuarios';

export class CartoesCredito {
    id: number;
    nroCartao: number;
    nomeTitular: string;
    dtVencimento: string;
    codSeguranca: number;
    usuario: Usuarios;
    bandeira: string;
    cartaoFormatado: number;
}
