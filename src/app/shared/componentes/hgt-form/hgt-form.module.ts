import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HgtFormComponent } from './hgt-form.component';
import { HgtInputModule } from './hgt-input/hgt-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HgtFormComponent],
  imports: [
    CommonModule,
    HgtInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HgtFormComponent]
})
export class HgtFormModule { }
