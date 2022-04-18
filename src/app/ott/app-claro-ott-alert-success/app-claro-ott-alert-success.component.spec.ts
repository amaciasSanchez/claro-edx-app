import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClaroOttAlertSuccess } from './app-claro-ott-alert-success.component';

describe('AppClaroOttAlert.SuccessComponent', () => {
  let component: AppClaroOttAlertSuccess;
  let fixture: ComponentFixture<AppClaroOttAlertSuccess>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppClaroOttAlertSuccess]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppClaroOttAlertSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
