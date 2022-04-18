import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancebarComponent } from './financebar.component';

describe('FinancebarComponent', () => {
  let component: FinancebarComponent;
  let fixture: ComponentFixture<FinancebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
