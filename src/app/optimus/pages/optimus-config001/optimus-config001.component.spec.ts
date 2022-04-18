import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimusConfig001Component } from './optimus-config001.component';


describe('OptimusConfig001Component', () => {
  let component: OptimusConfig001Component;
  let fixture: ComponentFixture<OptimusConfig001Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimusConfig001Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimusConfig001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
