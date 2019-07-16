import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgtInputComponent } from './hgt-input.component';

describe('HgtInputComponent', () => {
  let component: HgtInputComponent;
  let fixture: ComponentFixture<HgtInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgtInputComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
