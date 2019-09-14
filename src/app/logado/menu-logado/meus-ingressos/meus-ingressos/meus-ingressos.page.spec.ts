import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusIngressosPage } from './meus-ingressos.page';

describe('MeusIngressosPage', () => {
  let component: MeusIngressosPage;
  let fixture: ComponentFixture<MeusIngressosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusIngressosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusIngressosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
