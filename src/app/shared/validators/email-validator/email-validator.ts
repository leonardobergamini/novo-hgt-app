import { FormControl } from '@angular/forms';


export class EmailValidator {
  
  static verificarEmail(control: FormControl): any{

    return new Promise(resolve => {
      let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      if(!regex.test(control.value)){
        resolve({
          "emailinvalido": true
        });
      }else{
        resolve(null);
      }
    });
  }

}
