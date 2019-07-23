import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private loginService: LoginService,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  sair(){
    this.loginService.sair()
        .then(resp => {
          console.log(resp);
        });
    
  }
}
