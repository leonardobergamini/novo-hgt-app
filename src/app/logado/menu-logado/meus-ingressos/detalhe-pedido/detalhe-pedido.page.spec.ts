import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePedidoPage } from './detalhe-pedido.page';

describe('DetalhePedidoPage', () => {
  let component: DetalhePedidoPage;
  let fixture: ComponentFixture<DetalhePedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhePedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
