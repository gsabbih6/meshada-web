import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsDisclosureComponent } from './ads-disclosure.component';

describe('AdsDisclosureComponent', () => {
  let component: AdsDisclosureComponent;
  let fixture: ComponentFixture<AdsDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
