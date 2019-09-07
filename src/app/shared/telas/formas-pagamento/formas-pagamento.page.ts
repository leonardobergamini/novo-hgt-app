import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../../services/formas-pagamento/forma-pagamento.service';
import { FormasPagamento } from '../../models/formas-pagamento/formas-pagamento';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.page.html',
  styleUrls: ['./formas-pagamento.page.scss'],
})
export class FormasPagamentoPage implements OnInit {

  public formasPagamento: FormasPagamento[] = [];

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.formaPagamentoService.consultar()
    .then(resp => {
      if(resp.length === 0){
        this.formasPagamento = null;
      }else{
        this.formasPagamento = resp;
      }
    })
    .catch(err => {
      this.formasPagamento = new Array<FormasPagamento>();
    });
  }
}
