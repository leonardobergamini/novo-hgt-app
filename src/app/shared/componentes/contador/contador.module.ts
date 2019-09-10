import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ContadorComponent } from './contador.component';

@NgModule({
  declarations: [ContadorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ContadorComponent]
})
export class ContadorModule { }
