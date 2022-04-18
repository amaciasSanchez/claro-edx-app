import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroIpTvAlertSuccessfulComponent } from './claro-ip-tv-alert-successful.component';

describe('ClaroIpTvAlertSuccessfulComponent', () => {
  let component: ClaroIpTvAlertSuccessfulComponent;
  let fixture: ComponentFixture<ClaroIpTvAlertSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaroIpTvAlertSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaroIpTvAlertSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
