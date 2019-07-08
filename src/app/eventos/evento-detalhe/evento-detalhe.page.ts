import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eventos } from 'src/app/shared/models/eventos/eventos';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.page.html',
  styleUrls: ['./evento-detalhe.page.scss'],
})
export class EventoDetalhePage implements OnInit {

  evento: Eventos;

  constructor(private activeRoute: ActivatedRoute, private router: Router){
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.evento = this.router.getCurrentNavigation().extras.state.evento;        
      }
    });
  }

  ngOnInit() {
  }

}
