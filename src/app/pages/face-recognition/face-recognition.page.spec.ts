import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecognitionPage } from './face-recognition.page';

describe('FaceRecognitionPage', () => {
  let component: FaceRecognitionPage;
  let fixture: ComponentFixture<FaceRecognitionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceRecognitionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceRecognitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
