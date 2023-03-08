import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDescComponent } from './search-desc.component';

describe('SearchDescComponent', () => {
  let component: SearchDescComponent;
  let fixture: ComponentFixture<SearchDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
