import { Usuarios } from '../usuarios/usuarios';

export class CartoesCredito {
    idCartao: number;
    nroCartao: number;
    nomeTitular: string;
    dtVencimento: string;
    codSegurancao: number;
    usuario: Usuarios;
    bandeiraCartao: string;
}
