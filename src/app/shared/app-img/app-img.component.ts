import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './app-img.component.html',
  styleUrls: ['./app-img.component.scss'],
})
export class AppImgComponent implements OnInit {

  @Input() src: string;
  @Input() nomeEvento: string;
  @Input() localEvento: string;
  @Input() dataEvento: string;

  constructor() { }

  ngOnInit() { }

}
