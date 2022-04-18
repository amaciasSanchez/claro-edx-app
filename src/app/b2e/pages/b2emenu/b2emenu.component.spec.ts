import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2emenuComponent } from './b2emenu.component';

describe('B2emenuComponent', () => {
  let component: B2emenuComponent;
  let fixture: ComponentFixture<B2emenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2emenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2emenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
