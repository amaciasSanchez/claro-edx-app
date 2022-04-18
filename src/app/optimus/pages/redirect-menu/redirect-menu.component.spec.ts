import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectMenuComponent } from './redirect-menu.component';

describe('RedirectMenuComponent', () => {
  let component: RedirectMenuComponent;
  let fixture: ComponentFixture<RedirectMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
