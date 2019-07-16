import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgtFormComponent } from './hgt-form.component';

describe('HgtFormComponent', () => {
  let component: HgtFormComponent;
  let fixture: ComponentFixture<HgtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgtFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
