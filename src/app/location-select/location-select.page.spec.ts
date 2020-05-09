import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSelectPage } from './location-select.page';

describe('LocationSelectPage', () => {
  let component: LocationSelectPage;
  let fixture: ComponentFixture<LocationSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
