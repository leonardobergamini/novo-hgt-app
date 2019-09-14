import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetuarCompraPage } from './efetuar-compra.page';

describe('EfetuarCompraPage', () => {
  let component: EfetuarCompraPage;
  let fixture: ComponentFixture<EfetuarCompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfetuarCompraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetuarCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
