import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttSinCajaComponent } from './ott-sin-caja.component';

describe('OttSinCajaComponent', () => {
  let component: OttSinCajaComponent;
  let fixture: ComponentFixture<OttSinCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttSinCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttSinCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
