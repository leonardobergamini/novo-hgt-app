import { Pedidos } from '../../models/pedidos/pedidos';
import { Tickets } from '../../models/tickets/tickets';

export interface TicketsPedido {
    pedido: Pedidos;
    tickets: Tickets[];
}
