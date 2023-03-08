import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationImgComponent } from './animation-img.component';

describe('AnimationImgComponent', () => {
  let component: AnimationImgComponent;
  let fixture: ComponentFixture<AnimationImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
