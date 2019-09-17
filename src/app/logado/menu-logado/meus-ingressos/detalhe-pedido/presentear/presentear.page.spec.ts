import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentearPage } from './presentear.page';

describe('PresentearPage', () => {
  let component: PresentearPage;
  let fixture: ComponentFixture<PresentearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
