import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2eSuccessComponent } from './b2e-success.component';

describe('B2eSuccessComponent', () => {
  let component: B2eSuccessComponent;
  let fixture: ComponentFixture<B2eSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2eSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2eSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
