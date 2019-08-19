import { FormControl } from '@angular/forms'

export class SenhaValidator{

    static areSenhasIguais(control: FormControl){
        let senha = control.get('senha').value;
        let confirmSenha = control.get('senhaConfirmacao').value;
        senha !== confirmSenha ? control.get('senhaConfirmacao').setErrors({'senhasdiferentes': true}) : null;
    }

}