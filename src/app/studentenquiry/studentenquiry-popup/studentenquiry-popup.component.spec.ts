import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentenquiryPopupComponent } from './studentenquiry-popup.component';

describe('StudentenquiryPopupComponent', () => {
  let component: StudentenquiryPopupComponent;
  let fixture: ComponentFixture<StudentenquiryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentenquiryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentenquiryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
