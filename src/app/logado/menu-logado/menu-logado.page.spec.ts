import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLogadoPage } from './menu-logado.page';

describe('MenuLogadoPage', () => {
  let component: MenuLogadoPage;
  let fixture: ComponentFixture<MenuLogadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLogadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLogadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
