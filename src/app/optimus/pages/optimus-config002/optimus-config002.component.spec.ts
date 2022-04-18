import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimusConfig002Component } from './optimus-config002.component';


describe('OptimusConfig002Component', () => {
  let component: OptimusConfig002Component;
  let fixture: ComponentFixture<OptimusConfig002Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimusConfig002Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimusConfig002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
