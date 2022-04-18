import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2eRegisterComponent } from './b2e-register.component';

describe('B2eRegisterComponent', () => {
  let component: B2eRegisterComponent;
  let fixture: ComponentFixture<B2eRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2eRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2eRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
