import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCropperPage } from './picture-cropper.page';

describe('PictureCropperPage', () => {
  let component: PictureCropperPage;
  let fixture: ComponentFixture<PictureCropperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCropperPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCropperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
