import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignindialogComponent } from './signindialog.component';

describe('SignindialogComponent', () => {
  let component: SignindialogComponent;
  let fixture: ComponentFixture<SignindialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignindialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignindialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
