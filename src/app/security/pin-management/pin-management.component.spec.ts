import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinManagementComponent } from './pin-management.component';

describe('PinManagementComponent', () => {
  let component: PinManagementComponent;
  let fixture: ComponentFixture<PinManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
