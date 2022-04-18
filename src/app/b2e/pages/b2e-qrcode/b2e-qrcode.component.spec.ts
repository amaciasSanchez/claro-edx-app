import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2eQrcodeComponent } from './b2e-qrcode.component';

describe('B2eQrcodeComponent', () => {
  let component: B2eQrcodeComponent;
  let fixture: ComponentFixture<B2eQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2eQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2eQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
