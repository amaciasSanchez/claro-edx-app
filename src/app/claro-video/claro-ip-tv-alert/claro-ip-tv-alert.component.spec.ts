import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroIpTvAlertComponent } from './claro-ip-tv-alert.component';

describe('ClaroIpTvAlertComponent', () => {
  let component: ClaroIpTvAlertComponent;
  let fixture: ComponentFixture<ClaroIpTvAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaroIpTvAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaroIpTvAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
