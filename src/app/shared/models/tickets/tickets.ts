import { Usuarios } from '../usuarios/usuarios';
import { Pedidos } from '../pedidos/pedidos';
import { Eventos } from '../eventos/eventos';

export class Tickets {
    id: number;
    evento: Eventos;
    isMeiaEntrada: boolean;
    titular: Usuarios;
    pedido: Pedidos;
    setor: string;
    preco: number;
}
