import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubotComponent } from './menubot.component';

describe('MenubotComponent', () => {
  let component: MenubotComponent;
  let fixture: ComponentFixture<MenubotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
