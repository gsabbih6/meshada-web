import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardropedialogComponent } from './wardropedialog.component';

describe('WardropedialogComponent', () => {
  let component: WardropedialogComponent;
  let fixture: ComponentFixture<WardropedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardropedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardropedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
