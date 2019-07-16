import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'hgt-input',
  templateUrl: './hgt-input.component.html',
  styleUrls: ['./hgt-input.component.scss'],
})
export class HgtInputComponent implements OnInit {

  @Input() id: string;
  @Input() type: string;
  @Input() label: string;
  // @Input() formControlName: string;

  constructor() { }

  ngOnInit() {}

}
