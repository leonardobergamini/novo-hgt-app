import { FormControl } from '@angular/forms'
import * as cpf from "@fnando/cpf"; 

export class CpfValidator {
    static validarCPF(control: FormControl): any{

        if(control.value == ''){
            return {'required': true};
        }
    
        if(!cpf.isValid(control.value, true)){
            return  {'cpfinvalido': true}; 
        }

        else{
            return null;
        }
    }
}
