import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[hide-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective implements OnInit {

  @Input("header") header: HTMLElement;
  
  constructor(public element: ElementRef, public renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
  }

  onContentScroll(event) {
    if (event.directionY == "down") {
      this.renderer.setElementStyle(this.header, 'top', '-56px');
    }
    else {
      this.renderer.setElementStyle(this.header, 'top', '0px');
    }
  }
}
