import { Injectable, OnDestroy } from '@angular/core';
import { Pedidos } from '../../models/pedidos/pedidos';
import { FormaPagamentoService } from '../formas-pagamento/forma-pagamento.service';
import { LoadingController, NavController } from '@ionic/angular';
import { TicketsService } from '../tickets/tickets.service';
import { Usuarios } from '../../models/usuarios/usuarios';
import { Tickets } from '../../models/tickets/tickets';
import { load } from '@angular/core/src/render3';
import { TicketsPedido } from '../../interfaces/tickets-pedido/tickets-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService{
  
  private id: number = 0;
  private tickets: Tickets[] = [];
  public arrayTicketsPorPedido: TicketsPedido[] = [];
  public arrayTicketsPorIdPedido: TicketsPedido[] = []
  private objTickesPorPedido: TicketsPedido = null;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private loadingController: LoadingController,
    private ticketService: TicketsService,
    private navCtrl: NavController
  ) { }

  usuario: Usuarios = {
    id: 1,
    primeiroNome: 'leonardo',
    sobrenome: 'bergamini',
    cpf: '36980235800',
    cep: '02326000',
    cidade: 'são paulo',
    complemento: '',
    dtNascimento: '24/04/1995',
    email: 'leonardo@gmail.com',
    imgPerfil: '',
    logradouro: 'rua arley gilberto de araujo',
    numero: '04',
    senha: 'leonardo',
    telefone: '11940040876',
    uf: 'sp',
    usuario: 'berganardo'
  }

  pedidos: Pedidos[] = [
    {
    id: this.id++,
    isValido: true,
    formaPagamento: this.formaPagamentoService.formasPagamento[0]
  }
]

  novoPedido(pedido){
    this.pedidos.push(
      {
        id: this.id++,
        formaPagamento: pedido.formaPagamento[0],
        isValido: true
      }
    );    
    this.adicionarTicketsPedidos(pedido);
    this.getTicketsPorPedido(this.tickets);

    if(this.tickets.length > 0){
      this.ticketService.novoTicket(this.tickets);
      this.navCtrl.setDirection('forward');
      this.navCtrl.navigateForward('menu-logado/meus-ingressos');
    }
    
    this.tickets = [];
  }

  adicionarTicketsPedidos(pedido){
    pedido.setores.forEach((value, index) => {
      let i: number = 0;
      for( i = 0; i < value.contador; i++){
        let ticket: Tickets =
          {
            id: this.id++,
            evento: pedido.evento,
            isMeiaEntrada: false,
            pedido: this.pedidos[this.pedidos.length - 1],
            preco: value.preco,
            setor: value.setor,
            titular: this.usuario
          };
        this.tickets.push(ticket)
      }
    });
  }

  getTicketsPorPedido(tickets, idPedido?: number): TicketsPedido[]{ 
    let arrayPedidosComTickets = this.arrayTicketsPorPedido;
    if(idPedido > 0){
      arrayPedidosComTickets.filter(value => {
        if(value.pedido.id === idPedido){
          this.arrayTicketsPorIdPedido.push(value);
          return this.arrayTicketsPorIdPedido;
        }
      });
    }else{
      let objPedido = tickets[0].pedido;
      this.objTickesPorPedido = {
        pedido: objPedido,
        tickets
      };
      this.arrayTicketsPorPedido.push(this.objTickesPorPedido);
      return this.arrayTicketsPorIdPedido
    }
  }
}
