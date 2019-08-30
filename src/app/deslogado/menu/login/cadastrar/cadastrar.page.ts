import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController, LoadingController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Usuarios } from 'src/app/shared/models/usuarios/usuarios';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator/cpf-validator';
import { EmailValidator } from 'src/app/shared/validators/email-validator/email-validator';
import { SenhaValidator } from 'src/app/shared/validators/senha-validator/senha-validator';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {


  usuario: Usuarios = new Usuarios;
  private toast: any;
  private erro: boolean;

  public formLogin: FormGroup;
  public formCadastro: FormGroup;
  
  mensagensValidacao = {
    'primeiro_nome': [
      {type: 'maxlength', message: 'Nome maior que 30 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece de informar seu nome.'},
      {type: 'pattern', message: 'Seu nome só pode conter letras.' }
    ],

    'sobrenome': [
      {type: 'maxlength', message: 'Sobrenome maios que 50 caracteres.'},
      {type: 'required', message: 'Ops! Não esquece que informar o seu sobrenome.'},
      {type: 'pattern', message: 'Seu sobrenome só pode conter letras.'},
    ],

    'email': [
      {type: 'required', message: 'Ops! Não esquece que informar o seu e-mail.'},
      {type: 'emailinvalido', message: 'Informe um e-mail válido.'},
    ],

    'senha': [
      {type: 'required', message: 'Ops! Não esquece de informar a sua senha.'},
      {type: 'minlength', message: 'Sua senha deve ser maior que 6 caracteres.'},
    ],

    'senhaConfirmacao': [
      {type: 'required', message: 'Ops! Não esquece de confirmar sua senha.'},
      {type: 'minlength', message: 'Sua senha deve ser maior que 6 caracteres.'},
      {type: 'senhasdiferentes', message: 'As senhas devem ser iguais.'}
    ],

    'usuario': [
      {type: 'required', message: 'Ops! Não esquece de informar seu nome de usuário.'},
      {type: 'maxlength', message: 'O nome de usuário não pode ser maior que 20 caracteres.'}
    ],

    'cpf': [
      {type: 'required', message: 'Ops! Não esquece de informar o cpf.'},
      {type: 'cpfinvalido', message: 'CPF inválido.'},
      {type: 'maxlength', message: 'CPF muito grande.'}
    ],

    'telefone': [
      {type: 'required', message: 'Ops! Não esquece de informar seu telefone.'}
    ],

    'cep': [
      {type: 'required', message: 'Ops! Não esquece de informar o seu cep.'}
    ],

    'logradouro': [
      {type: 'required', message: 'Ops! Não esquece de informar seu logradouro.'}
    ],

    'numero': [
      {type: 'required', message: 'Ops! Não esquece de informar o número.'}
    ],

    'cidade': [
      {type: 'required', message: 'Ops! Não esquece de informar a cidade.'}
    ],

    'uf': [
      {type: 'required', message: 'Ops! Não esquece de informar a uf.'}
    ]
  };

  constructor(
    private toastController: ToastController, 
    private loginService: LoginService,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private modalController: ModalController
    ) {
      this.formCadastro = formBuilder.group({
        primeiro_nome: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        sobrenome: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-z ]*'), Validators.required])],
        email: ['', Validators.required, EmailValidator.verificarEmail],
        usuario: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        senhaConfirmacao: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        dt_nascimento: ['', Validators.compose([Validators.required])],
        cpf: ['', Validators.compose([Validators.maxLength(14), Validators.required, CpfValidator.validarCPF])],
        telefone: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
        cep: ['', Validators.compose([Validators.maxLength(9), Validators.required])],
        logradouro: ['', Validators.required],
        numero: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')])],
        complemento: [''],
        cidade: ['', Validators.compose([Validators.required])],
        uf: ['', Validators.compose([Validators.required])]
      }, {validator: SenhaValidator.areSenhasIguais});

      this.formLogin = formBuilder.group({
        email: ['', Validators.required, EmailValidator.verificarEmail],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      })

    }

  ngOnInit() { 
    // this.getData();
  }

  onSubmitCadastro(){      
    if(!this.formCadastro.valid){
      console.log('Há erros no form cadastro');
      // this.exibirToast('Há erros no formulário. Verique-o e tente novamente.');
      // this.formSlides.slideTo(1);
    }else{
      // $('#progressoCadastro').removeClass('ion-hide');
      this.usuario = this.formCadastro.value;
      this.usuario.numero = this.usuario.numero.toString();  
      this.usuarioService.createUser(this.usuario)
      .then(resp => {
        // this.exibirToast(resp);
        // $('#formularioCadastro').trigger('reset');
        // this.prev();
      })
      .catch(err => {
        // $('#progressoCadastro').addClass('ion-hide');
        if(err){
          // this.exibirToast('Algo deu errado. Tente novamente.');
          return;
        }
      });
    }
  }

  formCadastroIsValid(){
    return this.formCadastro.valid;
  }

}
