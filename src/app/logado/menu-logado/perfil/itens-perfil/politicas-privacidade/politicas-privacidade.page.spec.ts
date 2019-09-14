import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasPrivacidadePage } from './politicas-privacidade.page';

describe('PoliticasPrivacidadePage', () => {
  let component: PoliticasPrivacidadePage;
  let fixture: ComponentFixture<PoliticasPrivacidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticasPrivacidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasPrivacidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
