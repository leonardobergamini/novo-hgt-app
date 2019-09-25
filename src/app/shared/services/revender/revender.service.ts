import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenderService {

  constructor() { }

  create(): Promise<string>{
    return new Promise((resolve, reject) => {
      
    });
  }
}
