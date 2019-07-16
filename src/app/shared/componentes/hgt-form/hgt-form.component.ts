import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hgt-form',
  templateUrl: './hgt-form.component.html',
  styleUrls: ['./hgt-form.component.scss'],
})
export class HgtFormComponent implements OnInit {

  @Input() formGroup: string;
  
  constructor() { }

  ngOnInit() {}

}
