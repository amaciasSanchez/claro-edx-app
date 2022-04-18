import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToBottomComponent } from './back-to-bottom.component';

describe('BackToBottomComponent', () => {
  let component: BackToBottomComponent;
  let fixture: ComponentFixture<BackToBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackToBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
