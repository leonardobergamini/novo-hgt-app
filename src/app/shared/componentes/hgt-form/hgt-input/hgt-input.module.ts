import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HgtInputComponent } from './hgt-input.component';

@NgModule({
  declarations: [HgtInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HgtInputComponent]
})
export class HgtInputModule { }
