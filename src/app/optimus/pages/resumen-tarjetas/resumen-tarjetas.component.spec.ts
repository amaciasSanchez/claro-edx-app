import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTarjetasComponent } from './resumen-tarjetas.component';

describe('ResumenComponent', () => {
  let component: ResumenTarjetasComponent;
  let fixture: ComponentFixture<ResumenTarjetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenTarjetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
