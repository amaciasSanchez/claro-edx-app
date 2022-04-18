import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttOffersComponent } from './ott-offers.component';

describe('OttOffersComponent', () => {
  let component: OttOffersComponent;
  let fixture: ComponentFixture<OttOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
