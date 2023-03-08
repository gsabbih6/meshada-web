import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtrendComponent } from './newtrend.component';

describe('NewtrendComponent', () => {
  let component: NewtrendComponent;
  let fixture: ComponentFixture<NewtrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
