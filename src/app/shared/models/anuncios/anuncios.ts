import { Tickets } from '../tickets/tickets';
import { Usuarios } from '../usuarios/usuarios';

export class Anuncios {
    id: number;
    ticket: Tickets;
    usuario: Usuarios;
    preco: number;
    isvendido: boolean;
}
