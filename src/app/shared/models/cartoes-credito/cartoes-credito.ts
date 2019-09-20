import { Usuarios } from '../usuarios/usuarios';

export class CartoesCredito {
    idCartao: number;
    nroCartao: number;
    nomeTitular: string;
    dtVencimento: string;
    codSeguranca: number;
    usuario: Usuarios;
    bandeira: string;
    cartaoFormatado: number;
}
