import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorchoiceComponent } from './editorchoice.component';

describe('EditorchoiceComponent', () => {
  let component: EditorchoiceComponent;
  let fixture: ComponentFixture<EditorchoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorchoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorchoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
