import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hgt-input',
  templateUrl: './hgt-input.component.html',
  styleUrls: ['./hgt-input.component.scss'],
})
export class HgtInputComponent implements OnInit {

  @Input() id: string;
  @Input() type: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {}

}
