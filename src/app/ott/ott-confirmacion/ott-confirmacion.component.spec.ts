import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttConfirmacionComponent } from './ott-confirmacion.component';

describe('OttConfirmacionComponent', () => {
  let component: OttConfirmacionComponent;
  let fixture: ComponentFixture<OttConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
