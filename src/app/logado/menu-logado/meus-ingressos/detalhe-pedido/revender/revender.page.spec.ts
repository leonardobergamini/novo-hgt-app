import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenderPage } from './revender.page';

describe('RevenderPage', () => {
  let component: RevenderPage;
  let fixture: ComponentFixture<RevenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
