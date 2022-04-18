import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttDatosPersonalesComponent } from './ott-datos-personales.component';

describe('OttDatosPersonalesComponent', () => {
  let component: OttDatosPersonalesComponent;
  let fixture: ComponentFixture<OttDatosPersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttDatosPersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
